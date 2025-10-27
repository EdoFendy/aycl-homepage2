"use client";

import { useSearchParams } from 'next/navigation';
import { CartCheckout } from '@/components/cart-checkout';
import { useMemo } from 'react';

export default function PerformanceCartPage() {
  const searchParams = useSearchParams();
  const ref = searchParams.get('ref');
  const upsellsParam = searchParams.get('upsells');
  const productParam = searchParams.get('product');

  // Decodifica il prodotto dal parametro URL (se presente) - UTF-8 safe
  const dynamicProduct = useMemo(() => {
    if (!productParam) return null;
    try {
      const decoded = decodeURIComponent(escape(atob(decodeURIComponent(productParam))));
      return JSON.parse(decoded);
    } catch (error) {
      console.error('Error decoding product:', error);
      return null;
    }
  }, [productParam]);

  // Decodifica gli upsell dal parametro URL (se presenti) - UTF-8 safe
  const dynamicUpsells = useMemo(() => {
    if (!upsellsParam) return [];
    try {
      const decoded = decodeURIComponent(escape(atob(decodeURIComponent(upsellsParam))));
      return JSON.parse(decoded);
    } catch (error) {
      console.error('Error decoding upsells:', error);
      return [];
    }
  }, [upsellsParam]);

  // Prodotti di fallback (usati se non c'è un prodotto dinamico)
  const fallbackProducts = [
    {
      id: 'performance-starter',
      name: 'Performance - Starter',
      description: 'Piano performance per piccole e medie imprese',
      regular_price: 1500,
      sale_price: 1199,
      features: [
        'Fino a 500 lead/mese',
        'Pagamento basato sui risultati',
        'Dashboard analytics completa',
        'Supporto dedicato',
        'Ottimizzazione continua',
        'Report mensili dettagliati'
      ]
    },
    {
      id: 'performance-pro',
      name: 'Performance - Professional',
      description: 'Piano avanzato per aziende in crescita',
      regular_price: 2500,
      sale_price: 1999,
      features: [
        'Fino a 1000 lead/mese',
        'Account manager dedicato',
        'A/B testing avanzato',
        'Integrazioni premium',
        'Supporto prioritario 24/7',
        'Report settimanali + consulenza strategica'
      ]
    },
    {
      id: 'performance-enterprise',
      name: 'Performance - Enterprise',
      description: 'Soluzione su misura per grandi organizzazioni',
      regular_price: 5000,
      sale_price: 3999,
      features: [
        'Lead illimitati',
        'Team dedicato',
        'SLA garantito',
        'Integrazioni custom illimitate',
        'White label disponibile',
        'Consulenza strategica mensile'
      ]
    }
  ];

  // Usa il prodotto dinamico se disponibile, altrimenti usa il fallback
  const products = useMemo(() => {
    if (dynamicProduct) {
      return [{
        id: `performance-${dynamicProduct.id}`,
        name: dynamicProduct.name,
        description: dynamicProduct.description || 'Prodotto selezionato dal seller',
        regular_price: dynamicProduct.regular_price || dynamicProduct.price,
        sale_price: dynamicProduct.sale_price || dynamicProduct.price,
        features: []
      }];
    }
    return fallbackProducts;
  }, [dynamicProduct]);

  const upsells = [
    {
      id: 'performance-ai-optimization',
      name: 'AI Optimization',
      description: 'Ottimizzazione automatica con intelligenza artificiale',
      price: 500,
      features: [
        'Machine learning per targeting',
        'Ottimizzazione budget automatica',
        'Predizione performance',
        'Auto-scaling campagne'
      ]
    },
    {
      id: 'performance-multi-channel',
      name: 'Multi-Channel Expansion',
      description: 'Espandi su più canali di acquisizione',
      price: 750,
      features: [
        'Google Ads + Facebook + LinkedIn',
        'Gestione unificata',
        'Cross-channel attribution',
        'Budget optimization'
      ]
    },
    {
      id: 'performance-crm-integration',
      name: 'CRM Integration Premium',
      description: 'Integrazione avanzata con il tuo CRM',
      price: 400,
      features: [
        'Sync bidirezionale real-time',
        'Custom field mapping',
        'Automazioni avanzate',
        'Supporto tecnico dedicato'
      ]
    }
  ];

  // Combina upsell predefiniti con quelli dinamici
  const allUpsells = useMemo(() => {
    if (dynamicUpsells.length > 0) {
      return dynamicUpsells;
    }
    return upsells;
  }, [dynamicUpsells]);

  return (
    <CartCheckout
      title="Performance - Paga Solo per i Risultati"
      subtitle="Scegli il piano performance più adatto alla tua azienda"
      products={products}
      upsells={allUpsells}
      cartType="performance"
      referralCode={ref || undefined}
    />
  );
}

