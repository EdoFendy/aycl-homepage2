"use client"

import React, { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Calculator, Info, Sparkles, ArrowRight, Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DriveTestOrder } from "@/lib/drive-test";

interface BaseData {
  id: string;
  label: string;
  min: number;
  max: number;
}

interface CalculatorProps {
  baseItalia?: BaseData[];
  coeffGeo?: BaseData[];
  coeffSett?: BaseData[];
  currency?: string;
  locale?: string;
  className?: string;
  onCheckout?: (order: DriveTestOrder) => boolean | void;
  variant?: "section" | "card";
  id?: string;
}

interface FieldProps {
  label: string;
  children: React.ReactNode;
}

interface StatProps {
  label: string;
  children: React.ReactNode;
  highlight?: boolean;
}

interface ChipProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const MIN_APPOINTMENTS = 5;
const MAX_APPOINTMENTS = 20;

export default function LeadPriceCalculator({
  baseItalia = DEFAULT_BASE_ITALIA,
  coeffGeo = DEFAULT_COEFF_GEO,
  coeffSett = DEFAULT_COEFF_SETT,
  currency = "EUR",
  locale = "it-IT",
  className = "",
  onCheckout,
  variant = "section",
  id,
}: CalculatorProps) {
  const t = useTranslations("calcolatore");
  const router = useRouter();
  const isCardVariant = variant === "card";

  const baseItaliaLabels = t.raw("options.baseItalia") as Record<string, string>;
  const coeffGeoLabels = t.raw("options.coeffGeo") as Record<string, string>;
  const coeffSettLabels = t.raw("options.coeffSett") as Record<string, string>;

  const translateOptionLabel = useCallback(
    (group: "baseItalia" | "coeffGeo" | "coeffSett", item?: BaseData | null) => {
      if (!item) {
        return "";
      }

      const map =
        group === "baseItalia"
          ? baseItaliaLabels
          : group === "coeffGeo"
            ? coeffGeoLabels
            : coeffSettLabels;

      return map?.[item.id] ?? item.label ?? "";
    },
    [baseItaliaLabels, coeffGeoLabels, coeffSettLabels]
  );

  const [revenueBand, setRevenueBand] = useState(baseItalia[0]?.id || "");
  const [geo, setGeo] = useState(coeffGeo[0]?.id || "");
  const [sett, setSett] = useState(coeffSett[0]?.id || "");
  const [qty, setQty] = useState(MIN_APPOINTMENTS);
  const [risk, setRisk] = useState(50); // 0 = MIN, 100 = MAX
  const [generatingLink, setGeneratingLink] = useState(false);

  const format = useMemo(
    () => (v: number) => new Intl.NumberFormat(locale, { style: "currency", currency }).format(v),
    [locale, currency]
  );

  const calc = useMemo(() => {
    const b = baseItalia.find((x) => x.id === revenueBand) || baseItalia[0];
    const g = coeffGeo.find((x) => x.id === geo) || coeffGeo[0];
    const s = coeffSett.find((x) => x.id === sett) || coeffSett[0];

    const baseMin = b?.min ?? 0; const baseMax = b?.max ?? 0;
    const geoMin  = g?.min ?? 1; const geoMax  = g?.max ?? 1;
    const setMin  = s?.min ?? 1; const setMax  = s?.max ?? 1;

    const priceMin = round2(baseMin * geoMin * setMin);
    const priceMax = round2(baseMax * geoMax * setMax);

    const r = (risk || 0) / 100; // 0..1
    const baseR = lerp(baseMin, baseMax, r);
    const geoR  = lerp(geoMin,  geoMax,  r);
    const setR  = lerp(setMin,  setMax,  r);
    const suggested = round2(baseR * geoR * setR);

    return { b, g, s, baseMin, baseMax, geoMin, geoMax, setMin, setMax, priceMin, priceMax, suggested };
  }, [baseItalia, coeffGeo, coeffSett, revenueBand, geo, sett, risk]);

  const totalMin = calc.priceMin * qty;
  const totalMax = calc.priceMax * qty;
  const totalSuggested = calc.suggested * qty;

  function handleCopy() {
    const text = `${t("label.priceUnit")} ${format(calc.suggested)} — ${t("label.quantity")} ${qty} → ${format(totalSuggested)}`;
    navigator.clipboard?.writeText(text);
  }

  async function handleCheckout() {
    const order: DriveTestOrder = {
      package: "Drive Test",
      currency,
      unitPrice: calc.suggested,
      quantity: qty,
      total: totalSuggested,
      priceRange: {
        min: calc.priceMin,
        max: calc.priceMax,
      },
      selections: {
        revenueBand: {
          id: calc.b?.id ?? revenueBand,
          label: translateOptionLabel("baseItalia", calc.b || null),
        },
        geography: {
          id: calc.g?.id ?? geo,
          label: translateOptionLabel("coeffGeo", calc.g || null),
        },
        sector: {
          id: calc.s?.id ?? sett,
          label: translateOptionLabel("coeffSett", calc.s || null),
        },
        riskProfile: risk,
      },
      metadata: {
        locale,
        generatedAt: new Date().toISOString(),
      },
    };

    const handled = onCheckout?.(order);

    if (handled === true) {
      return;
    }

    if (generatingLink) {
      return;
    }

    try {
      setGeneratingLink(true);
      const response = await fetch("/api/checkout/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate checkout token: ${response.status}`);
      }

      const data = (await response.json()) as { success?: boolean; token?: string };
      if (!data?.success || !data.token) {
        throw new Error("Invalid response from checkout API");
      }

      router.push(`/checkout?order=${data.token}`);
    } catch (error) {
      console.error("Unable to generate checkout link", error);
    } finally {
      setGeneratingLink(false);
    }
  }

  const header = (
    <div
      className={cn(
        isCardVariant
          ? "space-y-2 text-left"
          : "max-w-3xl mx-auto text-center space-y-3 sm:space-y-5"
      )}
    >
      <span
        className={cn(
          "inline-flex items-center rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500",
          isCardVariant ? "" : "justify-center mx-auto"
        )}
      >
        {t("badge")}
      </span>
      <h2
        className={cn(
          "font-bold text-navy text-balance",
          isCardVariant
            ? "text-xl sm:text-2xl md:text-3xl"
            : "text-2xl sm:text-3xl md:text-4xl"
        )}
      >
        {t("title")}
      </h2>
      <p
        className={cn(
          "text-gray-600",
          isCardVariant
            ? "text-sm sm:text-base"
            : "text-sm sm:text-base max-w-2xl mx-auto"
        )}
      >
        {t("subtitle")}
      </p>
    </div>
  );

  const calculatorGrid = (
    <div
      className={cn(
        "grid lg:grid-cols-5 gap-4 sm:gap-6 items-stretch",
        isCardVariant ? "mt-6" : "mt-10 sm:mt-14"
      )}
    >
      <div className="lg:col-span-3 h-full rounded-2xl p-[2px] bg-[linear-gradient(90deg,var(--navy),var(--sky-blue),var(--orange))]">
        <div className="rounded-[1rem] bg-white/95 backdrop-blur-sm p-5 sm:p-7 h-full">
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <Field label={t("fields.revenueBand")}>
              <select
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-blue"
                value={revenueBand}
                onChange={(e) => setRevenueBand(e.target.value)}
              >
                {baseItalia.map((b) => (
                  <option key={b.id} value={b.id}>
                    {translateOptionLabel("baseItalia", b)}
                  </option>
                ))}
              </select>
            </Field>

            <Field label={t("fields.geo")}>
              <select
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-blue"
                value={geo}
                onChange={(e) => setGeo(e.target.value)}
              >
                {coeffGeo.map((g) => (
                  <option key={g.id} value={g.id}>
                    {translateOptionLabel("coeffGeo", g)}
                  </option>
                ))}
              </select>
            </Field>

            <Field label={t("fields.sector")}>
              <select
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-blue"
                value={sett}
                onChange={(e) => setSett(e.target.value)}
              >
                {coeffSett.map((s) => (
                  <option key={s.id} value={s.id}>
                    {translateOptionLabel("coeffSett", s)}
                  </option>
                ))}
              </select>
            </Field>

            <Field label={t("fields.risk")}>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={risk}
                  onChange={(e) => setRisk(Number(e.target.value))}
                  className="w-full accent-sky-blue"
                />
                <div className="w-14 text-right text-xs font-medium text-gray-600">{risk}%</div>
              </div>
              <p className="mt-1 text-[11px] text-gray-500">{t("hint.risk")}</p>
            </Field>
          </div>

          <div className="mt-6 grid sm:grid-cols-3 gap-3 text-xs text-gray-700">
            <Chip icon={<Calculator className="h-3.5 w-3.5" />}>
              {t("chip.base", { v: `${format(calc.baseMin)} – ${format(calc.baseMax)}` })}
            </Chip>
            <Chip>
              {t("chip.geo", { v: `${calc.geoMin} – ${calc.geoMax}` })}
            </Chip>
            <Chip>
              {t("chip.sector", { v: `${calc.setMin} – ${calc.setMax}` })}
            </Chip>
          </div>

          <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="grid sm:grid-cols-3 gap-4 text-center">
              <Stat label={t("stat.min")}>{format(calc.priceMin)}</Stat>
              <Stat label={t("stat.suggested")} highlight>
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="h-5 w-5" /> {format(calc.suggested)}
                </div>
              </Stat>
              <Stat label={t("stat.max")}>{format(calc.priceMax)}</Stat>
            </div>
            <p className="mt-3 text-center text-[12px] text-gray-500 flex items-center justify-center gap-1">
              <Info className="h-3.5 w-3.5" />
              {t("footnote", { unit: translateOptionLabel("baseItalia", calc.b || baseItalia[0] || null) })}
            </p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 h-full rounded-2xl p-[2px] bg-[linear-gradient(90deg,var(--navy),var(--sky-blue),var(--orange))]">
        <div className="rounded-[1rem] bg-white/95 backdrop-blur-sm p-5 sm:p-7 h-full flex flex-col">
          <div className="text-center space-y-1">
            <p className="text-xs uppercase tracking-[0.25em] text-gray-400">{t("summary.badge")}</p>
            <h3 className="text-xl sm:text-2xl font-bold text-navy">{t("summary.title")}</h3>
            <p className="text-sm text-gray-600">{t("summary.subtitle")}</p>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-lg border border-gray-200 p-3">
              <p className="text-[11px] text-gray-500">{t("summary.unitLabel")}</p>
              <p className="text-lg font-semibold text-navy">{format(calc.suggested)}</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-3">
              <p className="text-[11px] text-gray-500">{t("summary.qtyLabel")}</p>
              <p className="text-lg font-semibold text-navy">{qty}</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-3">
              <p className="text-[11px] text-gray-500">{t("summary.totalLabel")}</p>
              <p className="text-lg font-semibold text-navy">{format(totalSuggested)}</p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3 text-center text-xs text-gray-600">
            <div>
              <p className="uppercase tracking-wider text-gray-400">{t("summary.range")}</p>
              <p>{format(totalMin)} – {format(totalMax)}</p>
            </div>
            <div>
              <p className="uppercase tracking-wider text-gray-400">{t("summary.geoCoeff")}</p>
              <p>{calc.geoMin} – {calc.geoMax}</p>
            </div>
            <div>
              <p className="uppercase tracking-wider text-gray-400">{t("summary.settCoeff")}</p>
              <p>{calc.setMin} – {calc.setMax}</p>
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-3">
            <button
              type="button"
              onClick={handleCheckout}
              disabled={generatingLink}
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-xl bg-orange px-5 py-3 text-white font-semibold shadow-lg transition-all duration-300",
                generatingLink ? "opacity-70" : "hover:translate-y-[-2px] hover:shadow-orange/30"
              )}
            >
              {generatingLink ? `${t("ctaCheckout")}…` : t("ctaCheckout")} <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={handleCopy}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-navy font-semibold hover:bg-gray-50"
            >
              <Copy className="h-4 w-4" /> {t("copy")}
            </button>

            <ul className="mt-2 space-y-1 text-xs text-gray-600">
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-orange mt-0.5" />{t("bullets.a")}</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-orange mt-0.5" />{t("bullets.b")}</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-orange mt-0.5" />{t("bullets.c")}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const sliderSection = (
    <div
      className={cn(
        isCardVariant ? "mt-8" : "mt-10 sm:mt-12 max-w-4xl mx-auto"
      )}
    >
      <div className="rounded-2xl border border-gray-200 bg-white/95 p-5 sm:p-7 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.25em] text-gray-400">{t("slider.badge")}</p>
            <h3 className="text-lg sm:text-xl font-semibold text-navy">{t("slider.label")}</h3>
            <p className="text-sm text-gray-500">{t("slider.helper")}</p>
          </div>
          <div className="text-center sm:text-right">
            <p className="text-xs uppercase tracking-[0.25em] text-gray-400">{t("slider.current")}</p>
            <p className="text-3xl font-bold text-navy">{qty}</p>
            <p className="text-xs text-gray-500">{t("slider.appointments")}</p>
          </div>
        </div>
        <div className="mt-4 sm:mt-6">
          <input
            type="range"
            min={MIN_APPOINTMENTS}
            max={MAX_APPOINTMENTS}
            step={1}
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="w-full accent-orange"
            aria-valuemin={MIN_APPOINTMENTS}
            aria-valuemax={MAX_APPOINTMENTS}
            aria-valuenow={qty}
            aria-label={t("slider.label")}
          />
          <div className="mt-2 flex justify-between text-xs font-medium text-gray-400">
            <span>{MIN_APPOINTMENTS}</span>
            <span>{MAX_APPOINTMENTS}</span>
          </div>
        </div>
      </div>
    </div>
  );

  if (isCardVariant) {
    return (
      <Card
        id={id}
        className={cn(
          "relative overflow-hidden border border-sky-blue/30 bg-gradient-to-br from-sky-blue/5 via-white to-orange/5 px-5 py-6 sm:px-6 sm:py-8 md:px-8 shadow-lg",
          className
        )}
      >
        <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-sky-blue/10 blur-2xl" />
        <div className="absolute bottom-0 left-0 h-28 w-28 rounded-full bg-orange/10 blur-2xl" />
        <div className="relative z-10 flex flex-col gap-6">
          {header}
          {calculatorGrid}
          {sliderSection}
        </div>
      </Card>
    );
  }

  return (
    <section id={id} className={cn("relative py-16 sm:py-24", className)}>
      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-navy via-sky-blue to-orange" />
      <div className="container mx-auto px-4 sm:px-6">
        {header}
        {calculatorGrid}
        {sliderSection}
      </div>
    </section>
  );
}

