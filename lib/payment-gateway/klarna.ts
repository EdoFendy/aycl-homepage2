import type { DriveTestOrder } from "@/lib/drive-test";

const PLAYGROUND_BASE = "https://api.playground.klarna.com";
const PRODUCTION_BASE = "https://api.klarna.com";

export type KlarnaOrderLine = {
  type: string;
  name: string;
  quantity: number;
  unit_price: number;
  total_amount: number;
  total_tax_amount: number;
  tax_rate?: number;
  reference?: string;
};

export interface KlarnaPayloadInput {
  amount: number;
  currency: string;
  locale?: string;
  purchaseCountry?: string;
  orderLines: KlarnaOrderLine[];
  orderTaxAmount?: number;
  merchantReference?: string;
}

export function getKlarnaBaseUrl() {
  const environment = process.env.KLARNA_ENVIRONMENT?.toLowerCase() ?? "playground";
  return environment === "production" ? PRODUCTION_BASE : PLAYGROUND_BASE;
}

export function getKlarnaAuthHeader() {
  const username = process.env.KLARNA_USERNAME;
  const password = process.env.KLARNA_PASSWORD;

  if (!username || !password) {
    throw new Error("Missing Klarna credentials");
  }

  const token = Buffer.from(`${username}:${password}`).toString("base64");
  return `Basic ${token}`;
}

export function buildKlarnaOrderPayload(order: DriveTestOrder) {
  const locale = order.metadata?.locale ?? "it-IT";
  const purchaseCountry = locale.split("-")[1]?.toUpperCase() ?? "IT";
  const unitPrice = Math.round(order.unitPrice * 100);
  const quantity = order.quantity;
  const totalAmount = unitPrice * quantity;
  const generatedAt = order.metadata?.generatedAt ?? new Date().toISOString();

  return {
    purchase_country: purchaseCountry,
    purchase_currency: order.currency,
    locale,
    order_amount: totalAmount,
    order_tax_amount: 0,
    order_lines: [
      {
        type: "digital",
        name: `${order.package} (${quantity})`,
        quantity,
        unit_price: unitPrice,
        total_amount: totalAmount,
        total_tax_amount: 0,
        reference: order.package,
      },
    ],
    merchant_reference1: `${order.package}-${generatedAt}`,
  };
}

export function buildKlarnaPayloadFromInput(input: KlarnaPayloadInput) {
  if (!Number.isFinite(input.amount) || input.amount <= 0) {
    throw new Error("Invalid amount for Klarna request");
  }

  if (!input.currency) {
    throw new Error("Currency is required for Klarna request");
  }

  if (!input.orderLines?.length) {
    throw new Error("At least one order line is required for Klarna request");
  }

  const locale = input.locale ?? "it-IT";
  const purchaseCountry = (input.purchaseCountry ?? locale.split("-")[1] ?? "IT").toUpperCase();
  const orderTaxAmount =
    typeof input.orderTaxAmount === "number"
      ? input.orderTaxAmount
      : input.orderLines.reduce((sum, line) => sum + (line.total_tax_amount || 0), 0);
  const merchantReference = input.merchantReference ?? `DriveTest-${Date.now()}`;

  return {
    purchase_country: purchaseCountry,
    purchase_currency: input.currency,
    locale,
    order_amount: input.amount,
    order_tax_amount: orderTaxAmount,
    order_lines: input.orderLines,
    merchant_reference1: merchantReference,
  };
}

type MerchantUrlKey = "terms" | "checkout" | "confirmation" | "push" | "cancellation";

export function getMerchantUrls(overrides?: Partial<Record<MerchantUrlKey, string>>) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://allyoucanleads.com";

  const defaults: Record<MerchantUrlKey, string> = {
    terms: `${baseUrl}/termini-e-condizioni`,
    checkout: `${baseUrl}/checkout`,
    confirmation: `${baseUrl}/checkout/success?gateway=klarna`,
    push: `${baseUrl}/api/klarna/webhook`,
    cancellation: `${baseUrl}/checkout?gateway=klarna&canceled=true`,
  };

  const merged: Record<MerchantUrlKey, string> = { ...defaults, ...overrides };

  (Object.keys(merged) as MerchantUrlKey[]).forEach((key) => {
    merged[key] = ensureHttpsUrl(merged[key]);
  });

  return merged;
}

function ensureHttpsUrl(input: string) {
  try {
    const url = new URL(input);
    if (url.protocol !== "https:") {
      url.protocol = "https:";
    }
    return url.toString();
  } catch {
    throw new Error(`Invalid merchant URL provided: ${input}`);
  }
}
