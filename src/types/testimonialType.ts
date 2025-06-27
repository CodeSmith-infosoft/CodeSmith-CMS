export type getBlogPayloadType = {
  page?: number;
  limit?: number;
};

export type TestimonialItemType = {
  _id: string;
  name: string;
  description: string;
  rating: string;
  image: string;
  isActive: boolean;
  createdAt: string; // or Date if you're parsing it
  updatedAt: string; // or Date if you're parsing it
  __v: number;
  bgColor: string;
  textColor: string;
};
