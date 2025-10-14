import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Calculator, Info, Sparkles, ArrowRight, Copy } from "lucide-react";

/**
 * Lead/Meeting Price Calculator — AYCL (Full Data)
 *
 * Visual, engaging calculator component that mirrors your Excel logic using FULL datasets:
 *  MIN  = baseMin  × geoMin × settMin
 *  MAX  = baseMax  × geoMax × settMax
 *  RECO = lerp(baseMin..baseMax, r) × lerp(geoMin..geoMax, r) × lerp(settMin..settMax, r)
 *  where r ∈ [0,1] from the “Profilo di prezzo” slider.
 *
 * Styling matches your site (navy / sky-blue / orange palette, gradient borders, rounded cards).
 *
 * Props (optional — pass real data or import the provided JSON files):
 * - baseItalia: Array<{ id: string, label: string, min: number, max: number }>
 * - coeffGeo:   Array<{ id: string, label: string, min: number, max: number }>
 * - coeffSett:  Array<{ id: string, label: string, min: number, max: number }>
 * - currency:   string (ISO, e.g. "EUR")
 * - locale:     string for number formatting
 * - className:  string
 * - t:          (key: string, vars?: Record<string,string|number>) => string   // optional i18n; falls back to hardcoded it-IT text
 * - onQuote:    (data) => void            // optional callback when user clicks CTA
 */
