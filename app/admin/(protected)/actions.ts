'use server';

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getCurrentAdmin } from "@/lib/admin/session";
import {
  deleteAdminProduct,
  getProductByWooId,
  removeStaleProducts,
  upsertAdminProduct,
} from "@/lib/admin/products";
import { recordPaymentLink, updatePaymentMetadata, updatePaymentStatus } from "@/lib/admin/payments";
import {
  createWooPaymentLink,
  createWooProduct,
  deleteWooProduct,
  ensureWooProduct,
  fetchWooOrders,
  fetchWooProducts,
  updateWooProduct,
} from "@/lib/admin/woocommerce";
import type { DriveTestOrder } from "@/lib/drive-test";
import { isValidPriceInput, normalizePriceInput } from "@/lib/money";
import { encryptCheckoutOrder, resolveCheckoutBaseUrl } from "@/lib/checkout-encryption";
import { normalizeFormData } from "@/lib/form-data";

const productDetailsSchema = z.object({
  name: z.string().min(2, "Inserisci il nome del prodotto."),
  sku: z.string().optional(),
  price: z
    .string()
    .min(1, "Inserisci il prezzo base.")
    .refine((value) => isValidPriceInput(value), {
      message: "Inserisci un prezzo valido.",
    })
    .transform((value) => normalizePriceInput(value)),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
});

const productUpdateSchema = productDetailsSchema.extend({
  productId: z.string().min(1, "Prodotto non valido."),
});

const existingProductSchema = z.object({
  mode: z.literal("existing"),
  productId: z.string().min(1, "Seleziona un prodotto."),
  productName: z.string().optional(),
  productSku: z.string().optional(),
  productPrice: z
    .string()
    .optional()
    .transform((value) => (value && value.trim() !== "" ? value : undefined))
    .refine((value) => (value ? isValidPriceInput(value) : true), {
      message: "Prezzo non valido.",
    })
    .transform((value) => (value ? normalizePriceInput(value) : undefined)),
  discountFromPrice: z
    .string()
    .optional()
    .transform((value) => (value && value.trim() !== "" ? value : undefined))
    .refine((value) => (value ? isValidPriceInput(value) : true), {
      message: "Prezzo scontato non valido.",
    })
    .transform((value) => (value ? normalizePriceInput(value) : undefined)),
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
  productPrice: z
    .string()
    .min(1, "Inserisci il prezzo base.")
    .refine((value) => isValidPriceInput(value), {
      message: "Inserisci un prezzo valido.",
    })
    .transform((value) => normalizePriceInput(value)),
  discountFromPrice: z
    .string()
    .optional()
    .transform((value) => (value && value.trim() !== "" ? value : undefined))
    .refine((value) => (value ? isValidPriceInput(value) : true), {
      message: "Prezzo scontato non valido.",
    })
    .transform((value) => (value ? normalizePriceInput(value) : undefined)),
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
});

const statusSchema = z.object({
  paymentId: z.string(),
  status: z.enum(["pending", "paid", "cancelled", "failed"]),
});

export async function syncProductsAction() {
  await assertAuthenticated();

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

export async function createProductAction(_: unknown, formData: FormData) {
  await assertAuthenticated();

  const values = normalizeFormData(formData);
  const payload = productDetailsSchema.safeParse({
    name: values.name,
    sku: values.sku,
    price: values.price,
    description: values.description,
    shortDescription: values.shortDescription,
  });

  if (!payload.success) {
    return {
      success: false,
      message: payload.error.issues[0]?.message ?? "Dati prodotto non validi.",
    };
  }

  const currencyInput = typeof values.currency === "string" ? values.currency.trim() : "";
  const currency = currencyInput ? currencyInput.toUpperCase() : "EUR";

  if (!/^[A-Z]{3}$/.test(currency)) {
    return { success: false, message: "La valuta deve essere composta da 3 lettere." };
  }

  try {
    const normalizedPrice = normalizePrice(payload.data.price);
    const product = await createWooProduct({
      name: payload.data.name,
      sku: payload.data.sku || undefined,
      price: normalizedPrice,
      currency,
      description: payload.data.description || undefined,
      short_description: payload.data.shortDescription || undefined,
    });

    const stored = upsertAdminProduct({
      wooId: product.id,
      name: product.name,
      sku: typeof product.sku === "string" ? product.sku : payload.data.sku ?? null,
      price:
        typeof product.price === "string"
          ? product.price
          : typeof product.regular_price === "string"
          ? product.regular_price
          : normalizedPrice,
      currency,
      raw: product,
    });

    revalidatePath("/admin/products");
    return { success: true, product: stored };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Impossibile creare il prodotto.",
    };
  }
}

