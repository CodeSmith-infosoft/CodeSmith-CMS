import api from "..";
import { getParamString } from "@/utils/helper";
import { getBlogPayloadType } from "@/types/blogTypes";

export async function getAllTouch(payload: getBlogPayloadType) {
  try {
    const response = api.get(
      `/contact/getAllGetInTouch?${getParamString(payload)}`
    );

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function markAsRead(contactId: string) {
  try {
    const response = await api.put(`/contact/markGetInTouch/${contactId}`);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw error?.response?.data || error;
  }
}
