import { exportCSVType, getOrderPayloadType } from "@/types/order";
import api from "..";
import { getParamString } from "@/utils/helper";

export async function getAllOrders(payload: getOrderPayloadType) {
  try {
    const response = api.get(
      `/order/admin/getAllOrders?${getParamString(payload)}`
    );

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function getOrderById(id: string) {
  try {
    const response = api.get(
      `/order/getOrderById/${id}`
    );

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function downloadOrdersCSV(payload: exportCSVType) {
  try {
    const response = api.get(
      `/order/admin/downloadOrdersCSV?${getParamString(payload)}`
    );

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}