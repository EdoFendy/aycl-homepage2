"use client"

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface BundleData {
  id: string;
  name: string;
  description?: string;
  products: Array<{
    product_name: string;
    quantity: number;
    unit_price: number;
    total_price: number;
  }>;
  discount_type: string;
  discount_value: number;
  subtotal: number;
  discount_amount: number;
  total: number;
  currency: string;
  includes_upsell: boolean;
  upsell_name?: string;
  upsell_description?: string;
  upsell_price?: number;
}

interface BundleCheckoutProps {
  bundleToken: string;
}

export function BundleCheckout({ bundleToken }: BundleCheckoutProps) {
  const [bundle, setBundle] = useState<BundleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    async function fetchBundle() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/bundles/token/${bundleToken}`);
        
        if (!response.ok) {
          throw new Error('Bundle non trovato');
        }
        
        const data = await response.json();
        
        // Convert string numbers to actual numbers
        const normalizedData = {
          ...data,
          discount_value: parseFloat(data.discount_value) || 0,
          subtotal: parseFloat(data.subtotal) || 0,
          discount_amount: parseFloat(data.discount_amount) || 0,
          total: parseFloat(data.total) || 0,
          upsell_price: data.upsell_price ? parseFloat(data.upsell_price) : undefined,
          products: data.products?.map((p: any) => ({
            ...p,
            quantity: parseInt(p.quantity) || 0,
            unit_price: parseFloat(p.unit_price) || 0,
            total_price: parseFloat(p.total_price) || 0,
          })) || []
        };
        
        setBundle(normalizedData);
      } catch (err) {
        console.error('Error fetching bundle:', err);
        setError(err instanceof Error ? err.message : 'Errore caricamento bundle');
      } finally {
        setLoading(false);
      }
    }
    
    if (bundleToken) {
      fetchBundle();
    }
  }, [bundleToken]);

  const handleProceedToCheckout = async () => {
    if (!bundle) return;
    
    setRedirecting(true);
    
    try {
      const response = await fetch('/api/bundle/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bundle })
      });
      
      if (!response.ok) {
        throw new Error('Errore generazione checkout');
      }
      
      const data = await response.json();
      
      if (data.success && data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error(data.message || 'Errore generazione checkout');
      }
    } catch (err) {
      console.error('Error creating checkout:', err);
      setError(err instanceof Error ? err.message : 'Errore checkout');
      setRedirecting(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: bundle?.currency || 'EUR'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-orange" />
      </div>
    );
  }

  if (error || !bundle) {
    return (
      <Card className="p-8 text-center">
        <h3 className="text-xl font-semibold text-red-600 mb-2">Errore</h3>
        <p className="text-gray-600">{error || 'Bundle non trovato'}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Bundle Header */}
      <Card className="p-6 bg-gradient-to-br from-white via-orange/5 to-sky-blue/10">
        <h2 className="text-2xl font-bold text-navy mb-2">{bundle.name}</h2>
        {bundle.description && (
          <p className="text-gray-600">{bundle.description}</p>
        )}
      </Card>

      {/* Products List */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-navy mb-4">Prodotti Inclusi</h3>
        <div className="space-y-3">
          {bundle.products.map((product, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
              <div className="flex-1">
                <p className="font-medium text-navy">{product.product_name}</p>
                <p className="text-sm text-gray-500">Quantità: {product.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-navy">{formatCurrency(product.total_price)}</p>
                <p className="text-xs text-gray-500">{formatCurrency(product.unit_price)} cad.</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* UpSell (if included) */}
      {bundle.includes_upsell && bundle.upsell_name && (
        <Card className="p-6 border-2 border-orange/20 bg-orange/5">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-orange/20 rounded-full flex items-center justify-center">
              <span className="text-orange font-bold">+</span>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-navy mb-1">UpSell Disponibile</h4>
              <p className="text-lg font-bold text-orange mb-2">{bundle.upsell_name}</p>
              {bundle.upsell_description && (
                <p className="text-sm text-gray-600 mb-3">{bundle.upsell_description}</p>
              )}
              <p className="text-sm text-gray-700">
                Prezzo aggiuntivo: <span className="font-semibold">{formatCurrency(bundle.upsell_price || 0)}</span>
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Pricing Summary */}
      <Card className="p-6 bg-gray-50">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-gray-700">
            <span>Subtotale</span>
            <span className="font-medium">{formatCurrency(bundle.subtotal)}</span>
          </div>
          
          {bundle.discount_type !== 'none' && bundle.discount_amount > 0 && (
            <div className="flex items-center justify-between text-green-600">
              <span>
                Sconto {bundle.discount_type === 'percentage' ? `(${bundle.discount_value}%)` : ''}
              </span>
              <span className="font-medium">-{formatCurrency(bundle.discount_amount)}</span>
            </div>
          )}
          
          <div className="border-t border-gray-300 pt-3 flex items-center justify-between">
            <span className="text-xl font-bold text-navy">Totale</span>
            <span className="text-2xl font-bold text-orange">{formatCurrency(bundle.total)}</span>
          </div>
        </div>
      </Card>

      {/* Checkout Button */}
      <div className="flex justify-center">
        <Button
          onClick={handleProceedToCheckout}
          disabled={redirecting}
          className="w-full sm:w-auto bg-orange hover:bg-orange/90 text-white px-8 py-6 text-lg font-semibold rounded-2xl shadow-lg"
        >
          {redirecting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Reindirizzamento...
            </>
          ) : (
            'Procedi al Pagamento'
          )}
        </Button>
      </div>
    </div>
  );
}

