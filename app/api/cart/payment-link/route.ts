import { NextResponse } from "next/server";
import type { DriveTestCustomer, DriveTestOrder } from "@/lib/drive-test";
import { createCheckoutWithProducts } from "@/lib/woocommerce";

interface RequestPayload {
  order?: DriveTestOrder;
  customer?: DriveTestCustomer;
}

interface CartMetadata {
  cart_type?: string;
  products?: Array<{
    id: string;
    name: string;
    regular_price: number;
    sale_price?: number;
    quantity: number;
  }>;
  upsells?: Array<{
    id: string;
    name: string;
    regular_price?: number;
    sale_price?: number;
    price: number;
  }>;
  referral_code?: string;
}

const PRODUCT_CATALOG: Record<string, {
  name: string;
  description: string;
  regular_price: number;
  sale_price?: number;
}> = {
  // Setup Fee
  'setup-fee-basic': {
    name: 'Setup Fee - Pacchetto Base',
    description: 'Configurazione iniziale completa della tua piattaforma di lead generation',
    regular_price: 2500,
    sale_price: 1999,
  },
  'setup-advanced-training': {
    name: 'Training Avanzato',
    description: 'Formazione approfondita per il tuo team',
    regular_price: 500,
  },
  'setup-custom-integration': {
    name: 'Integrazioni Custom',
    description: 'Integrazione con i tuoi sistemi esistenti',
    regular_price: 750,
  },
  
  // Drive Test
  'drive-test-standard': {
    name: 'Drive Test - 30 Giorni',
    description: 'Prova il nostro sistema di lead generation senza impegno',
    regular_price: 500,
    sale_price: 399,
  },
  'drive-test-extended': {
    name: 'Estensione 60 Giorni',
    description: 'Raddoppia il periodo di prova',
    regular_price: 300,
  },
  'drive-test-premium-support': {
    name: 'Supporto Premium',
    description: 'Assistenza dedicata durante il drive test',
    regular_price: 200,
  },
  'drive-test-advanced-analytics': {
    name: 'Analytics Avanzati',
    description: 'Dashboard e report potenziati',
    regular_price: 150,
  },
  
  // Performance
  'performance-starter': {
    name: 'Performance - Starter',
    description: 'Piano performance per piccole e medie imprese',
    regular_price: 1500,
    sale_price: 1199,
  },
  'performance-pro': {
    name: 'Performance - Professional',
    description: 'Piano avanzato per aziende in crescita',
    regular_price: 2500,
    sale_price: 1999,
  },
  'performance-enterprise': {
    name: 'Performance - Enterprise',
    description: 'Soluzione su misura per grandi organizzazioni',
    regular_price: 5000,
    sale_price: 3999,
  },
  'performance-ai-optimization': {
    name: 'AI Optimization',
    description: 'Ottimizzazione automatica con intelligenza artificiale',
    regular_price: 500,
  },
  'performance-multi-channel': {
    name: 'Multi-Channel Expansion',
    description: 'Espandi su più canali di acquisizione',
    regular_price: 750,
  },
  'performance-crm-integration': {
    name: 'CRM Integration Premium',
    description: 'Integrazione avanzata con il tuo CRM',
    regular_price: 400,
  },
  
  // Bundles
  'bundle-complete': {
    name: 'Bundle Completo - All Inclusive',
    description: 'Tutto ciò di cui hai bisogno per dominare la lead generation',
    regular_price: 7500,
    sale_price: 4999,
  },
  'bundle-starter': {
    name: 'Bundle Starter - Quick Start',
    description: 'Il modo più veloce per iniziare',
    regular_price: 3500,
    sale_price: 2499,
  },
  'bundle-growth': {
    name: 'Bundle Growth - Scale Up',
    description: 'Per aziende pronte a crescere velocemente',
    regular_price: 5500,
    sale_price: 3699,
  },
  'bundle-white-label': {
    name: 'White Label Solution',
    description: 'Personalizza la piattaforma con il tuo brand',
    regular_price: 2000,
  },
  'bundle-api-access': {
    name: 'API Access Unlimited',
    description: 'Accesso completo alle nostre API',
    regular_price: 1000,
  },
  'bundle-consulting': {
    name: 'Strategic Consulting',
    description: 'Consulenza strategica mensile',
    regular_price: 1500,
  },
};

