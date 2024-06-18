import { api } from "./axios"

export const login = async (body: any) => {
    const response = await api.post("/usuario/login", body);
    console.log(response.data)
    return response.data;
} 