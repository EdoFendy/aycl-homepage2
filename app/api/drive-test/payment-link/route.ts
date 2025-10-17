import { NextResponse } from "next/server";
import type { DriveTestCustomer, DriveTestOrder } from "@/lib/drive-test";
import { formatPriceString } from "@/lib/drive-test";

interface RequestPayload {
  order?: DriveTestOrder;
  customer?: DriveTestCustomer;
}

const ADMIN_API_BASE = process.env.ADMIN_API_BASE;
const ADMIN_API_TOKEN = process.env.ADMIN_API_TOKEN;
const ADMIN_PAYMENT_GATEWAY_ID = process.env.ADMIN_PAYMENT_GATEWAY_ID ?? "Card";

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

  const { order, customer } = payload;

  if (!customer.firstName || !customer.lastName || !customer.email) {
    return NextResponse.json({ message: "Missing customer fields" }, { status: 400 });
  }

  try {
    const product = await createDriveTestProduct(order);
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
        name: `${order.package} - ${order.quantity} ${quantityLabel}`,
        type: "simple",
        status: "publish",
        sku,
        regular_price: unitPrice,
        virtual: true,
        description,
        short_description: `${order.package} (${order.quantity} ${quantityLabel})`,
      }),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const errorPayload = await safeParseJSON(response);
    throw new Error(errorPayload?.message || "Failed to create product");
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
    throw new Error(errorPayload?.message || "Failed to create payment link");
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
