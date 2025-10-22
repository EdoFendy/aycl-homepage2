import { NextResponse } from "next/server";
import type { DriveTestCustomer, DriveTestOrder } from "@/lib/drive-test";
import { formatPriceString } from "@/lib/drive-test";

interface RequestPayload {
  order?: DriveTestOrder;
  customer?: DriveTestCustomer;
}

const ADMIN_API_BASE = process.env.ADMIN_API_BASE;
const ADMIN_API_TOKEN = process.env.ADMIN_API_TOKEN;
const ADMIN_PAYMENT_GATEWAY_ID = process.env.ADMIN_PAYMENT_GATEWAY_ID ?? "redsys";

export async function POST(request: Request) {
  if (!ADMIN_API_BASE || !ADMIN_API_TOKEN) {
    return NextResponse.json(
      { message: "Admin API configuration missing" },
      { status: 500 }
    );
  }

  let payload: RequestPayload;

  try {
    payload = await request.json();
  } catch (error) {
    return NextResponse.json({ message: "Invalid JSON payload" }, { status: 400 });
  }

  if (!payload.order || !payload.customer) {
    return NextResponse.json({ message: "Order and customer data are required" }, { status: 400 });
  }

  const order = normalizeOrder(payload.order);
  const customer = normalizeCustomer(payload.customer);

  console.log("[DriveTestPayment] Processing request:", {
    order: {
      package: order.package,
      quantity: order.quantity,
      unitPrice: order.unitPrice,
      total: order.total,
      currency: order.currency,
    },
    customer: {
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
    },
    env: {
      apiBaseConfigured: !!ADMIN_API_BASE,
      apiTokenConfigured: !!ADMIN_API_TOKEN,
      gatewayId: ADMIN_PAYMENT_GATEWAY_ID,
    }
  });

  const validationError = validatePayload(order, customer);
  if (validationError) {
    return NextResponse.json({ message: validationError }, { status: 400 });
  }

  try {
    const product = await createDriveTestProduct(order);
    console.log("[DriveTestPayment] Product created successfully:", { productId: product.id });
    const paymentLink = await createPaymentLink(order, product.id, customer);

    return NextResponse.json({ paymentUrl: paymentLink.payment_url }, { status: 200 });
  } catch (error) {
    console.error("[DriveTestPayment] error:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unable to create payment link" },
      { status: 500 }
    );
  }
}

async function createDriveTestProduct(order: DriveTestOrder) {
  if (order.metadata?.wooProductId) {
    return { id: order.metadata.wooProductId };
  }

  const sku = `drive-test-${Date.now()}`;
  const quantityLabel = getQuantityLabel(order.metadata?.locale, order.quantity);
  const unitPrice = formatPriceString(order.unitPrice);
  const totalPrice = formatPriceString(order.total);
  const rangeMin = formatPriceString(order.priceRange.min);
  const rangeMax = formatPriceString(order.priceRange.max);

  const description = [
    `<p><strong>Pacchetto:</strong> ${order.package}</p>`,
    `<p><strong>Quantità:</strong> ${order.quantity} ${quantityLabel}</p>`,
    `<p><strong>Prezzo unitario:</strong> ${unitPrice} ${order.currency}</p>`,
    `<p><strong>Totale:</strong> ${totalPrice} ${order.currency}</p>`,
    `<p><strong>Range stimato:</strong> ${rangeMin} - ${rangeMax} ${order.currency}</p>`,
  ].join("");

  const response = await fetch(
    `${ADMIN_API_BASE}/products?token=${ADMIN_API_TOKEN}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name:
          order.metadata?.productName?.trim() ||
          `${order.package} - ${order.quantity} ${quantityLabel}`,
        type: "simple",
        status: "publish",
        sku,
        regular_price: unitPrice,
        virtual: true,
        description,
        short_description:
          order.metadata?.productName?.trim() ||
          `${order.package} (${order.quantity} ${quantityLabel})`,
      }),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const errorPayload = await safeParseJSON(response);
    const errorMessage = errorPayload?.message || "Failed to create product";
    console.error("[DriveTestPayment] Product creation failed:", {
      status: response.status,
      statusText: response.statusText,
      errorPayload,
      requestBody: {
        name: order.metadata?.productName?.trim() || `${order.package} - ${order.quantity}`,
        type: "simple",
        status: "publish",
        sku: `drive-test-${Date.now()}`,
        regular_price: formatPriceString(order.unitPrice),
      }
    });
    throw new Error(errorMessage);
  }

  return response.json() as Promise<{ id: number }>;
}

async function createPaymentLink(
  order: DriveTestOrder,
  productId: number,
  customer: DriveTestCustomer
) {
  const quantity = Number.isInteger(order.quantity) && order.quantity > 0 ? order.quantity : 1;

  const response = await fetch(
    `${ADMIN_API_BASE}/payment-links?token=${ADMIN_API_TOKEN}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gateway: ADMIN_PAYMENT_GATEWAY_ID,
        customer: {
          first_name: customer.firstName,
          last_name: customer.lastName,
          email: customer.email,
        },
        items: [
          {
            product_id: productId,
            quantity,
          },
        ],
      }),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const errorPayload = await safeParseJSON(response);
    const errorMessage = errorPayload?.message || "Failed to create payment link";
    console.error("[DriveTestPayment] Payment link creation failed:", {
      status: response.status,
      statusText: response.statusText,
      errorPayload: JSON.stringify(errorPayload, null, 2),
      requestBody: {
        gateway: ADMIN_PAYMENT_GATEWAY_ID,
        customer: {
          first_name: customer.firstName,
          last_name: customer.lastName,
          email: customer.email,
        },
        items: [
          {
            product_id: productId,
            quantity,
          },
        ],
      }
    });
    throw new Error(errorMessage);
  }

  return response.json() as Promise<{ payment_url: string }>;
}

