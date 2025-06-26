export type dashboardPayloadType = {
    startDate?: any;
    endDate?: any;
}

export type dashboardStatsType = {
  totalOrders: number;
  activeOrders: number;
  completedOrders: number;
  returnedOrders: number;
  today: OrderEntry[];
  lastWeek: OrderEntry[];
  lastMonth: OrderEntry[];
  customRange: OrderEntry[];
};

export type OrderEntry = {
  date: string; // ISO date string
  transaction: number;
  totalOrders: number;
};
