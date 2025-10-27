import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutWithProducts } from '@/lib/woocommerce';

// Definizione prodotti con prezzi e sconti
interface ProductDefinition {
  name: string;
  description: string;
  regular_price: number;
  sale_price?: number;
}

const PRODUCT_CATALOG: Record<string, ProductDefinition> = {
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { products, upsells = [], referral_code, cart_type, customer_email = 'cliente@example.com' } = body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return NextResponse.json(
        { error: 'Products array is required and cannot be empty' },
        { status: 400 }
      );
    }

    // Prepara la lista di prodotti da creare
    const productsToCreate = [];

    // Aggiungi prodotti principali
    for (const product of products) {
      const definition = PRODUCT_CATALOG[product.id];
      if (!definition) {
        return NextResponse.json(
          { error: `Product ${product.id} not found in catalog` },
          { status: 400 }
        );
      }

      productsToCreate.push({
        name: definition.name,
        description: definition.description,
        regular_price: definition.regular_price,
        sale_price: definition.sale_price,
        quantity: product.quantity || 1,
      });
    }

    // Aggiungi upsells
    for (const upsellId of upsells) {
      const definition = PRODUCT_CATALOG[upsellId];
      if (definition) {
        productsToCreate.push({
          name: definition.name,
          description: definition.description,
          regular_price: definition.regular_price,
          sale_price: definition.sale_price,
          quantity: 1,
        });
      }
    }

    // Crea checkout con prodotti dinamici
    const result = await createCheckoutWithProducts(
      productsToCreate,
      {
        first_name: 'Cliente',
        last_name: 'Web',
        email: customer_email,
      },
      {
        gateway: 'redsys',
        metadata: {
          cart_type,
          referral_code: referral_code || null,
          source: 'homepage',
          timestamp: new Date().toISOString(),
        },
      }
    );

    return NextResponse.json({
      success: true,
      payment_url: result.payment_url,
      order_id: result.order_id,
      total: result.total,
    });

  } catch (error: any) {
    console.error('Checkout creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

