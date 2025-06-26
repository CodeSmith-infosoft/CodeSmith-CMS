import api from "..";
import { getParamString } from "@/utils/helper";
import { getSubscribePayloadType } from "@/types/SubscribeType";

export async function getAllSubscribe(payload: getSubscribePayloadType) {
  try {
    const response = api.get(`/contact/getAllSubscribe?${getParamString(payload)}`);

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}