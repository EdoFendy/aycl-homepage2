"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { createProductAction } from "@/app/admin/(protected)/actions";

type FormState = {
  success: boolean;
  message?: string;
};

const initialState: FormState = { success: false };

export function CreateProductForm() {
  const router = useRouter();
  const [state, formAction] = useFormState(createProductAction, initialState);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (state.success) {
      toast.success("Prodotto creato con successo.");
      formRef.current?.reset();
      router.refresh();
    } else if (!state.success && state.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <div className="space-y-6 rounded-3xl border border-slate-800/70 bg-slate-950/60 p-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-white">Crea nuovo prodotto</h2>
        <p className="text-sm text-slate-400">
          Genera un prodotto virtuale su WooCommerce direttamente dal pannello di amministrazione.
        </p>
      </div>

      <form ref={formRef} action={formAction} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Nome prodotto" htmlFor="product-name">
            <input
              id="product-name"
              name="name"
              required
              placeholder="Es. Pacchetto Consulenza"
              className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </FormField>

          <FormField label="Prezzo" htmlFor="product-price" description="Formato 0.00">
            <input
              id="product-price"
              name="price"
              required
              inputMode="decimal"
              pattern="\\d+(\\.\\d{1,2})?"
              placeholder="199.00"
              className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </FormField>

          <FormField label="Valuta" htmlFor="product-currency" description="Codice ISO a tre lettere.">
            <input
              id="product-currency"
              name="currency"
              defaultValue="EUR"
              maxLength={3}
              className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-sm uppercase text-white placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </FormField>

          <FormField label="SKU" htmlFor="product-sku" description="Opzionale">
            <input
              id="product-sku"
              name="sku"
              placeholder="AYCL-001"
              className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </FormField>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Descrizione" htmlFor="product-description" description="Opzionale" className="md:col-span-2">
            <textarea
              id="product-description"
              name="description"
              rows={3}
              placeholder="Dettagli del prodotto o note per il cliente"
              className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </FormField>

          <FormField
            label="Descrizione breve"
            htmlFor="product-short-description"
            description="Opzionale"
            className="md:col-span-2"
          >
            <textarea
              id="product-short-description"
              name="shortDescription"
              rows={2}
              placeholder="Testo mostrato in anteprima"
              className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </FormField>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="reset"
            className="inline-flex items-center rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
            onClick={() => formRef.current?.reset()}
          >
            Annulla
          </button>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}

function FormField({
  label,
  description,
  children,
  htmlFor,
  className,
}: {
  label: string;
  description?: string;
  children: ReactNode;
  htmlFor?: string;
  className?: string;
}) {
  return (
    <div className={`space-y-2 ${className ?? ""}`}>
      <div className="space-y-1">
        <label
          htmlFor={htmlFor}
          className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400"
        >
          {label}
        </label>
        {description ? <p className="text-xs text-slate-500">{description}</p> : null}
      </div>
      {children}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-sky-400 disabled:opacity-60"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      Salva prodotto
    </button>
  );
}