export async function POST(request: Request) {
  let payload: RequestPayload;

  try {
    payload = await request.json();
  } catch (error) {
    return NextResponse.json({ message: "Invalid JSON payload" }, { status: 400 });
  }

  if (!payload.order || !payload.customer) {
    return NextResponse.json({ message: "Order and customer data are required" }, { status: 400 });
  }

  const order = payload.order;
  const customer = payload.customer;

  // Validate customer data
  if (!customer.firstName || !customer.lastName || !customer.email) {
    return NextResponse.json({ message: "Missing customer fields" }, { status: 400 });
  }

  console.log("[CartPayment] Processing cart checkout:", {
    package: order.package,
    total: order.total,
    currency: order.currency,
    metadata: order.metadata,
  });

  try {
    // Extract cart metadata
    const cartMetadata = order.metadata as unknown as CartMetadata;
    const productsToCreate: Array<{
      name: string;
      regular_price: number;
      sale_price?: number;
      quantity: number;
      description?: string;
    }> = [];

    // Add main products from cart metadata
    if (cartMetadata?.products && Array.isArray(cartMetadata.products)) {
      for (const product of cartMetadata.products) {
        const catalogProduct = PRODUCT_CATALOG[product.id];
        if (catalogProduct) {
          productsToCreate.push({
            name: catalogProduct.name,
            regular_price: catalogProduct.regular_price,
            sale_price: catalogProduct.sale_price,
            quantity: product.quantity || 1,
            description: catalogProduct.description,
          });
        }
      }
    }

    // Add upsells from cart metadata
    if (cartMetadata?.upsells && Array.isArray(cartMetadata.upsells)) {
      for (const upsell of cartMetadata.upsells) {
        const catalogProduct = PRODUCT_CATALOG[upsell.id];
        if (catalogProduct) {
          productsToCreate.push({
            name: catalogProduct.name,
            regular_price: catalogProduct.regular_price,
            sale_price: catalogProduct.sale_price,
            quantity: 1,
            description: catalogProduct.description,
          });
        }
      }
    }

    // Fallback: se non ci sono prodotti in metadata, crea un prodotto generico dall'ordine
    if (productsToCreate.length === 0) {
      productsToCreate.push({
        name: order.metadata?.productName || order.package,
        regular_price: order.total,
        quantity: 1,
        description: `Ordine: ${order.package}`,
      });
    }

    console.log("[CartPayment] Creating products:", {
      count: productsToCreate.length,
      total: productsToCreate.reduce((sum, p) => {
        const price = p.sale_price || p.regular_price;
        return sum + (price * p.quantity);
      }, 0),
    });

    // Create checkout with WooCommerce
    const result = await createCheckoutWithProducts(
      productsToCreate,
      {
        first_name: customer.firstName,
        last_name: customer.lastName,
        email: customer.email,
      },
      {
        gateway: 'redsys',
        metadata: {
          cart_type: cartMetadata?.cart_type || 'generic',
          referral_code: cartMetadata?.referral_code || null,
          source: 'cart_checkout',
          order_package: order.package,
          timestamp: new Date().toISOString(),
        },
      }
    );

    console.log("[CartPayment] Payment link created:", {
      order_id: result.order_id,
      total: result.total,
    });

    return NextResponse.json({ paymentUrl: result.payment_url }, { status: 200 });

  } catch (error) {
    console.error("[CartPayment] Error:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unable to create payment link" },
      { status: 500 }
    );
  }
}

