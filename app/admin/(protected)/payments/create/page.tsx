import { listAdminProducts } from "@/lib/admin/products";
import { CreatePaymentForm } from "@/app/admin/(protected)/payments/create/create-payment-form";

export const dynamic = "force-dynamic";

export default function CreatePaymentPage() {
  const products = listAdminProducts();

  const productOptions = products
    .filter((product) => typeof product.woo_id === "number")
    .map((product) => ({
      wooId: Number(product.woo_id),
      name: product.name,
      price: product.price ?? "0.00",
      currency: product.currency ?? "EUR",
      sku: product.sku ?? undefined,
    }));

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Crea un nuovo pagamento</h1>
          <p className="text-sm text-slate-400">
            Genera un link di pagamento personalizzato collegato a WooCommerce e alla pagina checkout.
          </p>
        </div>
      </div>

      <CreatePaymentForm products={productOptions} />
    </div>
  );
}
