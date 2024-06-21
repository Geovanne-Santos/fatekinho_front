import { api } from "./axios"

export const login = async (body: any) => {
    const response = await api.post("/usuario/login", body);
    return response.data;
} 