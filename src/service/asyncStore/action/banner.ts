import api from "..";

export async function addBanner(formData: FormData) {
  try {
    const response = api.post(`/banner/admin/addBanner`, formData);

    return (await response).data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getAllBanner() {
  try {
    const response = api.get(`/banner/getAllBanner`);

    return (await response).data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function updateBannerById(formData: FormData, id: string) {
  try {
    const response = api.put(`/banner/admin/updateBannerById/${id}`, formData);

    return (await response).data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function deleteBannerById(id: string) {
  try {
    const response = api.delete(`/banner/admin/deleteBannerById/${id}`);

    return (await response).data;
  } catch (error) {
    console.log(error);
    return error;
  }
}