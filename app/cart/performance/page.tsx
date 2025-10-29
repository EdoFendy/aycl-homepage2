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

export default function PerformanceCartPage() {
  const searchParams = useSearchParams();
  const ref = searchParams.get('ref');
  const upsellsParam = searchParams.get('upsells');
  const productParam = searchParams.get('product');
  const wooProductId = searchParams.get('wooProductId');
  const useSalePrice = searchParams.get('useSalePrice') === 'true';
  
  const [wooProduct, setWooProduct] = useState<WooProduct | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!wooProductId) return;
    
    async function fetchProduct() {
      console.log('🔍 [PERFORMANCE] Fetching WooCommerce product:', wooProductId);
      console.log('🔍 [PERFORMANCE] Use sale price:', useSalePrice);
      setLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CRM_API_URL || 'http://localhost:4000'}/woocommerce/products/${wooProductId}`);
        if (response.ok) {
          const data = await response.json();
          console.log('✅ [PERFORMANCE] Product fetched:', {
            id: data.id,
            name: data.name,
            regular_price: data.regular_price,
            sale_price: data.sale_price,
            price: data.price
          });
          setWooProduct(data);
        } else {
          console.error('❌ [PERFORMANCE] Failed to fetch product, status:', response.status);
        }
      } catch (error) {
        console.error('❌ [PERFORMANCE] Error fetching WooCommerce product:', error);
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

  // 🚨 CRITICAL FIX: Solo UN prodotto fallback (non 3!)
  // Il componente CartCheckout somma TUTTI i prodotti nell'array
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
    }
  ];

  const products = useMemo(() => {
    // Priority 1: WooCommerce product (MUST be used if wooProductId was provided)
    if (wooProduct) {
      const regularPrice = parseFloat(wooProduct.regular_price || wooProduct.price);
      const salePrice = useSalePrice && wooProduct.sale_price 
        ? parseFloat(wooProduct.sale_price)
        : regularPrice;
      
      console.log('✅ [PERFORMANCE] Using WooCommerce product:', {
        id: wooProduct.id,
        name: wooProduct.name,
        regular_price: regularPrice,
        sale_price: salePrice,
        useSalePrice,
        woo_sale_price: wooProduct.sale_price
      });
      
      return [{
        id: `performance-woo-${wooProduct.id}`,
        name: wooProduct.name,
        description: wooProduct.description || 'Prodotto selezionato dal seller',
        regular_price: regularPrice,
        sale_price: salePrice,
        features: []
      }];
    }
    
    // Priority 2: Legacy dynamic product param
    if (dynamicProduct) {
      console.log('📦 [PERFORMANCE] Using legacy dynamic product');
      return [{
        id: `performance-${dynamicProduct.id}`,
        name: dynamicProduct.name,
        description: dynamicProduct.description || 'Prodotto selezionato dal seller',
        regular_price: dynamicProduct.regular_price || dynamicProduct.price,
        sale_price: dynamicProduct.sale_price || dynamicProduct.price,
        features: []
      }];
    }
    
    // Priority 3: Fallback (should only happen if no wooProductId was provided)
    if (wooProductId && !wooProduct && !loading) {
      console.error('❌ [PERFORMANCE] CRITICAL: wooProductId was provided but product not found!', {
        wooProductId,
        loading
      });
    }
    console.log('⚠️ [PERFORMANCE] Using fallback product (no WooCommerce product found)');
    return fallbackProducts;
  }, [wooProduct, dynamicProduct, useSalePrice, wooProductId, loading]);

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
      title="Performance - Paga Solo per i Risultati"
      subtitle="Scegli il piano performance più adatto alla tua azienda"
      products={products}
      upsells={allUpsells}
      cartType="performance"
      referralCode={ref || undefined}
    />
  );
}

