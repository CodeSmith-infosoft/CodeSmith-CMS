import { addCareerType, getCareerPayloadType } from "@/types/careerTypes";
import api from "..";
import { getParamString } from "@/utils/helper";

export async function getAllCareer(payload: getCareerPayloadType) {
  try {
    const response = api.get(`/career/getAllCareer?${getParamString(payload)}`);

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function getCareerById(id: string) {
  try {
    const response = api.get(`/career/getCareerById/${id}`);

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function addCareer(payload: addCareerType) {
  try {
    const response = api.post(`/career/addCareer`, payload);

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function updateCareer(payload: addCareerType, id: string) {
  try {
    const response = api.put(`/career/updateCareer/${id}`, payload);

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function deleteCareer(id: string) {
  try {
    const response = api.delete(`/career/deleteCareer/${id}`);

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}
