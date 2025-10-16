import Link from "next/link";
import { listAdminProducts } from "@/lib/admin/products";
import { listPayments } from "@/lib/admin/payments";

export const dynamic = "force-dynamic";

export default function AdminDashboardPage() {
  const products = listAdminProducts();
  const payments = listPayments();

  const totalPayments = payments.length;
  const pendingPayments = payments.filter((payment) => payment.status === "pending").length;
  const paidPayments = payments.filter((payment) => payment.status === "paid").length;

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
          <p className="text-sm text-slate-400">
            Panoramica rapida di prodotti, pagamenti e link generati.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/payments/create"
            className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-sky-400"
          >
            Crea link di pagamento
          </Link>
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-800/60"
          >
            Gestisci prodotti
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardStat label="Totale prodotti" value={products.length} />
        <DashboardStat label="Link generati" value={totalPayments} />
        <DashboardStat label="Pagamenti in attesa" value={pendingPayments} />
        <DashboardStat label="Pagamenti completati" value={paidPayments} />
      </div>

      <div className="rounded-3xl border border-slate-800/70 bg-slate-950/60 p-6">
        <h2 className="text-lg font-semibold text-white">Ultimi link generati</h2>
        <p className="text-sm text-slate-400">
          Lo storico completo è disponibile nella sezione pagamenti.
        </p>

        <div className="mt-6 space-y-4">
          {payments.slice(0, 5).map((payment) => (
            <article
              key={payment.id}
              className="rounded-2xl border border-slate-800/50 bg-slate-900/60 p-4 text-sm text-slate-200"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-white">{payment.product_name}</p>
                  <p className="text-xs text-slate-400">
                    {payment.customer_first_name} {payment.customer_last_name} ·{" "}
                    {payment.customer_email ?? "N/A"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-sky-300">
                    {payment.custom_price ?? payment.product_price} {payment.currency}
                  </p>
                  <StatusBadge status={payment.status} />
                </div>
              </div>
            </article>
          ))}

          {payments.length === 0 ? (
            <p className="text-sm text-slate-400">
              Nessun pagamento creato. Avvia subito dalla pagina "Crea pagamento".
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function DashboardStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-3xl border border-slate-800/70 bg-slate-950/60 p-5">
      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-amber-500/10 text-amber-300 border border-amber-500/30",
    paid: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30",
    cancelled: "bg-rose-500/10 text-rose-300 border border-rose-500/30",
    failed: "bg-rose-500/10 text-rose-300 border border-rose-500/30",
  };

  return (
    <span
      className={`mt-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide ${styles[status] ?? "border border-slate-700 text-slate-300"}`}
    >
      {status}
    </span>
  );
}
