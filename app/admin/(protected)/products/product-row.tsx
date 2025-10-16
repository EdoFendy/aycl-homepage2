"use client";

import { Fragment, useEffect, useMemo, useState, useTransition, type ReactNode } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { Loader2, Pencil, Trash2, X } from "lucide-react";
import type { AdminProductRecord } from "@/lib/db";
import { deleteProductAction, updateProductAction } from "@/app/admin/(protected)/actions";

type FormState = {
  success: boolean;
  message?: string;
};

const initialState: FormState = { success: false };

export function ProductRow({ product }: { product: AdminProductRecord }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [state, formAction] = useFormState(updateProductAction, initialState);
  const [deletePending, startDeleteTransition] = useTransition();
  const idPrefix = useMemo(() => `product-${product.id}`, [product.id]);
  const canManage = typeof product.woo_id === "number" && Number.isFinite(product.woo_id);

  useEffect(() => {
    if (state.success) {
      toast.success("Prodotto aggiornato con successo.");
      setEditing(false);
      router.refresh();
    } else if (!state.success && state.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  const lastUpdate = product.updated_at
    ? format(new Date(product.updated_at), "PPPp", { locale: it })
    : "-";
  const priceLabel = product.price ? `${product.price} ${product.currency ?? "EUR"}` : "-";

  const handleDelete = () => {
    if (!canManage || !product.woo_id) {
      toast.error("Impossibile eliminare il prodotto: ID WooCommerce mancante.");
      return;
    }

    const confirmed = window.confirm(
      `Sei sicuro di voler eliminare \"${product.name}\" anche da WooCommerce?`
    );
    if (!confirmed) {
      return;
    }

    startDeleteTransition(async () => {
      const result = await deleteProductAction(product.woo_id as number);
      if (result.success) {
        toast.success("Prodotto eliminato correttamente.");
        router.refresh();
      } else {
        toast.error(result.message ?? "Impossibile eliminare il prodotto.");
      }
    });
  };

  return (
    <Fragment>
      <tr className="text-slate-200">
        <td className="px-4 py-4">
          <div className="font-medium text-white">{product.name}</div>
          <div className="text-xs text-slate-400">WooCommerce ID: {product.woo_id ?? "N/D"}</div>
        </td>
        <td className="px-4 py-4">{priceLabel}</td>
        <td className="px-4 py-4">{product.sku ?? "-"}</td>
        <td className="px-4 py-4 text-xs text-slate-400">{lastUpdate}</td>
        <td className="px-4 py-4">
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setEditing((value) => !value)}
              disabled={!canManage || deletePending}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200 transition hover:bg-slate-800 disabled:opacity-60"
            >
              <Pencil className="h-4 w-4" /> Modifica
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={!canManage || deletePending}
              className="inline-flex items-center gap-2 rounded-xl border border-red-500/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-red-300 transition hover:bg-red-500/10 disabled:opacity-60"
            >
              <Trash2 className="h-4 w-4" /> Elimina
            </button>
          </div>
        </td>
      </tr>

      {editing ? (
        <tr>
          <td colSpan={5} className="bg-slate-950/70 px-4 py-4">
            <form
              action={formAction}
              className="space-y-4 rounded-2xl border border-slate-800/60 bg-slate-900/60 p-4"
            >
              <input type="hidden" name="productId" value={product.woo_id ?? ""} />
              <div className="grid gap-4 md:grid-cols-2">
                <FormField label="Nome" htmlFor={`${idPrefix}-name`}>
                  <input
                    id={`${idPrefix}-name`}
                    name="name"
                    defaultValue={product.name}
                    required
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-sm text-white focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </FormField>
                <FormField label="Prezzo" htmlFor={`${idPrefix}-price`} description="Formato 0.00">
                  <input
                    id={`${idPrefix}-price`}
                    name="price"
                    defaultValue={product.price ?? "0.00"}
                    required
                    inputMode="decimal"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-sm text-white focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </FormField>
                <FormField label="Valuta" htmlFor={`${idPrefix}-currency`} description="Codice ISO a tre lettere.">
                  <input
                    id={`${idPrefix}-currency`}
                    name="currency"
                    defaultValue={(product.currency ?? "EUR").toUpperCase()}
                    maxLength={3}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-sm uppercase text-white focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </FormField>
                <FormField label="SKU" htmlFor={`${idPrefix}-sku`} description="Opzionale">
                  <input
                    id={`${idPrefix}-sku`}
                    name="sku"
                    defaultValue={product.sku ?? ""}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-sm text-white focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </FormField>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
                >
                  <X className="h-4 w-4" /> Annulla
                </button>
                <UpdateButton />
              </div>
            </form>
          </td>
        </tr>
      ) : null}
    </Fragment>
  );
}

function FormField({
  label,
  description,
  children,
  htmlFor,
}: {
  label: string;
  description?: string;
  children: ReactNode;
  htmlFor?: string;
}) {
  return (
    <div className="space-y-2">
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

function UpdateButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-sky-400 disabled:opacity-60"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      Salva modifiche
    </button>
  );
}
