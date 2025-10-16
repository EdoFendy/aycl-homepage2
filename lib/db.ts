import fs from "fs";
import path from "path";
import Database from "better-sqlite3";

const DEFAULT_DB_DIR = path.join(process.cwd(), "data");
const DEFAULT_DB_PATH = path.join(DEFAULT_DB_DIR, "admin.sqlite");

const dbPath = process.env.ADMIN_DB_PATH || DEFAULT_DB_PATH;

function ensureDatabaseDirectory() {
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

ensureDatabaseDirectory();

const db = new Database(dbPath);

db.pragma("journal_mode = WAL");

export type AdminUserRecord = {
  id: number;
  email: string;
  password_hash: string;
  created_at: string;
};

export type AdminSessionRecord = {
  id: number;
  user_id: number;
  token: string;
  expires_at: string;
  created_at: string;
};

export type AdminProductRecord = {
  id: number;
  woo_id: number | null;
  name: string;
  sku: string | null;
  price: string | null;
  currency: string | null;
  data: string | null;
  created_at: string;
  updated_at: string;
};

export type PaymentRecord = {
  id: number;
  woo_product_id: number | null;
  woo_payment_link_id: string | null;
  product_name: string;
  product_sku: string | null;
  product_price: string;
  currency: string;
  custom_price: string | null;
  customer_first_name: string;
  customer_last_name: string;
  customer_email: string | null;
  payment_url: string;
  status: string;
  metadata: string | null;
  created_at: string;
  updated_at: string;
};

function runMigrations() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS admin_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      token TEXT NOT NULL UNIQUE,
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES admin_users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS admin_products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      woo_id INTEGER,
      name TEXT NOT NULL,
      sku TEXT,
      price TEXT,
      currency TEXT,
      data TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS payment_links (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      woo_product_id INTEGER,
      woo_payment_link_id TEXT,
      product_name TEXT NOT NULL,
      product_sku TEXT,
      product_price TEXT NOT NULL,
      currency TEXT NOT NULL DEFAULT 'EUR',
      custom_price TEXT,
      customer_first_name TEXT NOT NULL,
      customer_last_name TEXT NOT NULL,
      customer_email TEXT,
      payment_url TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      metadata TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

runMigrations();

export function getDb() {
  return db;
}

export function resetExpiredSessions() {
  db.prepare("DELETE FROM admin_sessions WHERE datetime(expires_at) <= datetime('now')").run();
}
