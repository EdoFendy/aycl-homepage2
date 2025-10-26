import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { PaymentGateway } from "@/components/payment-gateway";
import type { DriveTestOrder } from "@/lib/drive-test";
import { PageLayoutContainer } from "@/components/page-layout-container";
import { decryptCheckoutOrder } from "@/lib/checkout-encryption";
import { DriveTestRequestForm } from "@/components/drive-test-request-form";
import { CheckoutWithReferral } from "@/components/checkout-with-referral";
import { BundleCheckout } from "@/components/bundle-checkout";

type SearchParams = { [key: string]: string | string[] | undefined };

type PageProps = {
  searchParams?: Promise<SearchParams>;
};

export default async function CheckoutPage({ searchParams }: PageProps) {
  const t = await getTranslations("checkout");
  const resolvedSearchParams = await resolveSearchParams(searchParams);

  const order = parseOrder(resolvedSearchParams.order);
  const referralCode = resolvedSearchParams.ref as string;
  const bundleToken = resolvedSearchParams.bundle as string;
  const locale = order?.metadata?.locale || "it-IT";
  const currency = order?.currency || "EUR";
  const currencyFormatter = new Intl.NumberFormat(locale, { style: "currency", currency });

  // Determina se è un Drive Test basandosi sul nome del prodotto
  const isDriveTest = order && (
    order.package.toLowerCase().includes('drive test') ||
    order.package.toLowerCase().includes('drive-test') ||
    order.package.toLowerCase().includes('drivetest') ||
    (order.metadata?.productName && (
      order.metadata.productName.toLowerCase().includes('drive test') ||
      order.metadata.productName.toLowerCase().includes('drive-test') ||
      order.metadata.productName.toLowerCase().includes('drivetest')
    ))
  );

  // Usa discountFromPrice per il prezzo unitario se disponibile
  const displayUnitPrice = order?.metadata?.discountFromPrice 
    ? Number.parseFloat(order.metadata.discountFromPrice)
    : order?.unitPrice ?? 0;

  const metrics = order
    ? [
        {
          label: t("order.metrics.unitPrice"),
          value: currencyFormatter.format(displayUnitPrice),
        },
        ...(isDriveTest ? [{
          label: t("order.metrics.quantity"),
          value: order.quantity.toString(),
        }] : []),
        {
          label: t("order.metrics.total"),
          value: currencyFormatter.format(order.total),
        },
      ]
    : [];

  const productDetails = order
    ? buildProductDetails(order, currencyFormatter, t)
    : [];

  const generatedAt = order?.metadata?.generatedAt ? new Date(order.metadata.generatedAt) : null;
  const generatedLabel =
    order && generatedAt
      ? t("order.generatedAt", {
          date: new Intl.DateTimeFormat(locale, {
            dateStyle: "medium",
            timeStyle: "short",
          }).format(generatedAt),
        })
      : null;

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 pt-36 pb-32">
      <div className="pointer-events-none absolute top-10 left-16 h-40 w-40 rounded-full bg-sky-blue/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-24 right-10 h-48 w-48 rounded-full bg-orange/10 blur-3xl" />

      <PageLayoutContainer className="relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <span className="inline-flex items-center justify-center rounded-full border border-gray-200 px-5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.32em] text-gray-500 sm:text-xs">
            {t("hero.badge")}
          </span>
          <h1 className="text-balance text-4xl font-bold leading-tight text-navy sm:text-5xl lg:text-6xl">
            {t("hero.title")}
          </h1>
          <p className="text-base leading-relaxed text-gray-600 sm:text-lg">{t("hero.subtitle")}</p>
        </div>

        {bundleToken ? (
          <BundleCheckout bundleToken={bundleToken} />
        ) : referralCode ? (
          <CheckoutWithReferral />
        ) : order ? (
          <div className="mt-14 grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="rounded-3xl border border-gray-200 bg-white/95 p-6 sm:p-8 shadow-xl backdrop-blur">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-navy">{t("order.title")}</h2>
                  {generatedLabel ? <p className="text-xs text-gray-500 mt-1">{generatedLabel}</p> : null}
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-400">{t("order.details.productName")}</p>
                  <p className="text-lg font-semibold text-navy">{order.metadata?.productName ?? order.package}</p>
                  <p className="text-sm text-gray-500 mt-1">{currencyFormatter.format(order.total)}</p>
                </div>
              </div>

              <div className={`mt-6 grid gap-4 ${isDriveTest ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
                {metrics.map((metric) => (
                  <div key={metric.label} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-gray-400">{metric.label}</p>
                    <p className="mt-2 text-lg font-semibold text-navy">{metric.value}</p>
                  </div>
                ))}
              </div>

              {order && isDriveTest && order.quantity > 1 && (
                <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-900">{t("order.calculation.title")}</p>
                      <p className="text-xs text-blue-700">
                        {t("order.calculation.formula", {
                          unitPrice: currencyFormatter.format(order.unitPrice),
                          quantity: order.quantity,
                          total: currencyFormatter.format(order.total)
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-blue-900">{currencyFormatter.format(order.total)}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6">
                <DetailCard title={t("order.details.title")} items={productDetails} />
              </div>

            </div>

            <PaymentGateway order={order} />
          </div>
        ) : (
          <div className="mt-16 rounded-3xl border border-gray-200 bg-white/95 p-8 text-center shadow-xl backdrop-blur">
            <h2 className="text-2xl font-semibold text-navy">{t("order.empty.title")}</h2>
            <p className="mt-2 text-sm text-gray-500">{t("order.empty.subtitle")}</p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/pacchetti">
                <Button variant="outline" className="w-full sm:w-auto">
                  {t("order.cta.packages")}
                </Button>
              </Link>
              <Link href="/#pacchetti">
                <Button className="w-full sm:w-auto bg-orange text-white hover:bg-orange/90">
                  {t("order.cta.calculator")}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </PageLayoutContainer>
    </div>
  );
}

async function resolveSearchParams(input?: Promise<SearchParams>): Promise<SearchParams> {
  if (!input) return {};
  try {
    return (await input) ?? {};
  } catch {
    return {};
  }
}

function parseOrder(param: string | string[] | undefined): DriveTestOrder | null {
  if (!param) return null;
  const raw = Array.isArray(param) ? param[0] : param;
  if (!raw) return null;

  const decrypted = decryptCheckoutOrder(raw);
  if (decrypted) {
    return decrypted;
  }

  try {
    const decoded = decodeURIComponent(raw);
    const parsed = JSON.parse(decoded) as DriveTestOrder;
    if (!parsed || typeof parsed !== "object") {
      return null;
    }
    return parsed;
  } catch (error) {
    console.error("Failed to parse checkout order", error);
    return null;
  }
}

type DetailItem = {
  label: string;
  value: string;
};

function buildProductDetails(
  order: DriveTestOrder,
  formatter: Intl.NumberFormat,
  t: (key: string) => string
): DetailItem[] {
  const details: DetailItem[] = [
    {
      label: t("order.details.productName"),
      value: order.metadata?.productName ?? order.package,
    },
  ];

  // Determina se è un Drive Test
  const isDriveTest = order.package.toLowerCase().includes('drive test') ||
    order.package.toLowerCase().includes('drive-test') ||
    order.package.toLowerCase().includes('drivetest') ||
    (order.metadata?.productName && (
      order.metadata.productName.toLowerCase().includes('drive test') ||
      order.metadata.productName.toLowerCase().includes('drive-test') ||
      order.metadata.productName.toLowerCase().includes('drivetest')
    ));

  // Aggiungi quantità solo per Drive Test
  if (isDriveTest) {
    details.push({
      label: t("order.details.quantity"),
      value: order.quantity.toString(),
    });
  }

  // Prezzo di listino (basePrice) - mostrato solo se c'è uno sconto
  const basePrice = toCurrency(order.metadata?.basePrice, formatter);
  const discountFromPrice = toCurrency(order.metadata?.discountFromPrice, formatter);
  
  if (basePrice && discountFromPrice) {
    details.push({
      label: t("order.details.basePrice"),
      value: basePrice,
    });
    
    details.push({
      label: t("order.details.discountFromPrice"),
      value: discountFromPrice,
    });
  }

  // Da pagare oggi (unitPrice)
  details.push({
    label: t("order.details.unitPrice"),
    value: formatter.format(order.unitPrice),
  });

  // Aggiungi sempre il totale
  details.push({
    label: t("order.details.total"),
    value: formatter.format(order.total),
  });

  return details;
}


function toCurrency(value: string | number | null | undefined, formatter: Intl.NumberFormat) {
  if (value === null || value === undefined) {
    return null;
  }

  const numeric = typeof value === "string" ? Number.parseFloat(value) : value;
  if (Number.isNaN(numeric)) {
    return null;
  }

  return formatter.format(numeric);
}

function DetailCard({ title, items }: { title: string; items: DetailItem[] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
      <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">{title}</h3>
      <dl className="mt-4 space-y-3 text-sm text-navy">
        {items.map((item) => (
          <div key={item.label} className="flex items-start justify-between gap-3">
            <dt className="text-gray-500">{item.label}</dt>
            <dd className="text-right font-medium text-navy">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
