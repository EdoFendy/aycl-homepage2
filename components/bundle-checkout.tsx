"use client"

import { useState, useEffect, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Loader2, ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";
import CartCreditCardGateway from './payment-gateway/cart-credit-card';
import KlarnaGateway from './payment-gateway/klarna';
import type { PaymentGatewayId } from './payment-gateway/types';

interface Upsell {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency?: string;
  features: string[];
}

interface BundleData {
  id: string;
  name: string;
  description?: string;
  products: Array<{
    product_name: string;
    quantity: number;
    unit_price: number;
    total_price: number;
    product_discount_type?: 'percentage' | 'fixed' | 'none';
    product_discount_value?: number;
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
  metadata?: {
    upsells_data?: Upsell[];
  };
}

interface BundleCheckoutProps {
  bundleToken: string;
}

interface MethodConfig {
  id: PaymentGatewayId;
  supportsCheckout: boolean;
}

const METHODS: MethodConfig[] = [
  { id: "creditCard", supportsCheckout: true },
  { id: "klarna", supportsCheckout: true },
  { id: "paypal", supportsCheckout: false },
];

export function BundleCheckout({ bundleToken }: BundleCheckoutProps) {
  const t = useTranslations("checkout");
  const [bundle, setBundle] = useState<BundleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<PaymentGatewayId | null>("creditCard");
  const [selectedUpsells, setSelectedUpsells] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function fetchBundle() {
      try {
        // Use internal API proxy to avoid ad-blocker issues
        const response = await fetch(`/api/bundle/data?token=${bundleToken}`);
        
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
            product_discount_type: p.product_discount_type || 'none',
            product_discount_value: p.product_discount_value ? parseFloat(p.product_discount_value) : 0,
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

  const toggleUpsell = (upsellId: string) => {
    setSelectedUpsells(prev => {
      const newSet = new Set(prev);
      if (newSet.has(upsellId)) {
        newSet.delete(upsellId);
      } else {
        newSet.add(upsellId);
      }
      return newSet;
    });
  };

  // Calcola il totale includendo gli upsell selezionati
  const calculateTotal = () => {
    if (!bundle) return 0;
    
    let total = bundle.total;
    
    // Aggiungi gli upsell selezionati
    const upsells = bundle.metadata?.upsells_data || [];
    upsells.forEach(upsell => {
      if (selectedUpsells.has(upsell.id)) {
        total += upsell.price;
      }
    });
    
    return total;
  };

  const finalTotal = calculateTotal();

  // Crea oggetto order per il payment gateway
  const order = useMemo(() => {
    if (!bundle) return null;

    const upsells = bundle.metadata?.upsells_data || [];
    const selectedUpsellsData = upsells.filter(u => selectedUpsells.has(u.id));

    return {
      package: bundle.name,
      currency: bundle.currency || 'EUR',
      unitPrice: finalTotal,
      quantity: 1,
      total: finalTotal,
      priceRange: {
        min: finalTotal,
        max: finalTotal
      },
      selections: {
        revenueBand: { id: 'bundle', label: 'Bundle' },
        geography: { id: 'it', label: 'Italia' },
        sector: { id: 'bundle', label: 'Bundle' },
        riskProfile: 50
      },
      metadata: {
        locale: 'it-IT',
        generatedAt: new Date().toISOString(),
        productName: bundle.name,
        cart_type: 'bundle',
        bundleId: bundle.id,
        bundleProducts: bundle.products,
        discountType: bundle.discount_type,
        discountValue: bundle.discount_value,
        discountAmount: bundle.discount_amount,
        subtotal: bundle.subtotal,
        includesUpsell: bundle.includes_upsell,
        upsellName: bundle.upsell_name,
        upsellPrice: bundle.upsell_price,
        // Aggiungi gli upsell selezionati
        selectedUpsells: selectedUpsellsData,
      }
    };
  }, [bundle, selectedUpsells, finalTotal]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: bundle?.currency || 'EUR'
    }).format(amount);
  };

  // Calcola il prezzo scontato di un prodotto
  const calculateProductDiscountedPrice = (product: BundleData['products'][0]) => {
    if (!product.product_discount_type || product.product_discount_type === 'none' || !product.product_discount_value) {
      return null; // Nessuno sconto
    }

    if (product.product_discount_type === 'percentage') {
      return product.unit_price * (1 - product.product_discount_value / 100);
    } else if (product.product_discount_type === 'fixed') {
      return Math.max(0, product.unit_price - product.product_discount_value);
    }

    return null;
  };

  // Calcola la percentuale di sconto di un prodotto
  const calculateProductDiscountPercentage = (product: BundleData['products'][0]) => {
    const discountedPrice = calculateProductDiscountedPrice(product);
    if (!discountedPrice) return 0;
    
    return Math.round(((product.unit_price - discountedPrice) / product.unit_price) * 100);
  };

  const methodCards = useMemo(
    () =>
      METHODS.map((method) => ({
        ...method,
        label: t(`payment.methods.${method.id}.label`),
        description: t(`payment.methods.${method.id}.description`),
      })),
    [t]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-orange" />
      </div>
    );
  }

  if (error || !bundle || !order) {
    return (
      <Card className="p-8 text-center">
        <h3 className="text-xl font-semibold text-red-600 mb-2">Errore</h3>
        <p className="text-gray-600">{error || 'Bundle non trovato'}</p>
      </Card>
    );
  }

  return (
    <div className="mt-14 grid gap-6 lg:grid-cols-[2fr_1fr]">
      {/* Bundle Details */}
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
          {bundle.products.map((product, index) => {
            const discountedPrice = calculateProductDiscountedPrice(product);
            const discountPercentage = calculateProductDiscountPercentage(product);
            const hasDiscount = discountedPrice !== null && discountedPrice < product.unit_price;

            return (
              <div key={index} className="flex items-start justify-between py-3 border-b border-gray-200 last:border-0">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-navy">{product.product_name}</p>
                    {hasDiscount && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        -{discountPercentage}%
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">Quantità: {product.quantity}</p>
                </div>
                <div className="text-right">
                  {hasDiscount ? (
                    <>
                      <div className="flex flex-col items-end gap-1">
                        <p className="text-sm text-gray-400 line-through">
                          {formatCurrency(product.unit_price * product.quantity)}
                        </p>
                        <p className="font-semibold text-green-600 text-lg">
                          {formatCurrency(discountedPrice! * product.quantity)}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatCurrency(discountedPrice!)} cad.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold text-navy">{formatCurrency(product.total_price)}</p>
                      <p className="text-xs text-gray-500">{formatCurrency(product.unit_price)} cad.</p>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Dynamic Upsells (from metadata) */}
      {bundle.metadata?.upsells_data && bundle.metadata.upsells_data.length > 0 && (
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">🎁 Aggiungi al tuo ordine</h3>
          <div className="space-y-4">
            {bundle.metadata.upsells_data.map((upsell) => (
              <div
                key={upsell.id}
                className={`bg-white rounded-lg p-4 border-2 transition cursor-pointer ${
                  selectedUpsells.has(upsell.id)
                    ? 'border-blue-600 shadow-md'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => toggleUpsell(upsell.id)}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedUpsells.has(upsell.id)
                      ? 'bg-blue-600 border-blue-600'
                      : 'border-gray-300'
                  }`}>
                    {selectedUpsells.has(upsell.id) && (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{upsell.name}</h4>
                      <span className="text-lg font-bold text-blue-600">
                        +{formatCurrency(upsell.price)}
                      </span>
                    </div>
                    {upsell.description && (
                      <p className="text-sm text-gray-600 mb-2">{upsell.description}</p>
                    )}
                    {upsell.features && upsell.features.length > 0 && (
                      <ul className="space-y-1">
                        {upsell.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                            <svg className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* UpSell (if included) - Legacy support */}
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
          {/* Calcola il subtotale originale (senza sconti per prodotto) */}
          {(() => {
            const originalSubtotal = bundle.products.reduce((sum, product) => 
              sum + (product.unit_price * product.quantity), 0
            );
            const subtotalWithProductDiscounts = bundle.products.reduce((sum, product) => {
              const discountedPrice = calculateProductDiscountedPrice(product);
              return sum + ((discountedPrice || product.unit_price) * product.quantity);
            }, 0);
            const productDiscountTotal = originalSubtotal - subtotalWithProductDiscounts;
            const totalSavings = originalSubtotal - bundle.total;
            const hasProductDiscounts = productDiscountTotal > 0;

            return (
              <>
                {hasProductDiscounts && (
                  <div className="flex items-center justify-between text-gray-500 text-sm">
                    <span>Prezzo listino</span>
                    <span className="line-through">{formatCurrency(originalSubtotal)}</span>
                  </div>
                )}
                
                {hasProductDiscounts && (
                  <div className="flex items-center justify-between text-green-600">
                    <span>Sconti per prodotto</span>
                    <span className="font-medium">-{formatCurrency(productDiscountTotal)}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-between text-gray-700">
                  <span>Subtotale</span>
                  <span className="font-medium">{formatCurrency(bundle.subtotal)}</span>
                </div>
                
                {bundle.discount_type !== 'none' && bundle.discount_amount > 0 && (
                  <div className="flex items-center justify-between text-green-600">
                    <span>
                      Sconto bundle {bundle.discount_type === 'percentage' ? `(${bundle.discount_value}%)` : ''}
                    </span>
                    <span className="font-medium">-{formatCurrency(bundle.discount_amount)}</span>
                  </div>
                )}
                
                {totalSavings > 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-900">Risparmio Totale</span>
                      <span className="text-lg font-bold text-green-700">
                        -{formatCurrency(totalSavings)}
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="border-t border-gray-300 pt-3 flex items-center justify-between">
                  <span className="text-xl font-bold text-navy">Totale</span>
                  <span className="text-2xl font-bold text-orange">{formatCurrency(bundle.total)}</span>
                </div>
              </>
            );
          })()}
        </div>
      </Card>
      </div>

      {/* Payment Gateway - Same as cart pages */}
      <div className="space-y-6">
        {/* Order Summary */}
        <Card className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Riepilogo Ordine
          </h3>
          
          {/* Products list */}
          <div className="space-y-2 mb-4">
            {bundle.products.map((product, index) => {
              const discountedPrice = calculateProductDiscountedPrice(product);
              const hasDiscount = discountedPrice !== null && discountedPrice < product.unit_price;
              const finalPrice = hasDiscount ? discountedPrice! * product.quantity : product.total_price;
              
              return (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {product.product_name} {product.quantity > 1 ? `(x${product.quantity})` : ''}
                  </span>
                  <div className="text-right">
                    {hasDiscount ? (
                      <div className="flex flex-col items-end">
                        <span className="text-xs text-gray-400 line-through">
                          {formatCurrency(product.unit_price * product.quantity)}
                        </span>
                        <span className="font-semibold text-green-600">
                          {formatCurrency(finalPrice)}
                        </span>
                      </div>
                    ) : (
                      <span className="font-semibold text-gray-900">
                        {formatCurrency(finalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Selected Upsells */}
            {bundle.metadata?.upsells_data && Array.from(selectedUpsells).map((upsellId) => {
              const upsell = bundle.metadata!.upsells_data!.find(u => u.id === upsellId);
              if (!upsell) return null;
              return (
                <div key={upsell.id} className="flex justify-between text-sm">
                  <span className="text-blue-700 font-medium">{upsell.name}</span>
                  <span className="font-semibold text-blue-600">
                    {formatCurrency(upsell.price)}
                  </span>
                </div>
              );
            })}
          </div>
          
          {(() => {
            const originalSubtotal = bundle.products.reduce((sum, product) => 
              sum + (product.unit_price * product.quantity), 0
            );
            const totalSavings = originalSubtotal - bundle.total;

            return totalSavings > 0 ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-green-900">Risparmio Totale</span>
                  <span className="text-lg font-bold text-green-700">
                    -{formatCurrency(totalSavings)}
                  </span>
                </div>
              </div>
            ) : null;
          })()}

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">Totale</span>
              <span className="text-3xl font-bold text-blue-600">
                {formatCurrency(finalTotal)}
              </span>
            </div>
          </div>
        </Card>

        {/* Payment Methods */}
        <Card className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{t("payment.title")}</h3>
          <p className="text-sm text-gray-500 mb-6">{t("payment.subtitle")}</p>

          {/* Payment Method Selection */}
          <div className="space-y-3 mb-6">
            {methodCards.map((method) => {
              const isSelected = selectedMethod === method.id;
              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full rounded-2xl border px-4 py-4 text-left transition-all ${
                    isSelected ? "border-orange bg-orange/10 shadow-md" : "border-gray-200 bg-gray-50 hover:border-orange"
                  }`}
                >
                  <p className="text-sm font-semibold text-navy">{method.label}</p>
                  <p className="text-xs text-gray-500">{method.description}</p>
                  {!method.supportsCheckout ? (
                    <p className="mt-3 text-xs font-medium uppercase tracking-[0.25em] text-gray-400">
                      {t("payment.comingSoon")}
                    </p>
                  ) : null}
                </button>
              );
            })}
          </div>

          {/* Payment Forms */}
          {selectedMethod === "creditCard" ? <CartCreditCardGateway order={order as any} /> : null}
          {selectedMethod === "klarna" ? <KlarnaGateway order={order as any} /> : null}

          <p className="mt-6 text-xs text-gray-500 text-center">{t("payment.note")}</p>
        </Card>
      </div>
    </div>
  );
}