function Field({ label, children }: FieldProps) {
  return (
    <label className="block">
      <div className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">{label}</div>
      {children}
    </label>
  );
}

function Stat({ label, children, highlight }: StatProps) {
  return (
    <div className={`rounded-xl p-4 border ${highlight ? "border-orange bg-orange/5" : "border-gray-200 bg-white"}`}>
      <p className="text-[11px] uppercase tracking-wider text-gray-500">{label}</p>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="mt-1 text-xl font-bold text-navy"
      >
        {children}
      </motion.div>
    </div>
  );
}

function Chip({ children, icon }: ChipProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1">
      {icon ? icon : null}
      <span className="text-[12px] text-gray-700">{children}</span>
    </div>
  );
}

function round2(v: number) { return Math.round((v + Number.EPSILON) * 100) / 100; }
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

// ---- Defaults (FULL DATA from your Excel via exported JSON). You can import these from files instead. ----
// For convenience we inline them here; replace with real imports if you prefer to keep data external.
const DEFAULT_BASE_ITALIA = BASE_ITALIA_DATA();
const DEFAULT_COEFF_GEO   = COEFF_GEO_DATA();
const DEFAULT_COEFF_SETT  = COEFF_SETT_DATA();

function BASE_ITALIA_DATA(): BaseData[] {
  return [
    { id: "band_0", label: "< €100K", min: 80, max: 80 },
    { id: "band_1", label: "€100K – €500K", min: 90, max: 95 },
    { id: "band_2", label: "€500K – €1M", min: 100, max: 120 },
    { id: "band_3", label: "€1M – €5M", min: 120, max: 140 },
    { id: "band_4", label: "€5M – €10M", min: 140, max: 160 },
    { id: "band_5", label: "€10M – €20M", min: 160, max: 180 },
    { id: "band_6", label: "€20M – €50M", min: 180, max: 220 },
    { id: "band_7", label: "€50M+", min: 220, max: 300 },
  ];
}

