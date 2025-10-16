"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { RotateCw } from "lucide-react";
import { syncProductsAction } from "@/app/admin/(protected)/actions";

type SyncProductsButtonProps = {
  className?: string;
};

export function SyncProductsButton({ className }: SyncProductsButtonProps) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      onClick={() =>
        startTransition(async () => {
          const result = await syncProductsAction();
          if (result.success) {
            toast.success(`Sincronizzazione completata (${result.count} prodotti).`);
          } else {
            toast.error(result.message ?? "Impossibile sincronizzare i prodotti.");
          }
        })
      }
      className={`inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-800 ${pending ? "opacity-60" : ""} ${className ?? ""}`}
      disabled={pending}
    >
      <RotateCw className={`h-4 w-4 ${pending ? "animate-spin" : ""}`} />
      Sincronizza WooCommerce
    </button>
  );
}
