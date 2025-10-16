import { format } from "date-fns";
import { it } from "date-fns/locale";
import { listAdminProducts } from "@/lib/admin/products";
import type { AdminProductRecord } from "@/lib/db";
import { SyncProductsButton } from "@/app/admin/(protected)/products/sync-button";

export const dynamic = "force-dynamic";

export default function AdminProductsPage() {
  const products = listAdminProducts();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Prodotti WooCommerce</h1>
          <p className="text-sm text-slate-400">
            Riepilogo dei prodotti sincronizzati e utilizzabili per i link di pagamento.
          </p>
        </div>
        <SyncProductsButton />
      </div>

      <div className="rounded-3xl border border-slate-800/70 bg-slate-950/50">
        <table className="min-w-full divide-y divide-slate-800/60 text-sm">
          <thead className="bg-slate-900/70 text-xs uppercase tracking-[0.25em] text-slate-400">
            <tr>
              <th className="px-4 py-3 text-left">Prodotto</th>
              <th className="px-4 py-3 text-left">Prezzo</th>
              <th className="px-4 py-3 text-left">SKU</th>
              <th className="px-4 py-3 text-left">Aggiornato</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40">
            {products.map((product) => (
              <ProductRow key={product.id} product={product} />
            ))}

            {products.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-6 text-center text-sm text-slate-400"
                >
                  Nessun prodotto salvato. Effettua una sincronizzazione per importare i dati da WooCommerce.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProductRow({ product }: { product: AdminProductRecord }) {
  const lastUpdate = product.updated_at
    ? format(new Date(product.updated_at), "PPPp", { locale: it })
    : "-";

  return (
    <tr className="text-slate-200">
      <td className="px-4 py-4">
        <div className="font-medium text-white">{product.name}</div>
        <div className="text-xs text-slate-400">WooCommerce ID: {product.woo_id ?? "N/D"}</div>
      </td>
      <td className="px-4 py-4">
        {product.price ? `${product.price} ${product.currency ?? "EUR"}` : "-"}
      </td>
      <td className="px-4 py-4">{product.sku ?? "-"}</td>
      <td className="px-4 py-4 text-xs text-slate-400">{lastUpdate}</td>
    </tr>
  );
}