export async function updateProductAction(_: unknown, formData: FormData) {
  await assertAuthenticated();

  const values = normalizeFormData(formData);
  const payload = productUpdateSchema.safeParse({
    productId: values.productId,
    name: values.name,
    sku: values.sku,
    price: values.price,
    description: values.description,
    shortDescription: values.shortDescription,
  });

  if (!payload.success) {
    return {
      success: false,
      message: payload.error.issues[0]?.message ?? "Dati prodotto non validi.",
    };
  }

  const currencyInput = typeof values.currency === "string" ? values.currency.trim() : "";
  const currency = currencyInput ? currencyInput.toUpperCase() : "EUR";

  if (!/^[A-Z]{3}$/.test(currency)) {
    return { success: false, message: "La valuta deve essere composta da 3 lettere." };
  }

  const productId = Number(payload.data.productId);
  if (!Number.isFinite(productId)) {
    return { success: false, message: "ID prodotto non valido." };
  }

  try {
    const normalizedPrice = normalizePrice(payload.data.price);
    const product = await updateWooProduct(productId, {
      name: payload.data.name,
      sku: payload.data.sku || undefined,
      price: normalizedPrice,
      currency,
      description: payload.data.description || undefined,
      short_description: payload.data.shortDescription || undefined,
    });

    const stored = upsertAdminProduct({
      wooId: productId,
      name: product.name ?? payload.data.name,
      sku: typeof product.sku === "string" ? product.sku : payload.data.sku ?? null,
      price:
        typeof product.price === "string"
          ? product.price
          : typeof product.regular_price === "string"
          ? product.regular_price
          : normalizedPrice,
      currency,
      raw: product,
    });

    revalidatePath("/admin/products");
    return { success: true, product: stored };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Impossibile aggiornare il prodotto.",
    };
  }
}

export async function deleteProductAction(wooId: number) {
  await assertAuthenticated();

  if (!Number.isInteger(wooId) || wooId <= 0) {
    return { success: false, message: "ID prodotto non valido." };
  }

  try {
    await deleteWooProduct(wooId);
  } catch (error) {
    if (!(error instanceof Error) || !error.message.includes("404")) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Impossibile eliminare il prodotto.",
      };
    }
  }

  deleteAdminProduct(wooId);
  revalidatePath("/admin/products");
  return { success: true };
}

export async function createPaymentLinkAction(_: unknown, formData: FormData) {
  await assertAuthenticated();

  const values = normalizeFormData(formData);

  const product = productSchema.safeParse({
    mode: values.mode ?? "existing",
    productId: values.productId,
    productName: values.productName,
    productSku: values.productSku,
    productPrice: values.productPrice,
    discountFromPrice: values.discountFromPrice,
    quantity: values.quantity,
  });

  if (!product.success) {
    return {
      success: false,
      message: product.error.issues[0]?.message ?? "Dati prodotto non validi.",
    };
  }

  const customer = customerSchema.safeParse({
    firstName: values.firstName,
    lastName: values.lastName,
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
      // TypeScript should know this is newProductSchema at this point
      const newProductData = product.data as Extract<typeof product.data, { mode: "new" }>;
      const created = await ensureWooProduct({
        name: newProductData.productName,
        sku: newProductData.productSku,
        price: newProductData.productPrice,
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
        email: "customer@aycl.com",
      },
      quantity: product.data.quantity,
    });

    const basePriceNormalized = normalizePrice(basePrice ?? "0.00");
    const discountFromPriceNormalized = product.data.discountFromPrice
      ? normalizePrice(product.data.discountFromPrice)
      : null;

    const unitPriceString = basePriceNormalized;
    const unitPrice = Number.parseFloat(unitPriceString);
    const discountFromPriceNumber = discountFromPriceNormalized
      ? Number.parseFloat(discountFromPriceNormalized)
      : null;
    const effectiveDiscountFromPrice =
      discountFromPriceNumber && discountFromPriceNumber > unitPrice
        ? discountFromPriceNormalized
        : null;
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
        min: unitPrice,
        max:
          discountFromPriceNumber && discountFromPriceNumber > unitPrice
            ? discountFromPriceNumber
            : unitPrice,
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
        discountFromPrice: effectiveDiscountFromPrice ?? undefined,
      },
    };

    const checkoutToken = encryptCheckoutOrder(order);
    const checkoutUrl = `${resolveCheckoutBaseUrl()}/checkout?order=${checkoutToken}`;

    const metadataPayload = {
      wooPaymentUrl: paymentLink.payment_url,
      quantity,
      order,
      basePrice: basePriceNormalized,
      discountFromPrice: effectiveDiscountFromPrice,
      customer: customer.data,
      checkoutToken,
    } satisfies Record<string, unknown>;

    const record = recordPaymentLink({
      wooProductId,
      wooPaymentLinkId: paymentLink.id ? String(paymentLink.id) : null,
      productName,
      productSku:
        storedProduct?.sku ?? (product.data.mode === "new" ? product.data.productSku ?? null : null),
      productPrice: basePriceNormalized,
      currency: "EUR",
      discountFromPrice: effectiveDiscountFromPrice ?? undefined,
      customerFirstName: customer.data.firstName,
      customerLastName: customer.data.lastName,
      customerEmail: "customer@aycl.com",
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
  await assertAuthenticated();
  const values = normalizeFormData(formData);
  const payload = statusSchema.safeParse({
    paymentId: values.paymentId,
    status: values.status,
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
  await assertAuthenticated();
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

async function assertAuthenticated() {
  const user = await getCurrentAdmin();
  if (!user) {
    throw new Error("Non autorizzato.");
  }
}

function normalizePrice(value: string) {
  return normalizePriceInput(value);
}
