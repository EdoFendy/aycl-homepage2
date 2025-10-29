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
  const [fetchError, setFetchError] = useState<string | null>(null);

  // 🚨 CRITICAL: Log URL params immediately
  console.log('🌐 [PERFORMANCE] URL params:', {
    wooProductId,
    useSalePrice,
    ref,
    hasProductParam: !!productParam,
    hasUpsellsParam: !!upsellsParam,
    fullUrl: typeof window !== 'undefined' ? window.location.href : 'N/A'
  });

  useEffect(() => {
    if (!wooProductId) {
      console.warn('⚠️ [PERFORMANCE] No wooProductId in URL - will use fallback product');
      return;
    }
    
    async function fetchProduct() {
      console.log('🔍 [PERFORMANCE] Fetching WooCommerce product:', wooProductId);
      console.log('🔍 [PERFORMANCE] Use sale price:', useSalePrice);
      console.log('🔧 [PERFORMANCE] Using PUBLIC backend endpoint (no auth required)');
      setLoading(true);
      try {
        // 🔧 FIX: Use public backend endpoint (GET /products/:id is now public)
        const response = await fetch(`${process.env.NEXT_PUBLIC_CRM_API_URL || 'http://localhost:4000'}/woocommerce/products/${wooProductId}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch product (status: ${response.status})`);
        }
        
        const data = await response.json();
        console.log('✅ [PERFORMANCE] Product fetched from backend:', {
          id: data.id,
          name: data.name,
          regular_price: data.regular_price,
          sale_price: data.sale_price,
          price: data.price
        });
        setWooProduct(data);
        setFetchError(null);
      } catch (error: any) {
        const errorMsg = error.message || `Error fetching product: ${error}`;
        console.error('❌ [PERFORMANCE]', errorMsg);
        setFetchError(errorMsg);
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
    <>
      {/* 🚨 CRITICAL ERROR BANNER */}
      {wooProductId && !wooProduct && !loading && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                🚨 ERRORE: Prodotto Non Trovato
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>Il prodotto WooCommerce (ID: {wooProductId}) non è stato trovato.</p>
                <p className="mt-1">Motivo: {fetchError || 'Prodotto non disponibile'}</p>
                <p className="mt-2 font-semibold">⚠️ Verrà usato un prodotto di fallback. Contatta l'amministratore.</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {!wooProductId && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                ⚠️ ATTENZIONE: Accesso Diretto
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>Stai visualizzando questa pagina senza aver selezionato un prodotto specifico.</p>
                <p className="mt-1">Per vedere il prodotto corretto, genera un link dal Seller Cart Builder.</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <CartCheckout
        title="Performance - Paga Solo per i Risultati"
        subtitle="Scegli il piano performance più adatto alla tua azienda"
        products={products}
        upsells={allUpsells}
        cartType="performance"
        referralCode={ref || undefined}
      />
    </>
  );
}

