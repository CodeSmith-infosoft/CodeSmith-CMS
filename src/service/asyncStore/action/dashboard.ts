import api from "..";

export async function addHomeBanner(payload: FormData) {
  try {
    const response = api.post(`/home/addHomeBanner`, payload);

    return (await response).data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function addEnterpriseLogo(payload: FormData) {
  try {
    const response = api.post(`/enterprise/addEnterpriseLogo`, payload);

    return (await response).data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getAllHomeBanner() {
  try {
    const response = api.get(`/home/getAllHomeBanner`);

    return (await response).data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function deleteHomeBanner(id: string) {
  try {
    const response = api.delete(`/home/deleteHomeBanner/${id}`);

    return (await response).data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getAllEnterpriseLogo() {
  try {
    const response = api.get(`/enterprise/getAllEnterpriseLogo`);

    return (await response).data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function deleteEnterpriseLogo(id: string) {
  try {
    const response = api.delete(`/enterprise/deleteEnterpriseLogo/${id}`);

    return (await response).data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
