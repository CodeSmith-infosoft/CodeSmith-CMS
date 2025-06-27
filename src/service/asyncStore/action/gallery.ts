import api from "..";

export async function addBanner(payload: FormData) {
  try {
    const response = api.post(`/gallery/addGallery`, payload);

    return (await response).data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getAllBanner() {
  try {
    const response = api.get(`/gallery/getAllGallery`);

    return (await response).data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function deleteBanner(id: string) {
  try {
    const response = api.delete(`/gallery/deleteGallery/${id}`);

    return (await response).data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
