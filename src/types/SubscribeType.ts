export type SubscribeItemType = {
  _id: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type getSubscribePayloadType = {
  page?: number;
  limit?: number;
};
