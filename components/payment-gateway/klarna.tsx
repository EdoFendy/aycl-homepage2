"use client"

import { useState } from "react";
import { useTranslations } from "next-intl";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import type { PaymentGatewayProps } from "./types";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    Klarna?: {
      Payments: {
        init: (options: { client_token: string }) => Promise<void> | void;
        load: (
          options: { container: string; payment_method_category: string },
          data: Record<string, unknown>
        ) => Promise<void> | void;
        authorize: (
          options: { payment_method_category: string },
          data: Record<string, unknown>
        ) => Promise<{ approved: boolean; authorization_token?: string }> | { approved: boolean; authorization_token?: string };
      };
    };
  }
}

interface KlarnaSessionResponse {
  clientToken: string;
  sessionId: string;
  paymentMethodCategories?: Array<string | { identifier?: string }>;
  message?: string;
}

interface KlarnaOrderResponse {
  orderId?: string;
  redirectUrl?: string;
  message?: string;
}

interface KlarnaSessionState {
  clientToken: string;
  sessionId: string;
  paymentCategory: string;
  amount: number;
  currency: string;
  locale: string;
  purchaseCountry: string;
  orderLines: KlarnaOrderLine[];
  orderTaxAmount: number;
  merchantReference: string;
}

interface KlarnaOrderLine {
  type: string;
  name: string;
  quantity: number;
  unit_price: number;
  total_amount: number;
  total_tax_amount: number;
  tax_rate?: number;
  reference?: string;
}

const TAX_RATE_BPS = 2200; // 22%

export default function KlarnaGateway({ order }: PaymentGatewayProps) {
  const t = useTranslations("checkout");
  const router = useRouter();

  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [sessionState, setSessionState] = useState<KlarnaSessionState | null>(null);
  const [loadingSession, setLoadingSession] = useState(false);
  const [loadingWidget, setLoadingWidget] = useState(false);
  const [authorizing, setAuthorizing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  const appUrl = getAppUrl();
  const locale = order.metadata?.locale ?? "it-IT";
  const purchaseCountry = locale.split("-")[1]?.toUpperCase() ?? "IT";

  async function ensureKlarnaScript() {
    if (scriptLoaded) return;

    await new Promise<void>((resolve, reject) => {
      if (typeof window !== "undefined" && window.Klarna) {
        setScriptLoaded(true);
        return resolve();
      }

      const script = document.createElement("script");
      script.src = "https://x.klarnacdn.net/kp/lib/v1/api.js";
      script.async = true;
      script.onload = () => {
        setScriptLoaded(true);
        resolve();
      };
      script.onerror = () => reject(new Error("Klarna SDK failed to load"));
      document.body.appendChild(script);
    });
  }

  async function handleStartSession() {
    setLoadingSession(true);
    setError(null);
    setAuthError(null);

    try {
      await ensureKlarnaScript();

      const payload = buildClientSessionPayload({ order, locale, purchaseCountry, appUrl });

      const response = await fetch("/api/klarna/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data: KlarnaSessionResponse = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || t("payment.klarna.errors.session"));
      }

      const paymentCategory = extractPaymentCategory(data.paymentMethodCategories) ?? "pay_now";
      const orderTaxAmount = payload.orderLines.reduce((sum, line) => sum + (line.total_tax_amount || 0), 0);

      const session: KlarnaSessionState = {
        clientToken: data.clientToken,
        sessionId: data.sessionId,
        paymentCategory,
        amount: payload.amount,
        currency: payload.currency,
        locale: payload.locale,
        purchaseCountry: payload.purchaseCountry,
        orderLines: payload.orderLines,
        orderTaxAmount,
        merchantReference: payload.merchantReference,
      };

      setSessionState(session);

      await renderKlarnaWidget(paymentCategory, data.clientToken);
      setAuthorizing(true);
      setAuthError(null);
      try {
        const result = await authorizeWithSession(session);
        if (result?.redirectUrl) {
          window.location.href = result.redirectUrl;
          return;
        }
        router.push("/checkout/success?gateway=klarna");
      } finally {
        setAuthorizing(false);
      }
    } catch (err) {
      console.error("[Klarna] session error", err);
      setError(err instanceof Error ? err.message : t("payment.klarna.errors.session"));
    } finally {
      setLoadingSession(false);
    }
  }

  async function renderKlarnaWidget(category: string, clientToken: string) {
    if (!window.Klarna?.Payments) {
      throw new Error(t("payment.klarna.errors.sdkNotReady"));
    }

    setLoadingWidget(true);
    setAuthError(null);

    try {
      await window.Klarna.Payments.init({ client_token: clientToken });
      await window.Klarna.Payments.load(
        {
          container: "#klarna-payments-container",
          payment_method_category: category,
        },
        {}
      );
    } catch (err) {
      console.error("[Klarna] load error", err);
      setAuthError(err instanceof Error ? err.message : t("payment.klarna.errors.initialization"));
      throw err;
    } finally {
      setLoadingWidget(false);
    }
  }

  async function handleAuthorize() {
    if (!sessionState) {
      setError(t("payment.klarna.errors.session"));
      return;
    }

    setAuthorizing(true);
    setAuthError(null);

    try {
      const result = await authorizeWithSession(sessionState);
      if (result?.redirectUrl) {
        window.location.href = result.redirectUrl;
        return;
      }
      router.push("/checkout/success?gateway=klarna");
    } catch (err) {
      console.error("[Klarna] authorize error", err);
      setAuthError(err instanceof Error ? err.message : t("payment.klarna.errors.authorization"));
    } finally {
      setAuthorizing(false);
    }
  }

  return (
    <div className="mt-6 space-y-4">
      <Script src="https://x.klarnacdn.net/kp/lib/v1/api.js" strategy="lazyOnload" onLoad={() => setScriptLoaded(true)} />

      <p className="text-xs text-gray-500">{t("payment.klarna.helper")}</p>

      <Button
        onClick={handleStartSession}
        disabled={loadingSession}
        className="w-full border border-navy bg-transparent text-navy hover:bg-navy/10"
      >
        {loadingSession ? t("payment.klarna.loading") : t("payment.klarna.start")}
      </Button>

      <div className="hidden" aria-hidden="true">
        <div id="klarna-payments-container" />
      </div>

      {authError && sessionState ? (
        <Button
          onClick={handleAuthorize}
          disabled={authorizing || loadingWidget}
          className="w-full bg-orange text-white hover:bg-orange/90"
        >
          {authorizing || loadingWidget ? t("payment.klarna.confirming") : t("payment.klarna.confirm")}
        </Button>
      ) : null}

      {error ? <p className="text-xs text-red-500">{error}</p> : null}
      {authError ? <p className="text-xs text-red-500">{authError}</p> : null}
    </div>
  );
}

interface ClientSessionPayload {
  amount: number;
  currency: string;
  locale: string;
  purchaseCountry: string;
  orderLines: KlarnaOrderLine[];
  merchantUrls: {
    confirmation: string;
  };
  merchantReference: string;
}

async function authorizeWithSession(session: KlarnaSessionState) {
  if (!window.Klarna?.Payments) {
    throw new Error("Klarna Payments SDK not available");
  }

  const authResponse = await window.Klarna.Payments.authorize(
    { payment_method_category: session.paymentCategory },
    {}
  );

  if (!authResponse?.approved || !authResponse.authorization_token) {
    throw new Error("Autorizzazione Klarna non completata");
  }

  const response = await fetch("/api/klarna/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      authorizationToken: authResponse.authorization_token,
      sessionId: session.sessionId,
      amount: session.amount,
      currency: session.currency,
      locale: session.locale,
      purchaseCountry: session.purchaseCountry,
      orderLines: session.orderLines,
      orderTaxAmount: session.orderTaxAmount,
      merchantReference: session.merchantReference,
    }),
  });

  const payload: KlarnaOrderResponse = await response.json();

  if (!response.ok) {
    throw new Error(payload?.message || "Unable to create Klarna order");
  }

  return payload;
}

