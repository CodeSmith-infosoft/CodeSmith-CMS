import { getAllHireOurDevelopersType } from "@/types/hireDevTypes";
import api from "..";
import { getParamString } from "@/utils/helper";

export async function addHireOurDeveloper(formData: FormData) {
  try {
    const response = api.post(`/hireDeveloper/addHireOurDeveloper`, formData, {
      headers: {
        // 'Content-Type': 'multipart/form-data'
      },
    });

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function updateHireOurDevelopers(formData: FormData, id: string) {
  try {
    const response = api.put(
      `/hireDeveloper/updateHireOurDevelopers/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function deleteHireOurDevelopers(id: string) {
  try {
    const response = api.delete(`/hireDeveloper/deleteHireOurDevelopers/${id}`);

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function getAllHireOurDevelopers(
  payload: getAllHireOurDevelopersType
) {
  try {
    const response = api.get(
      `/hireDeveloper/getAllHireOurDevelopers?${getParamString(payload)}`
    );

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function getHireOurDeveloper(id: string) {
  try {
    const response = api.get(`/hireDeveloper/getHireOurDeveloper/${id}`);

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}
