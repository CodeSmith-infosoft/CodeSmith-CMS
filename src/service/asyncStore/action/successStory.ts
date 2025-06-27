import { getParamString } from "@/utils/helper";
import api from "..";

export type getSuccessPayloadType = {
  type: string;
};

export async function addSuccess(payload: FormData, type: string) {
  try {
    const response = api.post(
      `/successStory/addSuccessStoryImage?type=${type}`,
      payload
    );

    return (await response).data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getAllSuccess(payload: getSuccessPayloadType) {
  try {
    const response = api.get(
      `/successStory/getAllSuccessStoryImage?${getParamString(payload)}`
    );

    return (await response).data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function deleteSuccess(id: string) {
  try {
    const response = api.delete(`/successStory/deleteSuccessStoryImage/${id}`);

    return (await response).data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
