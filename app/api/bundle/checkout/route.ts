import { NextResponse } from "next/server";
import { encryptCheckoutOrder } from "@/lib/checkout-encryption";

interface BundleProduct {
  woo_product_id?: number;
  product_name: string;
  product_sku?: string;
  quantity: number;
  unit_price: number;
}

interface BundleCheckoutRequest {
  bundle: {
    id: string;
    name: string;
    description?: string;
    products: BundleProduct[];
    discount_type: 'percentage' | 'fixed' | 'none';
    discount_value: number;
    subtotal: number;
    discount_amount: number;
    total: number;
    currency: string;
    includes_upsell: boolean;
    upsell_name?: string;
    upsell_description?: string;
    upsell_price?: number;
  };
  referral_code?: string;
}

export async function POST(request: Request) {
  try {
    const body: BundleCheckoutRequest = await request.json();
    
    if (!body.bundle) {
      return NextResponse.json(
        { success: false, message: "Bundle data is required" },
        { status: 400 }
      );
    }
    
    const { bundle, referral_code } = body;
    
    // Crea oggetto ordine compatibile con il sistema di checkout
    const order = {
      package: bundle.name,
      currency: bundle.currency || 'EUR',
      unitPrice: bundle.total,
      quantity: 1, // I bundle sono sempre quantità 1
      total: bundle.total,
      priceRange: {
        min: bundle.total,
        max: bundle.total
      },
      selections: {
        revenueBand: {
          id: 'bundle',
          label: 'Bundle'
        },
        geography: {
          id: 'custom',
          label: 'Custom'
        },
        sector: {
          id: 'bundle',
          label: 'Bundle Package'
        },
        riskProfile: 50
      },
      metadata: {
        locale: 'it-IT',
        generatedAt: new Date().toISOString(),
        productName: bundle.name,
        bundleId: bundle.id,
        bundleProducts: bundle.products.map(p => ({
          name: p.product_name,
          quantity: p.quantity,
          unitPrice: p.unit_price
        })),
        discountType: bundle.discount_type,
        discountValue: bundle.discount_value,
        discountAmount: bundle.discount_amount,
        subtotal: bundle.subtotal.toString(),
        basePrice: bundle.subtotal.toString(),
        discountFromPrice: bundle.total.toString(),
        includesUpsell: bundle.includes_upsell,
        upsellName: bundle.upsell_name,
        upsellPrice: bundle.upsell_price?.toString()
      }
    };
    
    // Cripta l'ordine
    const token = encryptCheckoutOrder(order as any);
    
    // Costruisci URL checkout
    let checkoutUrl = `/checkout?order=${token}`;
    
    if (referral_code) {
      checkoutUrl += `&ref=${referral_code}`;
    }
    
    return NextResponse.json({
      success: true,
      token,
      checkoutUrl
    });
    
  } catch (error) {
    console.error("[Bundle][Checkout] Error:", error);
    const message = error instanceof Error ? error.message : "Failed to create bundle checkout";
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}

