"use client"

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import CartCreditCardGateway from "./cart-credit-card";
import KlarnaGateway from "./klarna";
import type { PaymentGatewayId, PaymentGatewayProps } from "./types";

interface MethodConfig {
  id: PaymentGatewayId;
  supportsCheckout: boolean;
}

const METHODS: MethodConfig[] = [
  { id: "creditCard", supportsCheckout: true },
  { id: "klarna", supportsCheckout: true },
  { id: "paypal", supportsCheckout: false },
];

export default function CartPaymentGateway({ order }: PaymentGatewayProps) {
  const t = useTranslations("checkout");
  const firstAvailableMethod = useMemo(
    () => METHODS.find((method) => method.supportsCheckout)?.id ?? null,
    []
  );
  const [selectedMethod, setSelectedMethod] = useState<PaymentGatewayId | null>(firstAvailableMethod);

  const methodCards = useMemo(
    () =>
      METHODS.map((method) => ({
        ...method,
        label: t(`payment.methods.${method.id}.label`),
        description: t(`payment.methods.${method.id}.description`),
      })),
    [t]
  );

  return (
    <div className="rounded-3xl border border-gray-200 bg-white/95 p-6 sm:p-8 shadow-xl backdrop-blur">
      <h2 className="text-xl font-semibold text-navy">{t("payment.title")}</h2>
      <p className="mt-2 text-sm text-gray-500">{t("payment.subtitle")}</p>

      <div className="mt-6 space-y-3">
        {methodCards.map((method) => {
          const isSelected = selectedMethod === method.id;
          return (
            <button
              key={method.id}
              type="button"
              onClick={() => setSelectedMethod(method.id)}
              className={`w-full rounded-2xl border px-4 py-4 text-left transition-all ${
                isSelected ? "border-orange bg-orange/10 shadow-md" : "border-gray-200 bg-gray-50 hover:border-orange"
              }`}
            >
              <p className="text-sm font-semibold text-navy">{method.label}</p>
              <p className="text-xs text-gray-500">{method.description}</p>
              {!method.supportsCheckout ? (
                <p className="mt-3 text-xs font-medium uppercase tracking-[0.25em] text-gray-400">
                  {t("payment.comingSoon")}
                </p>
              ) : null}
            </button>
          );
        })}
      </div>

      {selectedMethod === "creditCard" ? <CartCreditCardGateway order={order} /> : null}
      {selectedMethod === "klarna" ? <KlarnaGateway order={order} /> : null}

      <p className="mt-6 text-xs text-gray-500">{t("payment.note")}</p>
    </div>
  );
}

