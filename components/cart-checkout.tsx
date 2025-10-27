"use client";

import { useState, useMemo } from 'react';
import { Check, X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useTranslations } from "next-intl";
import CartCreditCardGateway from './payment-gateway/cart-credit-card';
import KlarnaGateway from './payment-gateway/klarna';
import type { PaymentGatewayId } from './payment-gateway/types';

interface Product {
  id: string;
  name: string;
  description: string;
  regular_price: number;
  sale_price?: number;
  features: string[];
}

interface Upsell {
  id: string;
  name: string;
  description: string;
  price: number;
  regular_price?: number; // Per supportare sconti sugli upsell
  sale_price?: number;
  features: string[];
}

interface CartCheckoutProps {
  title: string;
  subtitle: string;
  products: Product[];
  upsells?: Upsell[];
  cartType: 'setup-fee' | 'drive-test' | 'performance' | 'bundles';
  referralCode?: string;
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

export function CartCheckout({ 
  title, 
  subtitle, 
  products, 
  upsells = [], 
  cartType,
  referralCode 
}: CartCheckoutProps) {
  const t = useTranslations("checkout");
  const [quantities, setQuantities] = useState<Record<string, number>>(
    products.reduce((acc, p) => ({ ...acc, [p.id]: 1 }), {})
  );
  const [selectedUpsells, setSelectedUpsells] = useState<Set<string>>(new Set());
  const [selectedMethod, setSelectedMethod] = useState<PaymentGatewayId | null>("creditCard");

  const updateQuantity = (productId: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + delta)
    }));
  };

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

  const calculateTotal = () => {
    const productsTotal = products.reduce((sum, product) => {
      const price = Number(product.sale_price || product.regular_price);
      return sum + (price * quantities[product.id]);
    }, 0);

    const upsellsTotal = upsells
      .filter(u => selectedUpsells.has(u.id))
      .reduce((sum, u) => {
        // Usa sale_price se disponibile, altrimenti price o regular_price
        const price = Number(u.sale_price || u.price || u.regular_price || 0);
        return sum + price;
      }, 0);

    return productsTotal + upsellsTotal;
  };

  const calculateSavings = () => {
    // Risparmio sui prodotti
    const productsSavings = products.reduce((sum, product) => {
      if (product.sale_price) {
        const savings = (Number(product.regular_price) - Number(product.sale_price)) * quantities[product.id];
        return sum + savings;
      }
      return sum;
    }, 0);

    // Risparmio sugli upsell
    const upsellsSavings = upsells
      .filter(u => selectedUpsells.has(u.id))
      .reduce((sum, u) => {
        if (u.sale_price && u.regular_price && Number(u.sale_price) < Number(u.regular_price)) {
          return sum + (Number(u.regular_price) - Number(u.sale_price));
        }
        return sum;
      }, 0);

    return productsSavings + upsellsSavings;
  };

  // Crea oggetto order per il payment gateway
  const order = useMemo(() => {
    const productsTotal = products.reduce((sum, p) => {
      const price = Number(p.sale_price || p.regular_price);
      return sum + (price * quantities[p.id]);
    }, 0);

    const upsellsTotal = Array.from(selectedUpsells).reduce((sum, upsellId) => {
      const upsell = upsells.find(u => u.id === upsellId);
      if (!upsell) return sum;
      const price = Number(upsell.sale_price || upsell.price || upsell.regular_price || 0);
      return sum + price;
    }, 0);

    const total = productsTotal + upsellsTotal;

    const selectedProductsData = products.map(p => ({
      id: p.id,
      name: p.name,
      regular_price: p.regular_price,
      sale_price: p.sale_price,
      quantity: quantities[p.id]
    }));

    const selectedUpsellsData = Array.from(selectedUpsells).map(upsellId => {
      const upsell = upsells.find(u => u.id === upsellId)!;
      return {
        id: upsell.id,
        name: upsell.name,
        regular_price: upsell.regular_price || upsell.price,
        sale_price: upsell.sale_price,
        price: upsell.price,
      };
    });

    return {
      package: title,
      currency: 'EUR',
      unitPrice: total,
      quantity: 1,
      total: total,
      priceRange: {
        min: total,
        max: total
      },
      selections: {
        revenueBand: { id: cartType, label: title },
        geography: { id: 'it', label: 'Italia' },
        sector: { id: cartType, label: title },
        riskProfile: 50
      },
      metadata: {
        locale: 'it-IT',
        generatedAt: new Date().toISOString(),
        productName: title,
        cart_type: cartType,
        referral_code: referralCode,
        products: selectedProductsData,
        upsells: selectedUpsellsData
      }
    };
  }, [products, quantities, selectedUpsells, upsells, title, cartType, referralCode]);

  const total = calculateTotal();
  const savings = calculateSavings();

  const methodCards = useMemo(
    () =>
      METHODS.map((method) => ({
        ...method,
        label: t(`payment.methods.${method.id}.label`),
        description: t(`payment.methods.${method.id}.description`),
      })),
    [t]
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-xl text-gray-600">{subtitle}</p>
        {referralCode && (
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
            <Check className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-900">
              Codice referral applicato: {referralCode}
            </span>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Products */}
        <div className="lg:col-span-2 space-y-6">
          {products.map((product) => {
            const hasDiscount = product.sale_price && product.sale_price < product.regular_price;
            const discountPercentage = hasDiscount
              ? Math.round(((product.regular_price - product.sale_price!) / product.regular_price) * 100)
              : 0;

            return (
              <div key={product.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-gray-600">{product.description}</p>
                    </div>
                    {hasDiscount && (
                      <div className="ml-4 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                        -{discountPercentage}%
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Price and Quantity */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                      {hasDiscount ? (
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-gray-900">
                            €{Number(product.sale_price).toFixed(2)}
                          </span>
                          <span className="text-lg text-gray-500 line-through">
                            €{Number(product.regular_price).toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-3xl font-bold text-gray-900">
                          €{Number(product.regular_price).toFixed(2)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(product.id, -1)}
                        className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition"
                        disabled={quantities[product.id] <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-xl font-semibold w-8 text-center">
                        {quantities[product.id]}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, 1)}
                        className="w-10 h-10 rounded-lg border-2 border-blue-600 text-blue-600 flex items-center justify-center hover:bg-blue-50 transition"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Upsells */}
          {upsells.length > 0 && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🎁 Aggiungi al tuo ordine</h3>
              <div className="space-y-4">
                {upsells.map((upsell) => (
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
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{upsell.name}</h4>
                          <div className="text-right">
                            {upsell.sale_price && upsell.regular_price && Number(upsell.sale_price) < Number(upsell.regular_price) ? (
                              <>
                                <span className="text-sm text-gray-500 line-through mr-2">
                                  +€{Number(upsell.regular_price).toFixed(2)}
                                </span>
                                <span className="text-lg font-bold text-green-600">
                                  +€{Number(upsell.sale_price).toFixed(2)}
                                </span>
                              </>
                            ) : (
                              <span className="text-lg font-bold text-blue-600">
                                +€{Number(upsell.sale_price || upsell.price || upsell.regular_price || 0).toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{upsell.description}</p>
                        <ul className="space-y-1">
                          {upsell.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                              <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Order Summary and Payment */}
        <div className="lg:col-span-1 space-y-6">
          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Riepilogo Ordine
            </h3>

            <div className="space-y-3 mb-6">
              {products.map((product) => {
                const price = Number(product.sale_price || product.regular_price);
                const qty = quantities[product.id];
                return (
                  <div key={product.id} className="flex justify-between text-sm">
                    <span className="text-gray-700">
                      {product.name} x{qty}
                    </span>
                    <span className="font-semibold text-gray-900">
                      €{(price * qty).toFixed(2)}
                    </span>
                  </div>
                );
              })}

              {Array.from(selectedUpsells).map((upsellId) => {
                const upsell = upsells.find(u => u.id === upsellId);
                if (!upsell) return null;
                const price = Number(upsell.sale_price || upsell.price || upsell.regular_price || 0);
                return (
                  <div key={upsell.id} className="flex justify-between text-sm">
                    <span className="text-gray-700">{upsell.name}</span>
                    <span className="font-semibold text-gray-900">
                      €{price.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>

            {savings > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-green-900">Risparmio</span>
                  <span className="text-lg font-bold text-green-700">
                    -€{savings.toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Totale</span>
                <span className="text-3xl font-bold text-blue-600">
                  €{total.toFixed(2)}
                </span>
              </div>
            </div>

          </div>

          {/* Payment Gateway */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
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
          </div>
        </div>
      </div>
    </div>
  );
}