function COEFF_GEO_DATA(): BaseData[] {
  return [
    { id: "geo_0", label: "Italia", min: 1.0, max: 1.0 },
    { id: "geo_1", label: "Spagna / Portogallo", min: 1.1, max: 1.1 },
    { id: "geo_2", label: "Francia / Germania / Benelux", min: 1.2, max: 1.3 },
    { id: "geo_3", label: "UK / Irlanda", min: 1.25, max: 1.35 },
    { id: "geo_4", label: "Est Europa", min: 1.2, max: 1.4 },
    { id: "geo_5", label: "Nordics (SE/NO/DK/FI)", min: 1.2, max: 1.3 },
    { id: "geo_6", label: "USA / Canada", min: 1.5, max: 1.6 },
    { id: "geo_7", label: "LATAM", min: 1.1, max: 1.2 },
    { id: "geo_8", label: "Middle East", min: 1.3, max: 1.6 },
    { id: "geo_9", label: "Africa", min: 1.2, max: 1.3 },
    { id: "geo_10", label: "Asia (SG/HK/JP)", min: 1.4, max: 1.6 },
    { id: "geo_11", label: "Oceania (AU/NZ)", min: 1.4, max: 1.5 },
  ];
}

function COEFF_SETT_DATA(): BaseData[] {
  return [
    { id: "sett_0", label: "SaaS / Tech B2B", min: 1.0, max: 1.1 },
    { id: "sett_1", label: "Marketing / HR / Servizi professionali", min: 1.1, max: 1.2 },
    { id: "sett_2", label: "Manifatturiero / Industria / Automotive", min: 1.2, max: 1.3 },
    { id: "sett_3", label: "Finanza / Banking / Investment", min: 1.4, max: 1.6 },
    { id: "sett_4", label: "Sanità / Medicale / Pharma", min: 1.3, max: 1.5 },
    { id: "sett_5", label: "Real Estate / Construction", min: 1.2, max: 1.4 },
    { id: "sett_6", label: "Retail / E-commerce", min: 1.1, max: 1.3 },
    { id: "sett_7", label: "Energia / Oil & Gas / Utility", min: 1.5, max: 1.8 },
    { id: "sett_8", label: "Pubblica Amministrazione / Istituzioni", min: 1.6, max: 1.9 },
    { id: "sett_9", label: "C-level targeting high-ticket", min: 1.8, max: 2.0 },
    { id: "sett_10", label: "Venture Capital / PE / M&A", min: 1.7, max: 2.0 },
  ];
}
