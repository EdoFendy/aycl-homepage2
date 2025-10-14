import { NextResponse } from "next/server";
import type { DriveTestOrder } from "@/lib/drive-test";
import {
  buildKlarnaOrderPayload,
  buildKlarnaPayloadFromInput,
  getKlarnaAuthHeader,
  getKlarnaBaseUrl,
  type KlarnaOrderLine,
} from "@/lib/payment-gateway/klarna";

interface KlarnaOrderRequest {
  authorizationToken?: string;
  order?: DriveTestOrder;
  sessionId?: string | null;
  amount?: number;
  currency?: string;
  locale?: string;
  purchaseCountry?: string;
  orderLines?: KlarnaOrderLine[];
  orderTaxAmount?: number;
  merchantReference?: string;
}

export async function POST(request: Request) {
  let payload: KlarnaOrderRequest;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON payload" }, { status: 400 });
  }

  if (!payload.authorizationToken) {
    return NextResponse.json({ message: "Missing Klarna authorization token" }, { status: 400 });
  }

  try {
    const orderPayload = getOrderPayload(payload);
    const baseUrl = getKlarnaBaseUrl();
    const authHeader = getKlarnaAuthHeader();

    const response = await fetch(
      `${baseUrl}/payments/v1/authorizations/${payload.authorizationToken}/order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify({
          ...orderPayload,
          merchant_reference2: payload.sessionId ?? undefined,
        }),
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data?.error_messages?.join(", ") || "Failed to create Klarna order" },
        { status: response.status }
      );
    }

    return NextResponse.json(
      {
        orderId: data?.order_id,
        redirectUrl: data?.redirect_url,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Klarna][Order] error", error);
    const message = error instanceof Error ? error.message : "Unexpected Klarna error";
    return NextResponse.json({ message }, { status: 500 });
  }
}

function getOrderPayload(payload: KlarnaOrderRequest) {
  if (payload.order) {
    return buildKlarnaOrderPayload(payload.order);
  }

  if (
    typeof payload.amount !== "number" ||
    !payload.currency ||
    !Array.isArray(payload.orderLines) ||
    payload.orderLines.length === 0
  ) {
    throw new Error("Invalid Klarna order payload");
  }

  return buildKlarnaPayloadFromInput({
    amount: payload.amount,
    currency: payload.currency,
    locale: payload.locale,
    purchaseCountry: payload.purchaseCountry,
    orderLines: payload.orderLines,
    orderTaxAmount: payload.orderTaxAmount,
    merchantReference: payload.merchantReference,
  });
}
