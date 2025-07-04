export type addTechStackType = {
    name: string;
}

export type TechStackItemType = {
  _id: string;
  name: string;
  isActive: boolean;
  createdAt: string; // or Date if parsed
  updatedAt: string; // or Date if parsed
  __v: number;
  textColor: string;
  bgColor: string;
};
