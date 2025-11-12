import { NextResponse } from "next/server";
import type { DriveTestCustomer, DriveTestOrder } from "@/lib/drive-test";
import { formatPriceString } from "@/lib/drive-test";
import { createCheckoutWithProducts } from "@/lib/woocommerce";

interface RequestPayload {
  order?: DriveTestOrder;
  customer?: DriveTestCustomer;
}

const ADMIN_PAYMENT_GATEWAY_ID = process.env.ADMIN_PAYMENT_GATEWAY_ID ?? "redsys";

export async function POST(request: Request) {
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
    gateway: ADMIN_PAYMENT_GATEWAY_ID,
  });

  const validationError = validatePayload(order, customer);
  if (validationError) {
    return NextResponse.json({ message: validationError }, { status: 400 });
  }

  try {
    // Prepare product data
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

    const productName = order.metadata?.productName?.trim() ||
      `${order.package} - ${order.quantity} ${quantityLabel}`;

    // Use WooCommerce library to create product and order
    const result = await createCheckoutWithProducts(
      [{
        name: productName,
        regular_price: order.unitPrice,
        quantity: order.quantity,
        description: description,
      }],
      {
        first_name: customer.firstName,
        last_name: customer.lastName,
        email: customer.email,
      },
      {
        gateway: ADMIN_PAYMENT_GATEWAY_ID as 'redsys' | 'stripe',
        metadata: {
          source: 'drive_test',
          package: order.package,
          locale: order.metadata?.locale,
          timestamp: new Date().toISOString(),
        },
      }
    );

    console.log("[DriveTestPayment] Payment link created:", {
      order_id: result.order_id,
      total: result.total,
    });

    return NextResponse.json({ paymentUrl: result.payment_url }, { status: 200 });
  } catch (error) {
    console.error("[DriveTestPayment] error:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unable to create payment link" },
      { status: 500 }
    );
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
