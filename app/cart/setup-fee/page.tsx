"use client";

import { useSearchParams } from 'next/navigation';
import { CartCheckout } from '@/components/cart-checkout';
import { useMemo, useEffect, useState } from 'react';

interface WooProduct {
  id: number;
  name: string;
  description: string;
  regular_price: string;
  sale_price: string;
  price: string;
}

export default function SetupFeeCartPage() {
  const searchParams = useSearchParams();
  const ref = searchParams.get('ref');
  const upsellsParam = searchParams.get('upsells');
  const productParam = searchParams.get('product');
  const wooProductId = searchParams.get('wooProductId');
  const useSalePrice = searchParams.get('useSalePrice') === 'true';
  
  const [wooProduct, setWooProduct] = useState<WooProduct | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch WooCommerce product if wooProductId is provided
  useEffect(() => {
    if (!wooProductId) return;
    
    async function fetchProduct() {
      console.log('🔍 [SETUP-FEE] Fetching WooCommerce product:', wooProductId);
      console.log('🔍 [SETUP-FEE] Use sale price:', useSalePrice);
      setLoading(true);
      try {
        // Use your CRM backend API to fetch the product
        const response = await fetch(`${process.env.NEXT_PUBLIC_CRM_API_URL || 'http://localhost:4000'}/woocommerce/products/${wooProductId}`);
        if (response.ok) {
          const data = await response.json();
          console.log('✅ [SETUP-FEE] Product fetched:', {
            id: data.id,
            name: data.name,
            regular_price: data.regular_price,
            sale_price: data.sale_price,
            price: data.price
          });
          setWooProduct(data);
        } else {
          console.error('❌ [SETUP-FEE] Failed to fetch product, status:', response.status);
        }
      } catch (error) {
        console.error('❌ [SETUP-FEE] Error fetching WooCommerce product:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProduct();
  }, [wooProductId]);

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

  // Usa il prodotto WooCommerce fetchato, poi il prodotto dinamico, infine il fallback
  const products = useMemo(() => {
    // Priority 1: WooCommerce product (MUST be used if wooProductId was provided)
    if (wooProduct) {
      const regularPrice = parseFloat(wooProduct.regular_price || wooProduct.price);
      const salePrice = useSalePrice && wooProduct.sale_price 
        ? parseFloat(wooProduct.sale_price)
        : regularPrice;
      
      console.log('✅ [SETUP-FEE] Using WooCommerce product:', {
        id: wooProduct.id,
        name: wooProduct.name,
        regular_price: regularPrice,
        sale_price: salePrice,
        useSalePrice,
        woo_sale_price: wooProduct.sale_price
      });
      
      return [{
        id: `setup-fee-woo-${wooProduct.id}`,
        name: wooProduct.name,
        description: wooProduct.description || 'Prodotto selezionato dal seller',
        regular_price: regularPrice,
        sale_price: salePrice,
        features: []
      }];
    }
    
    // Priority 2: Legacy dynamic product param
    if (dynamicProduct) {
      console.log('📦 [SETUP-FEE] Using legacy dynamic product');
      return [{
        id: `setup-fee-${dynamicProduct.id}`,
        name: dynamicProduct.name,
        description: dynamicProduct.description || 'Prodotto selezionato dal seller',
        regular_price: dynamicProduct.regular_price || dynamicProduct.price,
        sale_price: dynamicProduct.sale_price || dynamicProduct.price,
        features: []
      }];
    }
    
    // Priority 3: Fallback (should only happen if no wooProductId was provided)
    if (wooProductId && !wooProduct && !loading) {
      console.error('❌ [SETUP-FEE] CRITICAL: wooProductId was provided but product not found!', {
        wooProductId,
        loading
      });
    }
    console.log('⚠️ [SETUP-FEE] Using fallback product (no WooCommerce product found)');
    return fallbackProducts;
  }, [wooProduct, dynamicProduct, useSalePrice, wooProductId, loading]);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Caricamento prodotto...</p>
        </div>
      </div>
    );
  }

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

