import { format } from "date-fns";
import { it } from "date-fns/locale";
import Link from "next/link";
import { listPayments } from "@/lib/admin/payments";
import type { PaymentRecord } from "@/lib/db";
import { RefreshTransactionsButton } from "@/app/admin/(protected)/payments/refresh-button";

export const dynamic = "force-dynamic";

type SearchParams = Record<string, string | string[] | undefined>;

export default async function AdminPaymentsPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const resolvedSearchParams = await resolveSearchParams(searchParams);
  const status = getStringParam(resolvedSearchParams.status) || "all";
  const search = getStringParam(resolvedSearchParams.search) || undefined;
  const startDate = getStringParam(resolvedSearchParams.startDate) || undefined;
  const endDate = getStringParam(resolvedSearchParams.endDate) || undefined;

  const payments = listPayments({ status, search, startDate, endDate });

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Pagamenti e link generati</h1>
          <p className="text-sm text-slate-400">
            Storico dei link di pagamento creati dal pannello con relative informazioni.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <RefreshTransactionsButton />
          <Link
            href="/admin/payments/create"
            className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-sky-400"
          >
            Nuovo link pagamento
          </Link>
        </div>
      </div>

      <FilterForm status={status} search={search} startDate={startDate} endDate={endDate} />

      <div className="overflow-hidden rounded-3xl border border-slate-800/70 bg-slate-950/50">
        <table className="min-w-full divide-y divide-slate-800/60 text-sm">
          <thead className="bg-slate-900/70 text-xs uppercase tracking-[0.25em] text-slate-400">
            <tr>
              <th className="px-4 py-3 text-left">Cliente</th>
              <th className="px-4 py-3 text-left">Prodotto</th>
              <th className="px-4 py-3 text-left">Importo</th>
              <th className="px-4 py-3 text-left">Stato</th>
              <th className="px-4 py-3 text-left">Creato</th>
              <th className="px-4 py-3 text-right">Azioni</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {payments.map((payment) => (
              <PaymentRow key={payment.id} payment={payment} />
            ))}

            {payments.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-sm text-slate-400">
                  Nessun pagamento trovato con i filtri selezionati.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FilterForm({
  status,
  search,
  startDate,
  endDate,
}: {
  status: string;
  search?: string;
  startDate?: string;
  endDate?: string;
}) {
  return (
    <form className="grid gap-3 rounded-3xl border border-slate-800/70 bg-slate-950/60 p-4 md:grid-cols-4">
      <div className="space-y-1">
        <label htmlFor="status" className="text-xs font-medium uppercase tracking-[0.25em] text-slate-400">
          Stato
        </label>
        <select
          id="status"
          name="status"
          defaultValue={status}
          className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-sm text-white focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
        >
          <option value="all">Tutti</option>
          <option value="pending">In attesa</option>
          <option value="paid">Pagati</option>
          <option value="failed">Falliti</option>
          <option value="cancelled">Annullati</option>
        </select>
      </div>

      <div className="space-y-1">
        <label htmlFor="search" className="text-xs font-medium uppercase tracking-[0.25em] text-slate-400">
          Ricerca
        </label>
        <input
          id="search"
          name="search"
          defaultValue={search}
          placeholder="Nome, cognome, email o prodotto"
          className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="startDate" className="text-xs font-medium uppercase tracking-[0.25em] text-slate-400">
          Dal
        </label>
        <input
          id="startDate"
          name="startDate"
          type="date"
          defaultValue={startDate}
          className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-sm text-white focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="endDate" className="text-xs font-medium uppercase tracking-[0.25em] text-slate-400">
          Al
        </label>
        <input
          id="endDate"
          name="endDate"
          type="date"
          defaultValue={endDate}
          className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-sm text-white focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
      </div>

      <div className="md:col-span-4 flex justify-end gap-2">
        <a
          href="/admin/payments"
          className="inline-flex items-center rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200"
        >
          Reset
        </a>
        <button
          type="submit"
          className="inline-flex items-center rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-sky-400"
        >
          Applica filtri
        </button>
      </div>
    </form>
  );
}

function PaymentRow({ payment }: { payment: PaymentRecord }) {
  const createdAt = payment.created_at
    ? format(new Date(payment.created_at), "PPP p", { locale: it })
    : "-";
  const amount = payment.product_price;
  const metadata = parseMetadata(payment.metadata);
  const wooPaymentUrl = typeof metadata?.wooPaymentUrl === "string" ? metadata.wooPaymentUrl : undefined;

  return (
    <tr className="text-slate-300">
      <td className="px-4 py-4">
        <div className="font-medium text-white">
          {payment.customer_first_name} {payment.customer_last_name}
        </div>
        <div className="text-xs text-slate-400">{payment.customer_email ?? "N/A"}</div>
      </td>
      <td className="px-4 py-4">
        <div className="text-white">{payment.product_name}</div>
        <div className="text-xs text-slate-500">SKU: {payment.product_sku ?? "N/A"}</div>
      </td>
      <td className="px-4 py-4">
        <div className="text-sm font-semibold text-sky-300">
          {amount} {payment.currency}
        </div>
        {payment.custom_price ? (
          <div className="mt-1 text-xs text-slate-500">
            Prezzo scontato da: {payment.custom_price} {payment.currency}
          </div>
        ) : null}
      </td>
      <td className="px-4 py-4">
        <StatusBadge status={payment.status} />
      </td>
      <td className="px-4 py-4 text-xs text-slate-400">{createdAt}</td>
      <td className="px-4 py-4 text-right">
        <a
          href={payment.payment_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-lg border border-sky-500 px-3 py-1.5 text-xs font-semibold text-sky-300 hover:bg-sky-500/10"
        >
          Apri link
        </a>
        {wooPaymentUrl ? (
          <a
            href={wooPaymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex items-center rounded-lg border border-slate-600 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-800"
          >
            WooCommerce
          </a>
        ) : null}
      </td>
    </tr>
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
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide ${styles[status] ?? "border border-slate-700 text-slate-300"}`}
    >
      {status}
    </span>
  );
}

async function resolveSearchParams(input?: Promise<SearchParams>) {
  if (!input) return {};
  try {
    return (await input) ?? {};
  } catch {
    return {};
  }
}

function getStringParam(value: string | string[] | undefined) {
  if (!value) return undefined;
  return Array.isArray(value) ? value[0] : value;
}

function parseMetadata(raw: string | null) {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return null;
  }
}
