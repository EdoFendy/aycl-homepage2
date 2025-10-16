'use server';

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getCurrentAdmin } from "@/lib/admin/session";
import { getProductByWooId, removeStaleProducts, upsertAdminProduct } from "@/lib/admin/products";
import { recordPaymentLink, updatePaymentMetadata, updatePaymentStatus } from "@/lib/admin/payments";
import {
  createWooPaymentLink,
  ensureWooProduct,
  fetchWooOrders,
  fetchWooProducts,
} from "@/lib/admin/woocommerce";
import type { DriveTestOrder } from "@/lib/drive-test";
import { formatPriceString } from "@/lib/drive-test";

const moneyRegex = /^\d+(\.\d{1,2})?$/;

const existingProductSchema = z.object({
  mode: z.literal("existing"),
  productId: z.string().min(1, "Seleziona un prodotto."),
  productName: z.string().optional(),
  productSku: z.string().optional(),
  productPrice: z
    .string()
    .optional()
    .refine((value) => (value ? moneyRegex.test(value) : true), {
      message: "Prezzo non valido.",
    }),
  customPrice: z
    .string()
    .optional()
    .transform((value) => (value ? value : undefined))
    .refine((value) => (value ? moneyRegex.test(value) : true), {
      message: "Prezzo personalizzato non valido.",
    }),
  quantity: z
    .string()
    .optional()
    .transform((value) => (value ? Number(value) : 1))
    .refine(
      (value) => typeof value === "number" && Number.isInteger(value) && value > 0 && value <= 99,
      "Quantità non valida."
    ),
});

const newProductSchema = z.object({
  mode: z.literal("new"),
  productId: z.string().optional(),
  productName: z.string().min(2, "Inserisci il nome del prodotto."),
  productSku: z.string().optional(),
  productPrice: z.string().refine((value) => moneyRegex.test(value), {
    message: "Il prezzo deve essere nel formato 0.00",
  }),
  customPrice: z
    .string()
    .optional()
    .transform((value) => (value ? value : undefined))
    .refine((value) => (value ? moneyRegex.test(value) : true), {
      message: "Prezzo personalizzato non valido.",
    }),
  quantity: z
    .string()
    .optional()
    .transform((value) => (value ? Number(value) : 1))
    .refine(
      (value) => typeof value === "number" && Number.isInteger(value) && value > 0 && value <= 99,
      "Quantità non valida."
    ),
});

const productSchema = z.discriminatedUnion("mode", [existingProductSchema, newProductSchema]);

const customerSchema = z.object({
  firstName: z.string().min(1, "Il nome è obbligatorio."),
  lastName: z.string().min(1, "Il cognome è obbligatorio."),
  email: z.string().email("Email non valida."),
});

const statusSchema = z.object({
  paymentId: z.string(),
  status: z.enum(["pending", "paid", "cancelled", "failed"]),
});

export async function syncProductsAction() {
  assertAuthenticated();

  const wooProducts = await fetchWooProducts();
  const wooIds: number[] = [];

  wooProducts.forEach((product) => {
    if (typeof product.id === "number") {
      wooIds.push(product.id);
      upsertAdminProduct({
        wooId: product.id,
        name: product.name,
        sku: typeof product.sku === "string" ? product.sku : null,
        price:
          typeof product.price === "string"
            ? product.price
            : typeof product.regular_price === "string"
            ? product.regular_price
            : null,
        currency: (product as Record<string, unknown>)?.currency as string | undefined,
        raw: product,
      });
    }
  });

  removeStaleProducts(wooIds);
  revalidatePath("/admin/products");
  return { success: true, count: wooIds.length };
}

