'use server';

type WooProduct = {
  id: number;
  name: string;
  sku?: string;
  price?: string;
  regular_price?: string;
  currency?: string;
  [key: string]: unknown;
};

type WooPaymentLink = {
  id?: number | string;
  payment_url: string;
  [key: string]: unknown;
};

const ADMIN_API_BASE = process.env.ADMIN_API_BASE;
const ADMIN_API_TOKEN = process.env.ADMIN_API_TOKEN;

function assertConfigured() {
  if (!ADMIN_API_BASE || !ADMIN_API_TOKEN) {
    throw new Error("Configura ADMIN_API_BASE e ADMIN_API_TOKEN per collegarti a WooCommerce.");
  }
}

async function requestWoo<T>(path: string, init: RequestInit = {}): Promise<T> {
  assertConfigured();
  const url = new URL(path, ADMIN_API_BASE);
  url.searchParams.set("token", ADMIN_API_TOKEN as string);

  const response = await fetch(url.toString(), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    let message = `WooCommerce request to ${path} failed with status ${response.status}`;
    let errorDetails: any = null;
    
    try {
      const errorData = (await response.json()) as { message?: string; errors?: any; data?: any; error?: string; details?: any };
      errorDetails = errorData;
      if (errorData?.message) {
        message = errorData.message;
      } else if (errorData?.error && errorData?.details) {
        message = `WooCommerce validation error: ${errorData.error} - ${JSON.stringify(errorData.details)}`;
      } else if (errorData?.errors) {
        message = `WooCommerce API errors: ${JSON.stringify(errorData.errors)}`;
      } else if (errorData?.data) {
        message = `WooCommerce API error: ${JSON.stringify(errorData.data)}`;
      }
    } catch {
      // ignore json parse errors
    }
    
    console.error(`WooCommerce API Error [${response.status}]:`, {
      path,
      status: response.status,
      statusText: response.statusText,
      errorDetails,
      requestBody: init.body
    });
    
    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return (await response.json()) as T;
  }

  const text = await response.text();
  if (!text) {
    return undefined as T;
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    return undefined as T;
  }
}

export async function fetchWooProducts(): Promise<WooProduct[]> {
  return requestWoo<WooProduct[]>("/products");
}

export async function ensureWooProduct(payload: {
  name: string;
  sku?: string;
  description?: string;
  short_description?: string;
  price: string;
  currency?: string;
}) {
  const existingProducts = await fetchWooProducts();
  const matched = payload.sku
    ? existingProducts.find((product) => product.sku === payload.sku)
    : existingProducts.find((product) => product.name === payload.name);

  if (matched) {
    return matched;
  }

  const product = await createWooProduct(payload);

  return product;
}

export async function createWooProduct(payload: {
  name: string;
  sku?: string;
  description?: string;
  short_description?: string;
  price: string;
  currency?: string;
}) {
  return requestWoo<WooProduct>("/products", {
    method: "POST",
    body: JSON.stringify({
      name: payload.name,
      type: "simple",
      status: "publish",
      sku: payload.sku,
      regular_price: payload.price,
      virtual: true,
      description: payload.description,
      short_description: payload.short_description,
      meta_data: [
        {
          key: "_currency",
          value: payload.currency ?? "EUR",
        },
      ],
    }),
  });
}

export async function updateWooProduct(
  productId: number,
  payload: {
    name: string;
    sku?: string;
    description?: string;
    short_description?: string;
    price: string;
    currency?: string;
  }
) {
  return requestWoo<WooProduct>(`/products/${productId}`, {
    method: "PUT",
    body: JSON.stringify({
      name: payload.name,
      sku: payload.sku,
      regular_price: payload.price,
      description: payload.description,
      short_description: payload.short_description,
      meta_data: [
        {
          key: "_currency",
          value: payload.currency ?? "EUR",
        },
      ],
    }),
  });
}

export async function deleteWooProduct(productId: number) {
  await requestWoo(`/products/${productId}`, {
    method: "DELETE",
  });
}

export async function createWooPaymentLink(payload: {
  productId: number;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
  };
  quantity?: number;
  priceOverride?: string;
}) {
  const items: Array<{
    product_id: number;
    quantity: number;
    amount?: string;
  }> = [
    {
      product_id: payload.productId,
      quantity: payload.quantity ?? 1,
    },
  ];

  if (payload.priceOverride) {
    items[0] = { ...items[0], amount: payload.priceOverride };
  }

  const requestBody = {
    gateway: "stripe",
    customer: {
      first_name: payload.customer.firstName,
      last_name: payload.customer.lastName,
      email: payload.customer.email,
    },
    items,
  };

  console.log("Creating WooCommerce payment link with payload:", {
    productId: payload.productId,
    quantity: payload.quantity,
    priceOverride: payload.priceOverride,
    customer: payload.customer,
    requestBody
  });

  return requestWoo<WooPaymentLink>("/payment-links", {
    method: "POST",
    body: JSON.stringify(requestBody),
  });
}

export async function fetchWooOrders(query: Record<string, string | number> = {}) {
  const search = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    search.set(key, String(value));
  });

  const path = `/orders?${search.toString()}`;
  return requestWoo<unknown[]>(path, { method: "GET" });
}
