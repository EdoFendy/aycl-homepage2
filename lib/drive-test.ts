export interface DriveTestOrder {
  package: string;
  currency: string;
  unitPrice: number;
  quantity: number;
  total: number;
  priceRange: {
    min: number;
    max: number;
  };
  selections: {
    revenueBand: string;
    geography: string;
    macroSector: string;
    sector: string;
  };
  metadata: {
    locale: string;
    generatedAt: string;
    wooProductId?: number;
    adminPaymentId?: number;
    productName?: string;
    basePrice?: string;
    discountFromPrice?: string;
  };
}

export interface DriveTestCustomer {
  firstName: string;
  lastName: string;
  email: string;
}

export function formatPriceString(amount: number) {
  return amount.toFixed(2);
}
