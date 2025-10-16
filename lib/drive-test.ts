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
    revenueBand: {
      id: string;
      label: string;
    };
    geography: {
      id: string;
      label: string;
    };
    sector: {
      id: string;
      label: string;
    };
    riskProfile: number;
  };
  metadata: {
    locale: string;
    generatedAt: string;
    wooProductId?: number;
    adminPaymentId?: number;
    productName?: string;
    basePrice?: string;
    customPrice?: string;
    originalPrice?: string;
    customer?: {
      firstName: string;
      lastName: string;
    };
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
