import { listAdminProducts } from "@/lib/admin/products";
import { SyncProductsButton } from "@/app/admin/(protected)/products/sync-button";
import { CreateProductForm } from "@/app/admin/(protected)/products/create-product-form";
import { ProductRow } from "@/app/admin/(protected)/products/product-row";

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

      <CreateProductForm />

      <div className="rounded-3xl border border-slate-800/70 bg-slate-950/50">
        <table className="min-w-full divide-y divide-slate-800/60 text-sm">
          <thead className="bg-slate-900/70 text-xs uppercase tracking-[0.25em] text-slate-400">
            <tr>
              <th className="px-4 py-3 text-left">Prodotto</th>
              <th className="px-4 py-3 text-left">Prezzo</th>
              <th className="px-4 py-3 text-left">SKU</th>
              <th className="px-4 py-3 text-left">Aggiornato</th>
              <th className="px-4 py-3 text-right">Azioni</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40">
            {products.map((product) => (
              <ProductRow key={product.id} product={product} />
            ))}

            {products.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
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
