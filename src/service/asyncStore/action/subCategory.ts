import { subCategoryPayloadType } from "@/types/caseStudyTypes";
import api from "..";
import { getParamString } from "@/utils/helper";

export async function getSubCategoryList(payload: subCategoryPayloadType) {
  try {
    const response = api.get(
      `/subCategory/getSubCategoryList?${getParamString(payload)}`
    );

    return (await response).data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getActiveSubCategoryList() {
  try {
    const response = api.get(`/subCategory/getActiveSubCategoryList`);

    return (await response).data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function inActiveSubcategory(id: string, isActive: boolean) {
  try {
    const response = api.put(`/subCategory/admin/inActiveSubcategory/${id}`, {
      isActive,
    });

    return (await response).data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function addSubCategory(payload: {name: string, categoryId?: string}) {
  try {
    const response = api.post(`/subCategory/admin/addSubCategory`, payload);

    return (await response).data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function updateSubCategory(payload: {name: string, categoryId?: string}, id: string) {
  try {
    const response = api.put(`/subCategory/admin/updateSubCategory/${id}`, payload);

    return (await response).data;
  } catch (error) {
    console.log(error);
    return error;
  }
}