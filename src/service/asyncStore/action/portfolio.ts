import { getCareerPayloadType } from "@/types/careerTypes";
import api from "..";
import { getParamString } from "@/utils/helper";

export async function addPortfolio(formData: FormData) {
  try {
    const response = api.post(`/portfolio/addPortfolio`, formData);

    return (await response).data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getPortfolioById(id: string) {
  try {
    const response = api.get(`/portfolio/getPortfolioById/${id}`);

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function getAllPortfolio(payload: getCareerPayloadType) {
  try {
    const response = api.get(
      `/portfolio/getAllPortfolio?${getParamString(payload)}`
    );

    return (await response).data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function updatePortfolio(formData: FormData, id: string) {
  try {
    const response = api.put(`/portfolio/updatePortfolio/${id}`, formData);

    return (await response).data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function deletePortfolio(id: string) {
  try {
    const response = api.delete(`/portfolio/deletePortfolio/${id}`);

    return (await response).data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
