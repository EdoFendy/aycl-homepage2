import { NextResponse } from "next/server";
import type { DriveTestOrder } from "@/lib/drive-test";
import {
  buildKlarnaOrderPayload,
  buildKlarnaPayloadFromInput,
  getKlarnaAuthHeader,
  getKlarnaBaseUrl,
  getMerchantUrls,
  type KlarnaOrderLine,
} from "@/lib/payment-gateway/klarna";

interface KlarnaSessionRequest {
  order?: DriveTestOrder;
  amount?: number;
  currency?: string;
  locale?: string;
  purchaseCountry?: string;
  orderLines?: KlarnaOrderLine[];
  orderTaxAmount?: number;
  merchantReference?: string;
  merchantUrls?: Partial<Record<"terms" | "checkout" | "confirmation" | "push" | "cancellation", string>>;
}

export async function POST(request: Request) {
  let payload: KlarnaSessionRequest;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON payload" }, { status: 400 });
  }

  try {
    const orderPayload = getOrderPayload(payload);
    const baseUrl = getKlarnaBaseUrl();
    const authHeader = getKlarnaAuthHeader();
    const merchantUrls = getMerchantUrls(payload.merchantUrls);

    const response = await fetch(`${baseUrl}/payments/v1/sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify({
        ...orderPayload,
        intent: "BUY",
        merchant_urls: merchantUrls,
      }),
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data?.error_messages?.join(", ") || "Failed to create Klarna session" },
        { status: response.status }
      );
    }

    return NextResponse.json(
      {
        clientToken: data?.client_token,
        sessionId: data?.session_id,
        paymentMethodCategories: data?.payment_method_categories ?? [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Klarna][Session] error", error);
    const message = error instanceof Error ? error.message : "Unexpected Klarna error";
    return NextResponse.json({ message }, { status: 500 });
  }
}

function getOrderPayload(payload: KlarnaSessionRequest) {
  if (payload.order) {
    return buildKlarnaOrderPayload(payload.order);
  }

  if (
    typeof payload.amount !== "number" ||
    !payload.currency ||
    !Array.isArray(payload.orderLines) ||
    payload.orderLines.length === 0
  ) {
    throw new Error("Invalid Klarna session payload");
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
