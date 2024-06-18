import { useQuery } from "@tanstack/react-query";
import { CustomError } from "../models/customError";
import { api } from "../services/axios";
import { fatecoins } from "../models/fatecoins.ts";

export const useGetFatecoins = (idCliente: number) => {
    return useQuery<fatecoins, CustomError>({
        queryKey: ["fatecoins"],
        queryFn: async () => {
            const { data } = await api.get(`fatecoins/get/cliente/${idCliente}`);
            return data;
        }
    });
};