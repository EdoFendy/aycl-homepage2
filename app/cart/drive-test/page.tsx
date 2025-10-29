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

export default function DriveTestCartPage() {
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
      console.log('🔍 [DRIVE-TEST] Fetching WooCommerce product:', wooProductId);
      console.log('🔍 [DRIVE-TEST] Use sale price:', useSalePrice);
      console.log('🔧 [DRIVE-TEST] Using PUBLIC backend endpoint (no auth required)');
      setLoading(true);
      try {
        // 🔧 FIX: Use public backend endpoint (GET /products/:id is now public)
        const response = await fetch(`${process.env.NEXT_PUBLIC_CRM_API_URL || 'http://localhost:4000'}/woocommerce/products/${wooProductId}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch product (status: ${response.status})`);
        }
        
        const data = await response.json();
        console.log('✅ [DRIVE-TEST] Product fetched from backend:', {
          id: data.id,
          name: data.name,
          regular_price: data.regular_price,
          sale_price: data.sale_price,
          price: data.price
        });
        setWooProduct(data);
      } catch (error: any) {
        const errorMsg = error.message || `Error fetching product: ${error}`;
        console.error('❌ [DRIVE-TEST]', errorMsg);
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
      id: 'drive-test-standard',
      name: 'Drive Test - 30 Giorni',
      description: 'Prova il nostro sistema di lead generation senza impegno',
      regular_price: 500,
      sale_price: 399,
      features: [
        '30 giorni di accesso completo',
        'Fino a 100 lead qualificati',
        'Dashboard analytics in tempo reale',
        'Supporto email e chat',
        'Report settimanali',
        'Nessun vincolo contrattuale'
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
      
      console.log('✅ [DRIVE-TEST] Using WooCommerce product:', {
        id: wooProduct.id,
        name: wooProduct.name,
        regular_price: regularPrice,
        sale_price: salePrice,
        useSalePrice,
        woo_sale_price: wooProduct.sale_price
      });
      
      return [{
        id: `drive-test-woo-${wooProduct.id}`,
        name: wooProduct.name,
        description: wooProduct.description || 'Prodotto selezionato dal seller',
        regular_price: regularPrice,
        sale_price: salePrice,
        features: []
      }];
    }
    
    // Priority 2: Legacy dynamic product param
    if (dynamicProduct) {
      console.log('📦 [DRIVE-TEST] Using legacy dynamic product');
      return [{
        id: `drive-test-${dynamicProduct.id}`,
        name: dynamicProduct.name,
        description: dynamicProduct.description || 'Prodotto selezionato dal seller',
        regular_price: dynamicProduct.regular_price || dynamicProduct.price,
        sale_price: dynamicProduct.sale_price || dynamicProduct.price,
        features: []
      }];
    }
    
    // Priority 3: Fallback (should only happen if no wooProductId was provided)
    if (wooProductId && !wooProduct && !loading) {
      console.error('❌ [DRIVE-TEST] CRITICAL: wooProductId was provided but product not found!', {
        wooProductId,
        loading
      });
    }
    console.log('⚠️ [DRIVE-TEST] Using fallback product (no WooCommerce product found)');
    return fallbackProducts;
  }, [wooProduct, dynamicProduct, useSalePrice, wooProductId, loading]);

  const upsells = [
    {
      id: 'drive-test-extended',
      name: 'Estensione 60 Giorni',
      description: 'Raddoppia il periodo di prova',
      price: 300,
      features: [
        '+30 giorni di accesso',
        '+100 lead aggiuntivi',
        'Report personalizzati',
        'Consulenza strategica inclusa'
      ]
    },
    {
      id: 'drive-test-premium-support',
      name: 'Supporto Premium',
      description: 'Assistenza dedicata durante il drive test',
      price: 200,
      features: [
        'Account manager dedicato',
        'Chiamate di check-in settimanali',
        'Ottimizzazione campagne inclusa',
        'Supporto prioritario 24/7'
      ]
    },
    {
      id: 'drive-test-advanced-analytics',
      name: 'Analytics Avanzati',
      description: 'Dashboard e report potenziati',
      price: 150,
      features: [
        'Dashboard personalizzata',
        'Report giornalieri automatici',
        'Analisi predittiva AI',
        'Export dati illimitato'
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
      title="Drive Test - Prova Senza Rischi"
      subtitle="Testa la nostra piattaforma per 30 giorni e scopri il potenziale"
      products={products}
      upsells={allUpsells}
      cartType="drive-test"
      referralCode={ref || undefined}
    />
  );
}

