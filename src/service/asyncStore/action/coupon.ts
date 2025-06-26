import { addCouponPayloadType, getCouponPayloadType } from "@/types/couponTypes";
import api from "..";
import { getParamString } from "@/utils/helper";

export async function getAllCouponList(payload: getCouponPayloadType) {
  try {
    const response = api.get(`/coupon/getAllCouponList?${getParamString(payload)}`);

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function getCouponById(id: string) {
  try {
    const response = api.get(`/coupon/getCouponById/${id}`);

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function addCoupon(payload: addCouponPayloadType) {
  try {
    const response = api.post(`/coupon/admin/addCoupon`, payload);

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function updateCouponById(payload: addCouponPayloadType, id: string) {
  try {
    const response = api.put(`/coupon/admin/updateCouponById/${id}`, payload);

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}

export async function deleteCouponById(id: string) {
  try {
    const response = api.delete(`/coupon/admin/deleteCouponById/${id}`);

    return (await response).data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}
