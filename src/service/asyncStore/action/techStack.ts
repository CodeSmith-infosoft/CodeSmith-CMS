import api from "..";
import { getParamString } from "@/utils/helper";
import { getBlogPayloadType } from "@/types/blogTypes";
import { addTechStackType } from "@/types/techStackTypes";

export async function getAllTechStack(payload: getBlogPayloadType) {
  try {
    const response = api.get(
      `/techStack/getAllTechStack?${getParamString(payload)}`
    );

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function addTechStack(payload: addTechStackType) {
  try {
    const response = api.post(`/techStack/addTechStack`, payload);

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function updateTechStack(payload: addTechStackType, id: string) {
  try {
    const response = api.put(`/techStack/updateTechStack/${id}`, payload);

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function deleteTechStack(id: string) {
  try {
    const response = api.delete(`/techStack/deleteTechStack/${id}`);

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}
