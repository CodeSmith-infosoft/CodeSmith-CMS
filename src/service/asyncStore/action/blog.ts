import api from "..";
import { getParamString } from "@/utils/helper";
import { getBlogPayloadType } from "@/types/blogTypes";

export async function getAllBlog(payload: getBlogPayloadType) {
  try {
    const response = api.get(`/blog/getAllBlog?${getParamString(payload)}`);

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function getBlogById(id: string) {
  try {
    const response = api.get(`/blog/getBlogById/${id}`);

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function addBlog(payload: FormData) {
  try {
    const response = api.post(`/blog/addBlog`, payload);

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function updateBlog(payload: FormData, id: string) {
  try {
    const response = api.put(`/blog/updateBlog/${id}`, payload);

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function deleteBlog(id: string) {
  try {
    const response = api.delete(`/blog/deleteBlog/${id}`);

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}
