import { loginFormDataType } from "@/service/form-schema/login.schema"
import api from ".."

export async function loginAdmin(payload: loginFormDataType) {
    try {
        const response = api.post(`/auth/login`, {...payload})

        return (await response).data
    } catch (error: any) {
        console.log(error)
        return error?.response?.data
    }
}