export default function LeadPriceCalculator({
  baseItalia = DEFAULT_BASE_ITALIA,
  coeffGeo = DEFAULT_COEFF_GEO,
  coeffSett = DEFAULT_COEFF_SETT,
  currency = "EUR",
  locale = "it-IT",
  className = "",
  t,
  onQuote,
}) {
  const _t = useMemo(() => createT(t), [t]);

  const [revenueBand, setRevenueBand] = useState(baseItalia[0]?.id || "");
  const [geo, setGeo] = useState(coeffGeo[0]?.id || "");
  const [sett, setSett] = useState(coeffSett[0]?.id || "");
  const [qty, setQty] = useState(10);
  const [risk, setRisk] = useState(50); // 0 = MIN, 100 = MAX

  const format = useMemo(
    () => (v) => new Intl.NumberFormat(locale, { style: "currency", currency }).format(v),
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
    const text = `${_t("label.priceUnit")} ${format(calc.suggested)} — ${_t("label.quantity")} ${qty} → ${format(totalSuggested)}`;
    navigator.clipboard?.writeText(text);
  }

  function handleQuote() {
    onQuote?.({
      revenueBand,
      geo,
      sett,
      qty,
      priceMin: calc.priceMin,
      priceMax: calc.priceMax,
      suggested: calc.suggested,
      totalSuggested,
      currency,
    });
  }

  return (
    <section className={`relative py-16 sm:py-24 ${className}`}>
      {/* top gradient bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-navy via-sky-blue to-orange" />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 sm:space-y-5">
          <span className="inline-flex items-center justify-center rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            {_t("badge")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy text-balance">
            {_t("title")}
          </h2>
          <p className="text-sm sm:text-base text-gray-600">{_t("subtitle")}</p>
        </div>

        {/* Card */}
        <div className="mt-10 sm:mt-14 grid lg:grid-cols-5 gap-4 sm:gap-6 items-stretch">
          <div className="lg:col-span-3 h-full rounded-2xl p-[2px] bg-[linear-gradient(90deg,var(--navy),var(--sky-blue),var(--orange))]">
            <div className="rounded-[1rem] bg-white/95 backdrop-blur-sm p-5 sm:p-7 h-full">
              {/* Inputs */}
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <Field label={_t("fields.revenueBand")}>
                  <select className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-blue"
                    value={revenueBand} onChange={(e) => setRevenueBand(e.target.value)}>
                    {baseItalia.map((b) => (
                      <option key={b.id} value={b.id}>{b.label}</option>
                    ))}
                  </select>
                </Field>

                <Field label={_t("fields.geo")}>
                  <select className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-blue"
                    value={geo} onChange={(e) => setGeo(e.target.value)}>
                    {coeffGeo.map((g) => (
                      <option key={g.id} value={g.id}>{g.label}</option>
                    ))}
                  </select>
                </Field>

                <Field label={_t("fields.sector")}>
                  <select className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-blue"
                    value={sett} onChange={(e) => setSett(e.target.value)}>
                    {coeffSett.map((s) => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </select>
                </Field>

                <Field label={_t("fields.quantity")}>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={1}
                      max={200}
                      step={1}
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                      className="w-full accent-orange"
                    />
                    <div className="w-14 text-right text-sm font-semibold text-navy">{qty}</div>
                  </div>
                </Field>

                <Field label={_t("fields.risk")}>
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
                  <p className="mt-1 text-[11px] text-gray-500">{_t("hint.risk")}</p>
                </Field>
              </div>

              {/* Formula + chips */}
              <div className="mt-6 grid sm:grid-cols-3 gap-3 text-xs text-gray-700">
                <Chip icon={<Calculator className="h-3.5 w-3.5" />}>{_t("chip.base", { v: `${format(calc.baseMin)} – ${format(calc.baseMax)}` })}</Chip>
                <Chip>{_t("chip.geo", { v: `${calc.geoMin} – ${calc.geoMax}` })}</Chip>
                <Chip>{_t("chip.sector", { v: `${calc.setMin} – ${calc.setMax}` })}</Chip>
              </div>

              <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
                <div className="grid sm:grid-cols-3 gap-4 text-center">
                  <Stat label={_t("stat.min")}>{format(calc.priceMin)}</Stat>
                  <Stat label={_t("stat.suggested")} highlight>
                    <div className="flex items-center justify-center gap-2">
                      <Sparkles className="h-5 w-5" /> {format(calc.suggested)}
                    </div>
                  </Stat>
                  <Stat label={_t("stat.max")}>{format(calc.priceMax)}</Stat>
                </div>
                <p className="mt-3 text-center text-[12px] text-gray-500 flex items-center justify-center gap-1">
                  <Info className="h-3.5 w-3.5" />
                  {_t("footnote", { unit: calc.b?.label || "" })}
                </p>
              </div>
            </div>
          </div>

          {/* Summary / CTA */}
          <div className="lg:col-span-2 h-full rounded-2xl p-[2px] bg-[linear-gradient(90deg,var(--navy),var(--sky-blue),var(--orange))]">
            <div className="rounded-[1rem] bg-white/95 backdrop-blur-sm p-5 sm:p-7 h-full flex flex-col">
              <div className="text-center space-y-1">
                <p className="text-xs uppercase tracking-[0.25em] text-gray-400">{_t("summary.badge")}</p>
                <h3 className="text-xl sm:text-2xl font-bold text-navy">{_t("summary.title")}</h3>
                <p className="text-sm text-gray-600">{_t("summary.subtitle")}</p>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-lg border border-gray-200 p-3">
                  <p className="text-[11px] text-gray-500">{_t("summary.unitLabel")}</p>
                  <p className="text-lg font-semibold text-navy">{format(calc.suggested)}</p>
                </div>
                <div className="rounded-lg border border-gray-200 p-3">
                  <p className="text-[11px] text-gray-500">{_t("summary.qtyLabel")}</p>
                  <p className="text-lg font-semibold text-navy">{qty}</p>
                </div>
                <div className="rounded-lg border border-gray-200 p-3">
                  <p className="text-[11px] text-gray-500">{_t("summary.totalLabel")}</p>
                  <p className="text-lg font-semibold text-navy">{format(totalSuggested)}</p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3 text-center text-xs text-gray-600">
                <div>
                  <p className="uppercase tracking-wider text-gray-400">{_t("summary.range")}</p>
                  <p>{format(totalMin)} – {format(totalMax)}</p>
                </div>
                <div>
                  <p className="uppercase tracking-wider text-gray-400">{_t("summary.geoCoeff")}</p>
                  <p>{calc.geoMin} – {calc.geoMax}</p>
                </div>
                <div>
                  <p className="uppercase tracking-wider text-gray-400">{_t("summary.settCoeff")}</p>
                  <p>{calc.setMin} – {calc.setMax}</p>
                </div>
              </div>

              <div className="mt-auto flex flex-col gap-3">
                <button
                  onClick={handleQuote}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange px-5 py-3 text-white font-semibold shadow-lg hover:shadow-orange/30 transition-all duration-300 hover:translate-y-[-2px]"
                >
                  {_t("cta")} <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-navy font-semibold hover:bg-gray-50"
                >
                  <Copy className="h-4 w-4" /> {_t("copy")}
                </button>

                <ul className="mt-2 space-y-1 text-xs text-gray-600">
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-orange mt-0.5" />{_t("bullets.a")}</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-orange mt-0.5" />{_t("bullets.b")}</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-orange mt-0.5" />{_t("bullets.c")}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <div className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">{label}</div>
      {children}
    </label>
  );
}

function Stat({ label, children, highlight }) {
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

function Chip({ children, icon }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1">
      {icon ? icon : null}
      <span className="text-[12px] text-gray-700">{children}</span>
    </div>
  );
}

function round2(v) { return Math.round((v + Number.EPSILON) * 100) / 100; }
function lerp(a, b, t) { return a + (b - a) * t; }

function createT(t) {
  const F = (key, vars = {}) => {
    const d = DEFAULT_TEXT[key] || key;
    const s = t ? t(key, vars) : template(d, vars);
    return s;
  };
  return F;
}

function template(str, vars) { return String(str).replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? `{${k}}`)); }

