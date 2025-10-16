import { getDb, type PaymentRecord } from "@/lib/db";

export type PaymentFilterOptions = {
  status?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
};

export type PaymentCreateInput = {
  wooProductId?: number | null;
  wooPaymentLinkId?: string | null;
  productName: string;
  productSku?: string | null;
  productPrice: string;
  currency?: string;
  customPrice?: string | null;
  customerFirstName: string;
  customerLastName: string;
  customerEmail?: string | null;
  paymentUrl: string;
  status?: string;
  metadata?: Record<string, unknown>;
};

export function listPayments(options: PaymentFilterOptions = {}) {
  const db = getDb();
  const clauses: string[] = [];
  const parameters: unknown[] = [];

  if (options.status && options.status !== "all") {
    clauses.push("status = ?");
    parameters.push(options.status);
  }

  if (options.search) {
    const pattern = `%${options.search.toLowerCase()}%`;
    clauses.push(
      "(lower(product_name) LIKE ? OR lower(customer_first_name) LIKE ? OR lower(customer_last_name) LIKE ? OR lower(customer_email) LIKE ?)"
    );
    parameters.push(pattern, pattern, pattern, pattern);
  }

  if (options.startDate) {
    clauses.push("datetime(created_at) >= datetime(?)");
    parameters.push(options.startDate);
  }

  if (options.endDate) {
    clauses.push("datetime(created_at) <= datetime(?)");
    parameters.push(options.endDate);
  }

  const whereClause = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";

  const statement = db.prepare(
    `
      SELECT * FROM payment_links
      ${whereClause}
      ORDER BY datetime(created_at) DESC
    `
  );

  return statement.all(...parameters) as PaymentRecord[];
}

export function recordPaymentLink(input: PaymentCreateInput) {
  const db = getDb();
  const payload = {
    woo_product_id: input.wooProductId ?? null,
    woo_payment_link_id: input.wooPaymentLinkId ?? null,
    product_name: input.productName,
    product_sku: input.productSku ?? null,
    product_price: input.productPrice,
    currency: input.currency ?? "EUR",
    custom_price: input.customPrice ?? null,
    customer_first_name: input.customerFirstName,
    customer_last_name: input.customerLastName,
    customer_email: input.customerEmail ?? null,
    payment_url: input.paymentUrl,
    status: input.status ?? "pending",
    metadata: input.metadata ? JSON.stringify(input.metadata) : null,
  };

  const result = db
    .prepare(
      `
        INSERT INTO payment_links (
          woo_product_id,
          woo_payment_link_id,
          product_name,
          product_sku,
          product_price,
          currency,
          custom_price,
          customer_first_name,
          customer_last_name,
          customer_email,
          payment_url,
          status,
          metadata
        ) VALUES (
          @woo_product_id,
          @woo_payment_link_id,
          @product_name,
          @product_sku,
          @product_price,
          @currency,
          @custom_price,
          @customer_first_name,
          @customer_last_name,
          @customer_email,
          @payment_url,
          @status,
          @metadata
        )
      `
    )
    .run(payload);

  return db
    .prepare("SELECT * FROM payment_links WHERE id = ?")
    .get(result.lastInsertRowid) as PaymentRecord;
}

export function updatePaymentStatus(id: number, status: string, metadata?: Record<string, unknown>) {
  const db = getDb();
  db.prepare(
    `
      UPDATE payment_links
      SET status = ?,
          metadata = COALESCE(?, metadata),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `
  ).run(status, metadata ? JSON.stringify(metadata) : null, id);

  return db
    .prepare("SELECT * FROM payment_links WHERE id = ?")
    .get(id) as PaymentRecord;
}

export function getPaymentById(id: number) {
  const db = getDb();
  const record = db
    .prepare("SELECT * FROM payment_links WHERE id = ?")
    .get(id) as PaymentRecord | undefined;
  return record ?? null;
}

export function updatePaymentMetadata(id: number, metadata: Record<string, unknown>) {
  const db = getDb();
  db.prepare(
    `
      UPDATE payment_links
      SET metadata = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `
  ).run(JSON.stringify(metadata), id);

  return getPaymentById(id);
}