export async function createPaymentLinkAction(_: unknown, formData: FormData) {
  assertAuthenticated();

  const product = productSchema.safeParse({
    mode: formData.get("mode") ?? "existing",
    productId: formData.get("productId"),
    productName: formData.get("productName"),
    productSku: formData.get("productSku"),
    productPrice: formData.get("productPrice"),
    customPrice: formData.get("customPrice"),
    quantity: formData.get("quantity"),
  });

  if (!product.success) {
    return {
      success: false,
      message: product.error.issues[0]?.message ?? "Dati prodotto non validi.",
    };
  }

  const customer = customerSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
  });

  if (!customer.success) {
    return {
      success: false,
      message: customer.error.issues[0]?.message ?? "Dati cliente non validi.",
    };
  }

  try {
    let wooProductId: number;
    let storedProduct = null;
    let basePrice = product.data.mode === "new" ? product.data.productPrice : undefined;

    if (product.data.mode === "existing" && product.data.productId) {
      // Ensure product exists locally
      const existing = getProductByWooId(Number(product.data.productId));
      if (!existing) {
        return {
          success: false,
          message: "Seleziona un prodotto valido.",
        };
      }
      wooProductId = Number(existing.woo_id);
      storedProduct = existing;
      basePrice = existing.price ?? product.data.productPrice ?? "0.00";
    } else {
      const name = product.data.productName;
      const sku = product.data.productSku || undefined;
      const created = await ensureWooProduct({
        name,
        sku,
        price: product.data.productPrice,
        currency: "EUR",
        description: `Prodotto creato dal pannello AYCL per ${customer.data.firstName} ${customer.data.lastName}.`,
        short_description: "Generato automaticamente dalla piattaforma AYCL.",
      });
      wooProductId = created.id;
      storedProduct = upsertAdminProduct({
        wooId: created.id,
        name: created.name,
        sku: typeof created.sku === "string" ? created.sku : null,
        price:
          typeof created.price === "string"
            ? created.price
            : typeof created.regular_price === "string"
            ? created.regular_price
            : product.data.productPrice,
        currency: "EUR",
        raw: created,
      });
      basePrice =
        storedProduct?.price ??
        (typeof created.price === "string"
          ? created.price
          : typeof created.regular_price === "string"
          ? created.regular_price
          : product.data.productPrice);
    }

    const paymentLink = await createWooPaymentLink({
      productId: wooProductId,
      customer: {
        firstName: customer.data.firstName,
        lastName: customer.data.lastName,
        email: customer.data.email,
      },
      quantity: product.data.quantity,
      priceOverride: product.data.customPrice,
    });

    const basePriceNormalized = normalizePrice(basePrice ?? "0.00");
    const customPriceNormalized = product.data.customPrice
      ? normalizePrice(product.data.customPrice)
      : null;

    const unitPriceString = customPriceNormalized ?? basePriceNormalized;
    const unitPrice = Number.parseFloat(unitPriceString);
    const basePriceNumber = Number.parseFloat(basePriceNormalized);
    const customPriceNumber = customPriceNormalized ? Number.parseFloat(customPriceNormalized) : null;
    const quantity = product.data.quantity;

    if (Number.isNaN(unitPrice)) {
      throw new Error("Prezzo non valido.");
    }

    const productName =
      storedProduct?.name ??
      (product.data.mode === "new"
        ? product.data.productName
        : storedProduct?.name ?? "Prodotto personalizzato");

    const order: DriveTestOrder = {
      package: productName,
      currency: "EUR",
      unitPrice,
      quantity,
      total: unitPrice * quantity,
      priceRange: {
        min: basePriceNumber,
        max: customPriceNumber ?? basePriceNumber,
      },
      selections: {
        revenueBand: {
          id: "custom",
          label: "Custom",
        },
        geography: {
          id: "custom",
          label: "N/A",
        },
        sector: {
          id: "custom",
          label: productName,
        },
        riskProfile: 1,
      },
      metadata: {
        locale: "it-IT",
        generatedAt: new Date().toISOString(),
        wooProductId,
        productName,
        basePrice: basePriceNormalized,
        customPrice: customPriceNormalized ?? undefined,
      },
    };

    const checkoutUrl = `/checkout?order=${encodeURIComponent(JSON.stringify(order))}`;

    const metadataPayload = {
      wooPaymentUrl: paymentLink.payment_url,
      quantity,
      order,
      basePrice: basePriceNormalized,
      customPrice: customPriceNormalized,
      customer: customer.data,
    } satisfies Record<string, unknown>;

    const record = recordPaymentLink({
      wooProductId,
      wooPaymentLinkId: paymentLink.id ? String(paymentLink.id) : null,
      productName,
      productSku:
        storedProduct?.sku ?? (product.data.mode === "new" ? product.data.productSku ?? null : null),
      productPrice: basePriceNormalized,
      currency: "EUR",
      customPrice: customPriceNormalized ?? undefined,
      customerFirstName: customer.data.firstName,
      customerLastName: customer.data.lastName,
      customerEmail: customer.data.email,
      paymentUrl: checkoutUrl,
      metadata: metadataPayload,
    });

    order.metadata.adminPaymentId = record.id;
    updatePaymentMetadata(record.id, {
      ...metadataPayload,
      order,
    });

    revalidatePath("/admin/payments");
    revalidatePath("/admin/products");

    return {
      success: true,
      paymentUrl: checkoutUrl,
      wooPaymentUrl: paymentLink.payment_url,
      paymentId: record.id,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Impossibile creare il link di pagamento.",
    };
  }
}

export async function updatePaymentStatusAction(_: unknown, formData: FormData) {
  assertAuthenticated();
  const payload = statusSchema.safeParse({
    paymentId: formData.get("paymentId"),
    status: formData.get("status"),
  });

  if (!payload.success) {
    return {
      success: false,
      message: payload.error.issues[0]?.message ?? "Dati non validi.",
    };
  }

  const record = updatePaymentStatus(Number(payload.data.paymentId), payload.data.status);
  revalidatePath("/admin/payments");

  return { success: true, record };
}

export async function refreshTransactionsAction() {
  assertAuthenticated();
  try {
    const orders = await fetchWooOrders({ per_page: 50 });
    return { success: true, orders };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Impossibile aggiornare le transazioni.",
    };
  }
}

function assertAuthenticated() {
  const user = getCurrentAdmin();
  if (!user) {
    throw new Error("Non autorizzato.");
  }
}

function normalizePrice(value: string) {
  const normalized = value.replace(",", ".");
  const numeric = Number.parseFloat(normalized);
  if (Number.isNaN(numeric)) {
    throw new Error("Prezzo non valido.");
  }
  return formatPriceString(numeric);
}