// ---- Defaults (FULL DATA from your Excel via exported JSON). You can import these from files instead. ----
// For convenience we inline them here; replace with real imports if you prefer to keep data external.
const DEFAULT_BASE_ITALIA = BASE_ITALIA_DATA();
const DEFAULT_COEFF_GEO   = COEFF_GEO_DATA();
const DEFAULT_COEFF_SETT  = COEFF_SETT_DATA();

function BASE_ITALIA_DATA() {
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

function COEFF_GEO_DATA() {
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

function COEFF_SETT_DATA() {
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

// Text defaults (Italian). External i18n JSONs are also provided.
const DEFAULT_TEXT = {
  badge: "Calcolatore Prezzo Meeting",
  title: "Quanto costa un meeting in target?",
  subtitle: "Seleziona fascia di fatturato, area e settore: calcoleremo una forchetta e un prezzo consigliato.",
  fields: {
    revenueBand: "Fascia fatturato target",
    geo: "Area / Paese",
    sector: "Settore / Industria",
    quantity: "Numero di meeting",
    risk: "Profilo di prezzo",
  },
  hint: { risk: "Trascina verso MIN per offerte conservative, verso MAX per mercati complessi o urgenza." },
  chip: { base: "Base Italia: {v}", geo: "Coeff. GEO: {v}", sector: "Coeff. SETT: {v}" },
  stat: { min: "Prezzo MIN / meeting", suggested: "Prezzo CONSIGLIATO", max: "Prezzo MAX / meeting" },
  footnote: "Calcolato su base Italia × coefficienti GEO e SETT. Fascia: {unit}.",
  summary: {
    badge: "Riepilogo",
    title: "Stima complessiva",
    subtitle: "Puoi usare questi numeri per un budget iniziale.",
    unitLabel: "Per meeting",
    qtyLabel: "Quantità",
    totalLabel: "Totale stimato",
    range: "Range",
    geoCoeff: "Coeff. GEO",
    settCoeff: "Coeff. SETT",
  },
  cta: "Richiedi preventivo",
  copy: "Copia stima",
  bullets: {
    a: "Logica come da Excel (Base × GEO × SETT)",
    b: "Trasparente: mostra min, max e consigliato",
    c: "Pronto per integrazione e i18n",
  },
  label: { priceUnit: "Prezzo consigliato / meeting:", quantity: "Quantità:" },
};
