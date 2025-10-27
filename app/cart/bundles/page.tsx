"use client";

import { useSearchParams } from 'next/navigation';
import { CartCheckout } from '@/components/cart-checkout';
import { useMemo } from 'react';

export default function BundlesCartPage() {
  const searchParams = useSearchParams();
  const ref = searchParams.get('ref');
  const upsellsParam = searchParams.get('upsells');

  // Decodifica gli upsell dal parametro URL (se presenti)
  const dynamicUpsells = useMemo(() => {
    if (!upsellsParam) return [];
    try {
      const decoded = atob(decodeURIComponent(upsellsParam));
      return JSON.parse(decoded);
    } catch (error) {
      console.error('Error decoding upsells:', error);
      return [];
    }
  }, [upsellsParam]);

  const products = [
    {
      id: 'bundle-complete',
      name: 'Bundle Completo - All Inclusive',
      description: 'Tutto ciò di cui hai bisogno per dominare la lead generation',
      regular_price: 7500,
      sale_price: 4999,
      features: [
        'Setup Fee incluso',
        '60 giorni Drive Test',
        'Performance Plan Professional',
        'Tutte le integrazioni premium',
        'Training completo team',
        'Account manager dedicato',
        'Supporto prioritario 24/7',
        'Risparmio di €2500'
      ]
    },
    {
      id: 'bundle-starter',
      name: 'Bundle Starter - Quick Start',
      description: 'Il modo più veloce per iniziare',
      regular_price: 3500,
      sale_price: 2499,
      features: [
        'Setup Fee incluso',
        '30 giorni Drive Test',
        'Performance Plan Starter (3 mesi)',
        'Integrazioni base',
        'Training essenziale',
        'Supporto standard',
        'Risparmio di €1000'
      ]
    },
    {
      id: 'bundle-growth',
      name: 'Bundle Growth - Scale Up',
      description: 'Per aziende pronte a crescere velocemente',
      regular_price: 5500,
      sale_price: 3699,
      features: [
        'Setup Fee incluso',
        '45 giorni Drive Test',
        'Performance Plan Pro (6 mesi)',
        'Integrazioni avanzate',
        'Training avanzato',
        'Account manager',
        'Supporto prioritario',
        'Risparmio di €1800'
      ]
    }
  ];

  const upsells = [
    {
      id: 'bundle-white-label',
      name: 'White Label Solution',
      description: 'Personalizza la piattaforma con il tuo brand',
      price: 2000,
      features: [
        'Branding completo personalizzato',
        'Dominio custom',
        'Email personalizzate',
        'Report brandizzati',
        'Documentazione custom'
      ]
    },
    {
      id: 'bundle-api-access',
      name: 'API Access Unlimited',
      description: 'Accesso completo alle nostre API',
      price: 1000,
      features: [
        'API REST complete',
        'Webhook illimitati',
        'Documentazione tecnica',
        'Supporto sviluppatori',
        'Rate limit aumentato'
      ]
    },
    {
      id: 'bundle-consulting',
      name: 'Strategic Consulting',
      description: 'Consulenza strategica mensile',
      price: 1500,
      features: [
        '4 ore di consulenza/mese',
        'Analisi competitor',
        'Strategia go-to-market',
        'Ottimizzazione funnel',
        'Report esecutivi'
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
      title="Bundles - Massimo Valore, Massimo Risparmio"
      subtitle="Pacchetti completi con tutto incluso a prezzi vantaggiosi"
      products={products}
      upsells={allUpsells}
      cartType="bundles"
      referralCode={ref || undefined}
    />
  );
}

