export interface Product {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
}

export interface PincodeInfo {
  pincode: string;
  provider: 'A' | 'B' | 'GENERAL';
  region: 'METRO' | 'NON_METRO' | 'TIER_2_3';
}

export interface DeliveryEstimate {
  deliveryDate: Date;
  provider: string;
  isSameDayEligible: boolean;
  cutoffTime?: string;
}