function buildClientSessionPayload({
  order,
  locale,
  purchaseCountry,
  appUrl,
}: {
  order: PaymentGatewayProps["order"];
  locale: string;
  purchaseCountry: string;
  appUrl: string;
}): ClientSessionPayload {
  const quantity = Math.max(order.quantity, 1);
  const totalAmount = Math.max(Math.round(order.total * 100), 0);
  const unitPrice = Math.max(Math.round(totalAmount / quantity), 1);
  const lineTotal = unitPrice * quantity;
  const generatedAt = order.metadata?.generatedAt ?? new Date().toISOString();

  const orderLines: KlarnaOrderLine[] = [
    {
      type: "physical",
      name: `${order.package} (${quantity})`,
      quantity,
      unit_price: unitPrice,
      tax_rate: TAX_RATE_BPS,
      total_amount: lineTotal,
      total_tax_amount: computeIncludedTax(lineTotal, TAX_RATE_BPS),
      reference: order.package,
    },
  ];

  return {
    amount: lineTotal,
    currency: order.currency,
    locale,
    purchaseCountry,
    orderLines,
    merchantReference: `${order.package}-${generatedAt}`,
    merchantUrls: {
      confirmation: `https://allyoucanleads.com/checkout/success`,
    },
  };
}

function computeIncludedTax(total: number, taxRateBps: number) {
  return Math.round(total - (total * 10000) / (10000 + taxRateBps));
}

function extractPaymentCategory(categories?: Array<string | { identifier?: string }>) {
  if (!categories || !categories.length) {
    return undefined;
  }

  const first = categories[0];
  if (typeof first === "string") {
    return first;
  }

  return first?.identifier;
}

function getAppUrl() {
  return process.env.NEXT_PUBLIC_APP_URL ?? "https://checkout.allyoucanleads.com";
}
