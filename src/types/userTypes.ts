export type UserDataType = {
  _id: string;
  address: string;
  country: string;
  createdAt: string; // ISO date string
  email: string;
  fcm: string;
  fname: string;
  gender: string;
  isActive: boolean;
  lname: string;
  mobile: string;
  pincode: number;
  profilePhoto: string;
  role: "user" | "admin"; // adjust if there are more roles
  state: string;
  updatedAt: string; // ISO date string
  orderCount: number;
  monthlyOrderCount: number;
};
