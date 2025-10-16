"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { RefreshCw } from "lucide-react";
import { refreshTransactionsAction } from "@/app/admin/(protected)/actions";

export function RefreshTransactionsButton({ className }: { className?: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      onClick={() =>
        startTransition(async () => {
          const result = await refreshTransactionsAction();
          if (result.success) {
            toast.success("Transazioni aggiornate da WooCommerce.");
          } else {
            toast.error(result.message ?? "Impossibile aggiornare le transazioni.");
          }
        })
      }
      className={`inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-800 ${pending ? "opacity-60" : ""} ${className ?? ""}`}
      disabled={pending}
    >
      <RefreshCw className={`h-4 w-4 ${pending ? "animate-spin" : ""}`} />
      Aggiorna transazioni
    </button>
  );
}
