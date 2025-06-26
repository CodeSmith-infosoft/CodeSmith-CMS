export type getBlogPayloadType = {
  page?: number;
  limit?: number;
};

export type TeamItemType = {
  _id: string;
  name: string;
  position: string;
  photo: string;
  linkedin: string,
  instagram: string,
  facebook: string,
  twitter: string,
  isActive: boolean;
  createdAt: string; // or Date if you're parsing it
  updatedAt: string; // or Date if you're parsing it
  __v: number;
  bgColor: string;
  textColor: string;
};
