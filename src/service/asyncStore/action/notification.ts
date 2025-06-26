import api from "..";

export async function getOrderNotifications() {
  try {
    const response = api.get(`/order/admin/getOrderNotifications`);

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function deleteOrderNotification(payload: string[]) {
  try {
    const response = api.put(`/order/admin/deleteOrderNotification`, {
      notificationIds: payload,
    });

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}
