import { useMutation, useQuery } from "@tanstack/react-query";
import { CustomError } from "../models/customError";
import { api } from "../services/axios";
import { fatecoins } from "../models/fatecoins.ts";

export const useGetFatecoins = (idCliente: number) => {
    return useQuery<fatecoins, CustomError>({
        queryKey: ["fatecoins"],
        queryFn: async () => {
            const { data } = await api.get(`fatecoins/get/cliente/${idCliente}`);
            return data;
        }, enabled: idCliente != 0
       
    });
};

export const useSalvarQtdeCoin = () => {
    return useMutation<fatecoins, CustomError, fatecoins>({
        mutationFn: async (coin) => {
            const { data } = await api.put(`fatecoins/update/${coin.idCliente}`, coin);
            return data;
        }
    });
};