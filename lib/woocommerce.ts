/**
 * WooCommerce API Helper
 * Gestisce la creazione di prodotti e payment links con supporto per sconti
 */

const WC_URL = process.env.NEXT_PUBLIC_CHECKOUT_API_URL || 'https://checkout.allyoucanleads.com';
const WC_KEY = process.env.WC_KEY || '';
const WC_SECRET = process.env.WC_SECRET || '';

// Auth header per WooCommerce
const WC_AUTH = Buffer.from(`${WC_KEY}:${WC_SECRET}`).toString('base64');

export interface WooProductCreate {
  name: string;
  type?: 'simple' | 'variable';
  regular_price: string;
  sale_price?: string;
  status?: 'publish' | 'draft';
  sku?: string;
  description?: string;
  short_description?: string;
  virtual?: boolean;
}

export interface WooProduct {
  id: number;
  name: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  sku: string;
  status: string;
}

export interface PaymentLinkRequest {
  gateway?: 'redsys' | 'stripe';
  customer: {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
  };
  items: Array<{
    product_id: number;
    quantity: number;
  }>;
  products?: Array<{
    name: string;
    regular_price: string;
    sale_price?: string;
    quantity: number;
    description?: string;
    short_description?: string;
  }>;
  metadata?: Record<string, any>;
}

export interface PaymentLinkResponse {
  order_id: number;
  order_key: string;
  payment_url: string;
  total?: string;
}

/**
 * Crea un prodotto WooCommerce con supporto per sconti
 */
export async function createWooProduct(product: WooProductCreate): Promise<WooProduct> {
  const response = await fetch(
    `${WC_URL}/wp-json/wc/v3/products`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${WC_AUTH}`,
      },
      body: JSON.stringify({
        name: product.name,
        type: product.type || 'simple',
        regular_price: product.regular_price,
        sale_price: product.sale_price || '',
        status: product.status || 'publish',
        sku: product.sku || `product-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        description: product.description || '',
        short_description: product.short_description || '',
        virtual: product.virtual !== undefined ? product.virtual : true,
      }),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(`Failed to create WooCommerce product: ${error.message || response.statusText}`);
  }

  return await response.json();
}

/**
 * Crea un ordine WooCommerce e ottiene il payment URL
 */
export async function createWooOrder(request: {
  customer: {
    first_name: string;
    last_name: string;
    email: string;
  };
  line_items: Array<{
    product_id: number;
    quantity: number;
  }>;
  metadata?: Record<string, any>;
}): Promise<PaymentLinkResponse> {
  // Crea ordine
  const response = await fetch(
    `${WC_URL}/wp-json/wc/v3/orders`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${WC_AUTH}`,
      },
      body: JSON.stringify({
        billing: {
          first_name: request.customer.first_name,
          last_name: request.customer.last_name,
          email: request.customer.email,
        },
        line_items: request.line_items,
        status: 'pending',
        set_paid: false,
        meta_data: request.metadata ? Object.entries(request.metadata).map(([key, value]) => ({
          key,
          value: typeof value === 'string' ? value : JSON.stringify(value),
        })) : [],
      }),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(`Failed to create WooCommerce order: ${error.message || response.statusText}`);
  }

  const order = await response.json();
  
  return {
    order_id: order.id,
    order_key: order.order_key,
    payment_url: `${WC_URL}/pagamento/order-pay/${order.id}/?pay_for_order=true&key=${order.order_key}`,
    total: order.total,
  };
}

/**
 * Crea prodotti WooCommerce e un ordine in un'unica operazione
 */
export async function createCheckoutWithProducts(
  products: Array<{
    name: string;
    regular_price: number;
    sale_price?: number;
    quantity: number;
    description?: string;
  }>,
  customer: {
    first_name: string;
    last_name: string;
    email: string;
  },
  options?: {
    gateway?: 'redsys' | 'stripe';
    metadata?: Record<string, any>;
  }
): Promise<PaymentLinkResponse> {
  // Step 1: Crea tutti i prodotti WooCommerce
  const createdProducts: Array<{ product_id: number; quantity: number }> = [];

  for (const product of products) {
    const wooProduct = await createWooProduct({
      name: product.name,
      regular_price: product.regular_price.toFixed(2),
      sale_price: product.sale_price ? product.sale_price.toFixed(2) : undefined,
      description: product.description,
      short_description: product.description,
      virtual: true,
      status: 'publish',
    });

    createdProducts.push({
      product_id: wooProduct.id,
      quantity: product.quantity,
    });
  }

  // Step 2: Crea l'ordine con tutti i prodotti
  return await createWooOrder({
    customer,
    line_items: createdProducts,
    metadata: options?.metadata,
  });
}

/**
 * Recupera un singolo prodotto WooCommerce per ID
 * 🔧 FIX: Aggiunta questa funzione per permettere al cart di recuperare i prodotti
 */
export async function getWooProduct(productId: number | string): Promise<WooProduct> {
  const response = await fetch(
    `${WC_URL}/wp-json/wc/v3/products/${productId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${WC_AUTH}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(`Failed to get WooCommerce product ${productId}: ${error.message || response.statusText}`);
  }

  return await response.json();
}

/**
 * Recupera una lista di prodotti WooCommerce
 */
export async function getWooProducts(params?: {
  per_page?: number;
  page?: number;
  status?: 'publish' | 'draft' | 'any';
}): Promise<WooProduct[]> {
  const queryParams = new URLSearchParams({
    per_page: String(params?.per_page || 100),
    page: String(params?.page || 1),
    status: params?.status || 'publish',
  });

  const response = await fetch(
    `${WC_URL}/wp-json/wc/v3/products?${queryParams}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${WC_AUTH}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(`Failed to get WooCommerce products: ${error.message || response.statusText}`);
  }

  return await response.json();
}

/**
 * Formatta il prezzo per WooCommerce (sempre 2 decimali, stringa)
 */
export function formatWooPrice(price: number): string {
  return price.toFixed(2);
}

/**
 * Calcola lo sconto percentuale
 */
export function calculateDiscountPercentage(regularPrice: number, salePrice: number): number {
  if (salePrice >= regularPrice) return 0;
  return Math.round(((regularPrice - salePrice) / regularPrice) * 100);
}