async function safeParseJSON(response: Response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function getQuantityLabel(locale: string | undefined, quantity: number) {
  const normalized = locale?.split("-")[0];
  const isSingular = quantity === 1;

  switch (normalized) {
    case "en":
      return isSingular ? "appointment" : "appointments";
    case "es":
      return isSingular ? "cita" : "citas";
    default:
      return isSingular ? "appuntamento" : "appuntamenti";
  }
}

function normalizeOrder(order: DriveTestOrder): DriveTestOrder {
  const packageName = typeof order.package === "string" ? order.package : "";
  const currency = typeof order.currency === "string" ? order.currency : "";

  const rawQuantity = Number.isFinite(order.quantity) ? order.quantity : 0;
  const quantity = rawQuantity > 0 ? Math.round(rawQuantity) : 1;

  const rawUnitPrice = Number.isFinite(order.unitPrice) && order.unitPrice >= 0 ? order.unitPrice : 0;
  const unitPrice = Number(rawUnitPrice.toFixed(2));

  const computedTotal = Number((unitPrice * quantity).toFixed(2));
  const rawTotalValue = Number.isFinite(order.total) ? order.total : computedTotal;
  const rawTotal = Number(rawTotalValue.toFixed(2));
  const total = Math.abs(rawTotal - computedTotal) <= 0.01 ? rawTotal : computedTotal;

  const hasRangeMin = Number.isFinite(order.priceRange?.min);
  const hasRangeMax = Number.isFinite(order.priceRange?.max);
  const rawRangeMin = hasRangeMin ? (order.priceRange?.min as number) : unitPrice;
  const rawRangeMax = hasRangeMax ? (order.priceRange?.max as number) : unitPrice;
  const rangeMin = Number(Math.min(rawRangeMin, rawRangeMax, unitPrice).toFixed(2));
  const rangeMax = Number(Math.max(rawRangeMin, rawRangeMax, unitPrice).toFixed(2));

  return {
    ...order,
    package: packageName.trim(),
    currency: currency.trim().toUpperCase(),
    quantity,
    unitPrice,
    total,
    priceRange: {
      min: rangeMin,
      max: rangeMax,
    },
  };
}

function normalizeCustomer(customer: DriveTestCustomer): DriveTestCustomer {
  const firstName = typeof customer.firstName === "string" ? customer.firstName : "";
  const lastName = typeof customer.lastName === "string" ? customer.lastName : "";
  const email = typeof customer.email === "string" ? customer.email : "";

  return {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.trim().toLowerCase(),
  };
}

function validatePayload(order: DriveTestOrder, customer: DriveTestCustomer) {
  if (!order.package) {
    return "Missing order package";
  }

  if (!order.currency || order.currency.length < 3) {
    return "Missing or invalid currency";
  }

  if (!Number.isFinite(order.unitPrice) || order.unitPrice <= 0) {
    return "Missing or invalid unit price";
  }

  if (!Number.isFinite(order.total) || order.total <= 0) {
    return "Missing or invalid total price";
  }

  if (!Number.isFinite(order.quantity) || order.quantity <= 0) {
    return "Missing or invalid quantity";
  }

  if (order.priceRange.min > order.priceRange.max) {
    return "Invalid price range";
  }

  const expectedTotal = Number((order.unitPrice * order.quantity).toFixed(2));
  if (Math.abs(order.total - expectedTotal) > 0.01) {
    return "Order total does not match unit price and quantity";
  }

  if (!customer.firstName || !customer.lastName || !customer.email) {
    return "Missing customer fields";
  }

  const emailPattern = /.+@.+\..+/;
  if (!emailPattern.test(customer.email)) {
    return "Invalid customer email";
  }

  return null;
}
