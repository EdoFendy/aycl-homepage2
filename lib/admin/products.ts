import { getDb, type AdminProductRecord } from "@/lib/db";

export type ProductFilterOptions = {
  search?: string;
};

export function listAdminProducts(options: ProductFilterOptions = {}) {
  const db = getDb();
  const { search } = options;

  if (search) {
    const pattern = `%${search.trim().toLowerCase()}%`;
    const statement = db.prepare(
      `
        SELECT * FROM admin_products
        WHERE lower(name) LIKE ?
        ORDER BY datetime(updated_at) DESC
      `
    );
    return statement.all(pattern) as AdminProductRecord[];
  }

  return db
    .prepare("SELECT * FROM admin_products ORDER BY datetime(updated_at) DESC")
    .all() as AdminProductRecord[];
}

export function upsertAdminProduct(product: {
  wooId: number;
  name: string;
  sku?: string | null;
  price?: string | null;
  currency?: string | null;
  raw?: unknown;
}) {
  const db = getDb();
  const payload = {
    name: product.name,
    sku: product.sku || null,
    price: product.price || null,
    currency: product.currency || null,
    data: product.raw ? JSON.stringify(product.raw) : null,
  };

  const existing = db
    .prepare("SELECT * FROM admin_products WHERE woo_id = ?")
    .get(product.wooId) as AdminProductRecord | undefined;

  if (existing) {
    db.prepare(
      `
        UPDATE admin_products
        SET name = @name,
            sku = @sku,
            price = @price,
            currency = @currency,
            data = @data,
            updated_at = CURRENT_TIMESTAMP
        WHERE woo_id = @wooId
      `
    ).run({ wooId: product.wooId, ...payload });

    return db
      .prepare("SELECT * FROM admin_products WHERE woo_id = ?")
      .get(product.wooId) as AdminProductRecord;
  }

  db.prepare(
    `
      INSERT INTO admin_products (woo_id, name, sku, price, currency, data)
      VALUES (@wooId, @name, @sku, @price, @currency, @data)
    `
  ).run({ wooId: product.wooId, ...payload });

  return db
    .prepare("SELECT * FROM admin_products WHERE woo_id = ?")
    .get(product.wooId) as AdminProductRecord;
}

export function getProductByWooId(wooId: number) {
  const db = getDb();
  const record = db
    .prepare("SELECT * FROM admin_products WHERE woo_id = ?")
    .get(wooId) as AdminProductRecord | undefined;
  return record ?? null;
}

export function removeStaleProducts(wooIds: number[]) {
  if (wooIds.length === 0) {
    return;
  }
  const db = getDb();
  const placeholders = wooIds.map(() => "?").join(", ");
  db.prepare(
    `
      DELETE FROM admin_products
      WHERE woo_id IS NOT NULL
      AND woo_id NOT IN (${placeholders})
    `
  ).run(...wooIds);
}

export function deleteAdminProduct(wooId: number) {
  const db = getDb();
  db.prepare("DELETE FROM admin_products WHERE woo_id = ?").run(wooId);
}
