export interface addCareerType {
  techStackId: string;
  jobTitle: string;
  qualification: string;
  location: string;
  experience: string;
  vacancy: number;
  ofcTime: string;
  role: string[];
  skills: string[];
  benefits: string[];
}


export type DiscountType = "percentage" | "fixed";

export type getCareerPayloadType = {
  page?: number;
  limit?: number;
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