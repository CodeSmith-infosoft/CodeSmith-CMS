import { getProductType } from "@/types/productDataTypes";
import api from "..";
import { getParamString } from "@/utils/helper";

export async function addSingleProduct(formData: FormData) {
  try {
    const response = api.post(`/product/admin/addSingleProduct`, formData, {
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

export async function uploadBulkProductsFile(formData: FormData) {
  try {
    const response = api.post(`/product/uploadBulkProductsFile`, formData, {
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

export async function updateProduct(formData: FormData, id: string) {
  try {
    const response = api.put(`/product/admin/updateProduct/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function deleteProduct(id: string) {
  try {
    const response = api.delete(`/product/admin/deleteProduct/${id}`);

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function getAllProductsList(payload: getProductType) {
  try {
    const response = api.get(
      `/product/admin/getAllProductsList?${getParamString(payload)}`
    );

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function getProductByID(id: string) {
  try {
    const response = api.get(`/product/getProduct?productId=${id}`);

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function toggleActiveStateById(
  id: string,
  status: boolean,
  name: string
) {
  try {
    const response = api.put(`/product/admin/toggleActiveStateById/${id}`, {
      [name]: status,
    });

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function getPopularProductList() {
  try {
    const response = api.get(`/product/getPopularProductList?`);

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}
