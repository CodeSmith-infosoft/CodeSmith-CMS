export type addCouponPayloadType = {
  code: string;
  description: string;
  discountType: DiscountType;
  discountValue: number;
  validFrom: string;
  validTo: string;
  minPurchase?: number;
  maxPurchase?: number;
  productId?: string;
};

export type DiscountType = "percentage" | "fixed";

export type getCouponPayloadType = {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
  isExpire?: boolean;
};

export type CouponDocumentType = {
  _id: string;
  productId: string;
  code: string;
  description: string;
  discountType: 'fixed' | 'percentage';
  discountValue: number;
  validFrom: string; // ISO date string
  validTo: string;   // ISO date string
  isActive: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  usedCount: number;
  __v: number;
}