import { subscriptionCSVPayloadType } from "@/types/subscriptionTypes";
import api from "..";
import { getParamString } from "@/utils/helper";

export async function getAllUsers() {
  try {
    const response = api.get(`/user/getAllUsers`);

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function getUserById(id: string) {
  try {
    const response = api.get(`/user/getUserById/${id}`);

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function inActiveUserById(id: string, isActive: boolean) {
  try {
    const response = api.put(`/user/inActiveUserById/${id}`,{isActive});

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function downloadUsersCSV(payload: subscriptionCSVPayloadType) {
  try {
    const response = api.get(`/user/admin/downloadUsersCSV?${getParamString(payload)}`);

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}