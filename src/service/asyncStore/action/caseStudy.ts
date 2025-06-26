import { getAllCaseStudyType } from "@/types/caseStudyTypes";
import api from "..";
import { getParamString } from "@/utils/helper";

export async function getAllCaseStudy(payload: getAllCaseStudyType) {
  try {
    const response = api.get(
      `/caseStudy/getAllCaseStudy?${getParamString(payload)}`
    );

    return (await response).data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function addCaseStudy(formData: FormData) {
  try {
    const response = api.post(`/caseStudy/addCaseStudy`, formData);

    return (await response).data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function updateCaseStudy(formData: FormData, id: string) {
  try {
    const response = api.put(`/caseStudy/updateCaseStudy/${id}`, formData);

    return (await response).data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getCaseStudyById(id: string) {
  try {
    const response = api.get(`/caseStudy/getCaseStudyById/${id}`);

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function deleteCaseStudy(id: string) {
  try {
    const response = api.delete(`/caseStudy/deleteCaseStudy/${id}`);

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}
