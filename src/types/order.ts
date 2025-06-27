import { ProductDataType } from "./hireDevTypes";

export type getOrderPayloadType = {
  status?: string;
  customerId?: string;
  startDate?: any;
  endDate?: any;
  page?: number;
  limit?: number;
  search?: string;
};

export type exportCSVType = {
  startDate?: any;
  endDate?: any;
};

export type orderDataType = {
  _id: string;
  userId: string;
  orderId: number;
  fname: string;
  lname: string;
  items: Array<orderItemType>;
  paymentMethod: string;
  shippingAddress: string[];
  shippingCountry: string;
  shippingState: string;
  shippingPincode: string;
  streetAddress: string[];
  country: string;
  state: string;
  pincode: number;
  mobile: string;
  email: string;
  shippingCharge: string;
  totalAmount: number;
  orderNote: string;
  status: string;
  isActive: boolean;
  createdAt: string;
};

export type orderItemType = {
  productId: ProductDataType;
  quantity: number;
  price: number;
  _id: string;
};

export type orderNotificationItemType = {
  orderId: string;
  sku: string;
  title: string;
  _id: string;
  createdAt: string;
  image: string;
}