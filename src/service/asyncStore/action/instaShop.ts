import api from "..";

export async function addInstaShop(formData: FormData) {
  try {
    const response = api.post(`/media/admin/addInstaShop`, formData);

    return (await response).data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getAllInstaShop() {
  try {
    const response = api.get(`/media/getAllInstaShop`);

    return (await response).data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function updateInstaShop(formData: FormData, id: string) {
  try {
    const response = api.put(`/media/admin/updateInstaShop/${id}`, formData);

    return (await response).data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function deleteInstaShop(id: string) {
  try {
    const response = api.delete(`/media/admin/deleteInstaShop/${id}`);

    return (await response).data;
  } catch (error) {
    console.log(error);
    return error;
  }
}