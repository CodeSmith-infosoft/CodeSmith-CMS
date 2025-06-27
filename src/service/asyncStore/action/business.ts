import api from "..";
import { getParamString } from "@/utils/helper";
import { getBlogPayloadType } from "@/types/blogTypes";

export async function getAllTouch(payload: getBlogPayloadType) {
  try {
    const response = api.get(
      `/contact/getAllInquiries?${getParamString(payload)}`
    );

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function markAsRead(contactId: string) {
  try {
    const response = await api.put(`/contact/markInquiry/${contactId}`);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw error?.response?.data || error;
  }
}

export async function getAllJobApplication(payload: getBlogPayloadType) {
  try {
    const response = api.get(
      `/contact/getAllJobApplication?${getParamString(payload)}`
    );

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function markJobApplication(contactId: string) {
  try {
    const response = await api.put(`/contact/markJobApplication/${contactId}`);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw error?.response?.data || error;
  }
}