import { getParamString } from "@/utils/helper";
import api from "..";
import { subscriptionCSVPayloadType, subscriptionPayloadType } from "@/types/subscriptionTypes";

export async function getAllSubscribedUsers(payload: subscriptionPayloadType) {
  try {
    const response = api.get(
      `/user/admin/getAllSubscribedUsers?${getParamString(payload)}`
    );

    return (await response).data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function downloadSubscribedUsersCSV(payload: subscriptionCSVPayloadType) {
  try {
    const response = api.get(
      `/user/admin/downloadSubscribedUsersCSV?${getParamString(payload)}`
    );

    return (await response).data;
  } catch (error) {
    console.log(error);
    return error;
  }
}