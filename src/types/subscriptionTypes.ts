export type subscriptionPayloadType = {
  page: number;
  limit: number;
};

export type subscriptionItemType = {
  isRegistered: boolean;
  email: string;
};

export type subscriptionCSVPayloadType = {
  startDate?: any;
  endDate?: any;
};
