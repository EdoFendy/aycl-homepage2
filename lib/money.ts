import { formatPriceString } from "@/lib/drive-test";

const NON_NUMERIC_CHARS = /[^0-9.,-]+/g;

export function normalizePriceInput(value: string) {
  if (typeof value !== "string") {
    throw new Error("Prezzo non valido.");
  }

  const trimmed = value.trim();
  if (trimmed === "") {
    throw new Error("Prezzo non valido.");
  }

  const collapsed = trimmed.replace(/\s+/g, "");
  const sanitized = collapsed.replace(NON_NUMERIC_CHARS, "");

  if (sanitized === "" || sanitized === "-" || sanitized.includes("--")) {
    throw new Error("Prezzo non valido.");
  }

  if (sanitized.includes("-")) {
    throw new Error("Prezzo non valido.");
  }

  const decimalSeparatorMatch = sanitized.match(/[.,](?!.*[.,])/);
  const decimalSeparator = decimalSeparatorMatch ? decimalSeparatorMatch[0] : null;

  let integerPart = sanitized;
  let fractionPart = "";

  if (decimalSeparator) {
    const separatorIndex = sanitized.lastIndexOf(decimalSeparator);
    integerPart = sanitized.slice(0, separatorIndex);
    fractionPart = sanitized.slice(separatorIndex + 1);
  }

  const integerDigits = integerPart.replace(/[.,]/g, "");
  const fractionDigits = fractionPart.replace(/[^0-9]/g, "");

  const hasDigits = integerDigits.length > 0 || fractionDigits.length > 0;
  if (!hasDigits) {
    throw new Error("Prezzo non valido.");
  }

  const normalizedInteger = integerDigits.length > 0 ? integerDigits : "0";
  const numericString =
    fractionDigits.length > 0 ? `${normalizedInteger}.${fractionDigits}` : normalizedInteger;

  const numericValue = Number.parseFloat(numericString);
  if (Number.isNaN(numericValue)) {
    throw new Error("Prezzo non valido.");
  }

  return formatPriceString(numericValue);
}

export function isValidPriceInput(value: string | undefined | null) {
  if (value === undefined || value === null) {
    return false;
  }

  try {
    normalizePriceInput(value);
    return true;
  } catch {
    return false;
  }
}

export function tryNormalizePriceInput(value: string | undefined | null) {
  if (value === undefined || value === null) {
    return null;
  }

  try {
    return normalizePriceInput(value);
  } catch {
    return null;
  }
}
