"use client"

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { PaymentGatewayProps } from "./types";
import SlideArrowButton from "@/components/animata/button/slide-arrow-button";

interface CreditCardResponse {
  paymentUrl?: string;
  message?: string;
}

export default function CreditCardGateway({ order }: PaymentGatewayProps) {
  const t = useTranslations("checkout");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    if (loading) return;

    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setError(t("payment.errors.missingFields"));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/drive-test/payment-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order,
          customer: {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
          },
        }),
      });

      const payload: CreditCardResponse = await response.json();

      if (!response.ok) {
        throw new Error(payload?.message || "Unable to create payment link");
      }

      if (payload?.paymentUrl) {
        window.location.href = payload.paymentUrl;
        return;
      }

      throw new Error("Invalid payment link response");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6 space-y-4">
      <p className="text-xs text-gray-500">{t("payment.creditCard.helper")}</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <Label htmlFor="checkout-first-name" className="text-xs uppercase tracking-[0.25em] text-gray-400">
            {t("payment.form.firstName")}
          </Label>
          <Input
            id="checkout-first-name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            placeholder="Mario"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="checkout-last-name" className="text-xs uppercase tracking-[0.25em] text-gray-400">
            {t("payment.form.lastName")}
          </Label>
          <Input
            id="checkout-last-name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            placeholder="Rossi"
          />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <Label htmlFor="checkout-email" className="text-xs uppercase tracking-[0.25em] text-gray-400">
            {t("payment.form.email")}
          </Label>
          <Input
            id="checkout-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="nome@azienda.it"
          />
        </div>
      </div>

      {error ? <p className="text-xs text-red-500">{error}</p> : null}

      <SlideArrowButton
        onClick={handleCheckout}
        disabled={loading}
        primaryColor="#ff9d3d"
        text={loading ? t("payment.cta.loading") : t("payment.cta.creditCard")}
        className="w-full"
      />
    </div>
  );
}
