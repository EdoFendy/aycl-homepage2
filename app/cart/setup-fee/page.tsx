"use client";

import { useSearchParams } from 'next/navigation';
import { CartCheckout } from '@/components/cart-checkout';
import { useMemo } from 'react';

export default function SetupFeeCartPage() {
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
      id: 'setup-fee-basic',
      name: 'Setup Fee - Pacchetto Base',
      description: 'Configurazione iniziale completa della tua piattaforma di lead generation',
      regular_price: 2500,
      sale_price: 1999,
      features: [
        'Configurazione account completa',
        'Setup iniziale campagne',
        'Integrazione CRM',
        'Training team (2 ore)',
        'Supporto prioritario 30 giorni',
        'Dashboard personalizzata'
      ]
    }
  ];

  // Usa il prodotto dinamico se disponibile, altrimenti usa il fallback
  const products = useMemo(() => {
    if (dynamicProduct) {
      return [{
        id: `setup-fee-${dynamicProduct.id}`,
        name: dynamicProduct.name,
        description: dynamicProduct.description || 'Prodotto selezionato dal seller',
        regular_price: dynamicProduct.regular_price || dynamicProduct.price,
        sale_price: dynamicProduct.sale_price || dynamicProduct.price,
        features: [] // WooCommerce non ha features strutturate, verranno dalla description
      }];
    }
    return fallbackProducts;
  }, [dynamicProduct]);

  const upsells = [
    {
      id: 'setup-advanced-training',
      name: 'Training Avanzato',
      description: 'Formazione approfondita per il tuo team',
      price: 500,
      features: [
        '4 ore di training aggiuntivo',
        'Materiale didattico personalizzato',
        'Sessioni di Q&A illimitate per 60 giorni'
      ]
    },
    {
      id: 'setup-custom-integration',
      name: 'Integrazioni Custom',
      description: 'Integrazione con i tuoi sistemi esistenti',
      price: 750,
      features: [
        'Integrazione con 3 sistemi esterni',
        'API custom development',
        'Testing e deployment'
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
      title="Setup Fee - Inizia Subito"
      subtitle="Configurazione professionale per partire con il piede giusto"
      products={products}
      upsells={allUpsells}
      cartType="setup-fee"
      referralCode={ref || undefined}
    />
  );
}

