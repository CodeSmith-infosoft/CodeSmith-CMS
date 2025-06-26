import api from "..";

export async function addMarketPlace(formData: FormData) {
  try {
    const response = api.post(`/media/admin/addMarketPlace`, formData);

    return (await response).data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getMarketPlace() {
  try {
    const response = api.get(`/media/getMarketPlace`);

    return (await response).data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function updateMarketPlace(formData: FormData, id: string) {
  try {
    const response = api.put(`/media/admin/updateMarketPlace/${id}`, formData);

    return (await response).data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function deleteMarketPlace(id: string) {
  try {
    const response = api.delete(`/media/admin/deleteMarketPlace/${id}`);

    return (await response).data;
  } catch (error) {
    console.log(error);
    return error;
  }
}