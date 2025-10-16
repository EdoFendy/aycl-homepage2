export function normalizeFormData(formData: FormData): Partial<Record<string, string>> {
  const normalized: Partial<Record<string, string>> = {};

  for (const [rawKey, rawValue] of formData.entries()) {
    if (typeof rawValue !== "string") {
      continue;
    }

    if (/^\d+$/.test(rawKey)) {
      continue;
    }

    const key = rawKey.match(/^\d+_(.+)$/)?.[1] ?? rawKey;
    normalized[key] = rawValue;
  }

  return normalized;
}
