import api from "..";
import { getParamString } from "@/utils/helper";
import { getBlogPayloadType } from "@/types/blogTypes";

export async function getAllTestimonial(payload: getBlogPayloadType) {
  try {
    const response = api.get(`/testimonials/getAllTestimonials?${getParamString(payload)}`);

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function getTestimonialById(id: string) {
  try {
    const response = api.get(`/testimonials/getTestimonial/${id}`);

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function addTestimonial(payload: FormData) {
  try {
    const response = api.post(`/testimonials/addTestimonials`, payload);

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function updateTestimonial(payload: FormData, id: string) {
  try {
    const response = api.put(`/testimonials/updateTestimonials/${id}`, payload);

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function deleteTestimonial(id: string) {
  try {
    const response = api.delete(`/testimonials/deleteTestimonials/${id}`);
    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}
