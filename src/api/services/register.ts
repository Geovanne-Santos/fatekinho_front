import { api } from "./axios"

export const register = async (body: any) => {
    const response = await api.post("/usuario/insert", body);
    return response;
}