import api from "..";

export async function getAllAboutUS(type: string) {
  try {
    const response = api.get(`/about/getAllAboutUS/${type}`);

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}


export async function addAboutUS(payload: FormData) {
  try {
    const response = api.post(`/about/addAboutUS`, payload);

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function deleteAboutUS(id: string) {
  try {
    const response = api.delete(`/about/deleteAboutUS/${id}`);

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}
