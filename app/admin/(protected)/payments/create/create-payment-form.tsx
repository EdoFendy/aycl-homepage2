"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Copy, Check } from "lucide-react";
import { createPaymentLinkAction } from "@/app/admin/(protected)/actions";

type ProductOption = {
  wooId: number;
  name: string;
  price: string;
  currency: string;
  sku?: string;
};

type FormState = {
  success: boolean;
  message?: string;
  paymentUrl?: string;
  paymentId?: number;
  wooPaymentUrl?: string;
};

const initialState: FormState = {
  success: false,
};

export function CreatePaymentForm({ products }: { products: ProductOption[] }) {
  const hasProducts = products.length > 0;
  const [mode, setMode] = useState<"existing" | "new">(hasProducts ? "existing" : "new");
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    hasProducts ? products[0]!.wooId : null
  );
  const [state, formAction] = useFormState(createPaymentLinkAction, initialState);
  const [copied, setCopied] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (mode === "existing" && !hasProducts) {
      setMode("new");
      setSelectedProductId(null);
    }
  }, [mode, hasProducts]);

  useEffect(() => {
    if (mode === "existing" && hasProducts && selectedProductId === null) {
      setSelectedProductId(products[0]!.wooId);
    }
  }, [mode, hasProducts, selectedProductId, products]);

  const productMap = useMemo(() => {
    const map = new Map<number, ProductOption>();
    products.forEach((product) => map.set(product.wooId, product));
    return map;
  }, [products]);

  useEffect(() => {
    if (state.success && state.paymentUrl) {
      toast.success("Link di pagamento generato con successo.");
      formRef.current?.reset();
      if (mode === "existing" && hasProducts) {
        setSelectedProductId(products[0]!.wooId);
      }
    } else if (!state.success && state.message) {
      toast.error(state.message);
    }
  }, [state, mode, hasProducts, products]);

  useEffect(() => {
    setCopied(false);
  }, [state.paymentUrl]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      <form
        ref={formRef}
        action={formAction}
        className="space-y-6 rounded-3xl border border-slate-800/70 bg-slate-950/60 p-6"
      >
        <div className="rounded-2xl border border-slate-800/60 bg-slate-900/60 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Modalità prodotto
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <ModeButton
              label="Utilizza prodotto esistente"
              description="Seleziona un prodotto già presente su WooCommerce."
              active={mode === "existing"}
              disabled={!hasProducts}
              onClick={() => {
                setMode("existing");
                if (hasProducts && selectedProductId === null) {
                  setSelectedProductId(products[0]!.wooId);
                }
              }}
            />
            <ModeButton
              label="Crea nuovo prodotto"
              description="Genera un prodotto virtuale dedicato per questo pagamento."
              active={mode === "new"}
              onClick={() => {
                setMode("new");
                setSelectedProductId(null);
              }}
            />
          </div>

          <input type="hidden" name="mode" value={mode} />
        </div>

        {mode === "existing" && (
          <div className="space-y-4">
            <FormField label="Prodotto" description="Prodotto sincronizzato da WooCommerce.">
              <select
                required
                name="productId"
                className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-sm text-white focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
                value={selectedProductId ?? ""}
                onChange={(event) => {
                  const value = Number(event.target.value);
                  setSelectedProductId(Number.isNaN(value) ? null : value);
                }}
              >
                {products.map((product) => (
                  <option key={product.wooId} value={product.wooId}>
                    {product.name} ({product.price} {product.currency})
                  </option>
                ))}
              </select>
            </FormField>
            <input
              type="hidden"
              name="productPrice"
              value={selectedProductId ? productMap.get(selectedProductId)?.price ?? "0.00" : "0.00"}
            />
          </div>
        )}

        {mode === "new" && (
          <div className="space-y-4">
            <FormField label="Nome prodotto" description="Comparirà nella ricevuta di pagamento.">
              <input
                required
                name="productName"
                className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
                placeholder="Esempio: Setup Fee Consulenza"
              />
            </FormField>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Prezzo base" description="Importo registrato sul prodotto WooCommerce.">
                <input
                  required
                  name="productPrice"
                  type="text"
                  inputMode="decimal"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  placeholder="199.00"
                />
              </FormField>

              <FormField label="SKU (opzionale)">
                <input
                  name="productSku"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  placeholder="AYCL-SETUP-01"
                />
              </FormField>
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-slate-800/60 bg-slate-900/60 p-4 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Personalizzazioni
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Prezzo personalizzato" description="Override per questo pagamento (opzionale).">
              <input
                name="customPrice"
                type="text"
                inputMode="decimal"
                className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
                placeholder="Inserisci solo se diverso dal prezzo base"
              />
            </FormField>

            <FormField label="Quantità" description="Numero di unità incluse nel pagamento.">
              <input
                name="quantity"
                type="number"
                min={1}
                max={99}
                defaultValue={1}
                className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-sm text-white focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </FormField>

            <FormField label="Prezzo originale" description="Prezzo prima dello sconto (opzionale)">
              <input
                name="originalPrice"
                type="text"
                inputMode="decimal"
                className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
                placeholder="Es. 599.00"
              />
            </FormField>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800/60 bg-slate-900/60 p-4 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Dati cliente
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Nome" required>
              <input
                name="firstName"
                required
                className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
                placeholder="Mario"
              />
            </FormField>
            <FormField label="Cognome" required>
              <input
                name="lastName"
                required
                className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
                placeholder="Rossi"
              />
            </FormField>
          </div>
        </div>

        {state.message && !state.success ? (
          <div className="rounded-xl border border-rose-500/50 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
            {state.message}
          </div>
        ) : null}

        <SubmitButton />
      </form>

      <aside className="space-y-4 rounded-3xl border border-slate-800/70 bg-slate-950/60 p-6">
        <h2 className="text-lg font-semibold text-white">Risultato</h2>
        <p className="text-sm text-slate-400">
          Una volta generato, il link rimanderà il cliente sulla pagina di checkout di AYCL,
          dove potrà selezionare il metodo di pagamento preferito.
        </p>

        {state.success && state.paymentUrl ? (
          <div className="space-y-4 rounded-2xl border border-sky-500/40 bg-sky-500/10 p-4">
            <section className="space-y-2">
              <p className="text-sm font-semibold text-slate-100">Link checkout AYCL</p>
              <code className="block break-all rounded-xl bg-slate-900/70 p-3 text-xs text-sky-200">
                {state.paymentUrl}
              </code>
              <button
                type="button"
                onClick={async () => {
                  await navigator.clipboard.writeText(state.paymentUrl!);
                  setCopied(true);
                  toast.success("Link copiato negli appunti.");
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-sky-500 px-3 py-2 text-sm font-semibold text-sky-100 hover:bg-sky-500/10"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copiato!" : "Copia link checkout"}
              </button>
            </section>

            {state.wooPaymentUrl ? (
              <section className="space-y-2 rounded-xl border border-slate-700/60 bg-slate-900/60 p-3">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Link diretto WooCommerce</p>
                <code className="block break-all rounded-lg bg-slate-950/70 p-3 text-xs text-slate-200">
                  {state.wooPaymentUrl}
                </code>
                <button
                  type="button"
                  onClick={async () => {
                    await navigator.clipboard.writeText(state.wooPaymentUrl!);
                    toast.success("Link WooCommerce copiato.");
                  }}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-600 px-3 py-2 text-xs font-semibold text-slate-100 hover:bg-slate-800"
                >
                  <Copy className="h-4 w-4" />
                  Copia link WooCommerce
                </button>
              </section>
            ) : null}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-800/60 bg-slate-900/60 p-4 text-sm text-slate-400">
            Compila il form a sinistra per generare il link. Dopo il salvataggio verrà mostrato
            qui e potrai copiarlo o riaprirlo in qualsiasi momento dalla lista pagamenti.
          </div>
        )}
      </aside>
    </div>
  );
}

function FormField({
  label,
  description,
  required,
  children,
}: {
  label: string;
  description?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1 text-sm">
      <span className="flex items-center gap-2 text-slate-200">
        {label}
        {required ? <span className="text-xs uppercase tracking-[0.3em] text-rose-300">Obbligatorio</span> : null}
      </span>
      {description ? <span className="block text-xs text-slate-400">{description}</span> : null}
      {children}
    </label>
  );
}

function ModeButton({
  label,
  description,
  active,
  disabled,
  onClick,
}: {
  label: string;
  description: string;
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`rounded-2xl border px-4 py-3 text-left transition ${
        active
          ? "border-sky-500 bg-sky-500/10 text-white shadow"
          : "border-slate-800 bg-slate-900/60 text-slate-200 hover:border-sky-500/50 hover:bg-slate-900"
      } ${disabled ? "opacity-50" : ""}`}
    >
      <p className="text-sm font-semibold">{label}</p>
      <p className="text-xs text-slate-400">{description}</p>
    </button>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="inline-flex items-center justify-center rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-sky-400 disabled:opacity-60"
      disabled={pending}
    >
      {pending ? "Generazione in corso..." : "Genera link di pagamento"}
    </button>
  );
}
