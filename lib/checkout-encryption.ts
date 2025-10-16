import { createCipheriv, createDecipheriv, createHash, randomBytes } from "crypto";
import { z } from "zod";
import type { DriveTestOrder } from "@/lib/drive-test";

const orderSchema = z.object({
  package: z.string(),
  currency: z.string(),
  unitPrice: z.number(),
  quantity: z.number(),
  total: z.number(),
  priceRange: z.object({
    min: z.number(),
    max: z.number(),
  }),
  selections: z.object({
    revenueBand: z.object({
      id: z.string(),
      label: z.string(),
    }),
    geography: z.object({
      id: z.string(),
      label: z.string(),
    }),
    sector: z.object({
      id: z.string(),
      label: z.string(),
    }),
    riskProfile: z.number(),
  }),
  metadata: z.object({
    locale: z.string(),
    generatedAt: z.string(),
    wooProductId: z.number().optional(),
    adminPaymentId: z.number().optional(),
    productName: z.string().optional(),
    basePrice: z.string().optional(),
    customPrice: z.string().optional(),
  }),
});

export const driveTestOrderSchema = orderSchema;

function getEncryptionSecret() {
  const secret = process.env.CHECKOUT_ENCRYPTION_KEY;
  if (!secret || secret.length < 16) {
    throw new Error(
      "CHECKOUT_ENCRYPTION_KEY deve essere configurato e contenere almeno 16 caratteri per cifrare gli ordini."
    );
  }
  return secret;
}

function getKey() {
  const secret = getEncryptionSecret();
  return createHash("sha256").update(secret).digest();
}

export function encryptCheckoutOrder(order: DriveTestOrder) {
  const payload = orderSchema.parse(order);
  const key = getKey();
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const ciphertext = Buffer.concat([
    cipher.update(JSON.stringify(payload), "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();
  const combined = Buffer.concat([iv, authTag, ciphertext]);
  return combined.toString("base64url");
}

export function decryptCheckoutOrder(token: string) {
  try {
    const key = getKey();
    const buffer = Buffer.from(token, "base64url");

    if (buffer.length <= 28) {
      return null;
    }

    const iv = buffer.subarray(0, 12);
    const authTag = buffer.subarray(12, 28);
    const ciphertext = buffer.subarray(28);

    const decipher = createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(authTag);

    const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString("utf8");
    const data = JSON.parse(plaintext) as unknown;
    const parsed = orderSchema.safeParse(data);

    if (!parsed.success) {
      return null;
    }

    return parsed.data;
  } catch (error) {
    console.error("Failed to decrypt checkout order", error);
    return null;
  }
}

export function resolveCheckoutBaseUrl() {
  const rawBase =
    process.env.CHECKOUT_BASE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    "https://allyoucanleads.com";

  const trimmed = rawBase.endsWith("/") ? rawBase.slice(0, -1) : rawBase;
  if (!trimmed.startsWith("http")) {
    return `https://${trimmed}`;
  }
  return trimmed;
}
