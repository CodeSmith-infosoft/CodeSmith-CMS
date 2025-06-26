import api from "..";
import { getParamString } from "@/utils/helper";
import { getBlogPayloadType } from "@/types/blogTypes";

export async function getAllTeam(payload: getBlogPayloadType) {
  try {
    const response = api.get(`/team/getAllTeamMember?${getParamString(payload)}`);

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function getTeamById(id: string) {
  try {
    const response = api.get(`/team/getTeamMemberById/${id}`);

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function addTeam(payload: FormData) {
  try {
    const response = api.post(`/team/addTeamMember`, payload);

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function updateTeam(payload: FormData, id: string) {
  try {
    const response = api.put(`/team/updateTeamMember/${id}`, payload);

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function deleteTeam(id: string) {
  try {
    const response = api.delete(`/team/deleteTeamMember/${id}`);
    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}
