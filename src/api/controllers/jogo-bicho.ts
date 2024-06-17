import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../services/axios";
import { CustomError } from "../models/customError";
import { aposta } from "../models/aposta";


export const useGetApostas = (idCliente: number) => {
    return useQuery<aposta[], CustomError>({
        queryKey: ["apostas", {idCliente}],
        queryFn: async () => {
            const { data } = await api.get("/jogo-bicho/apostas", {
                params: {
                    idCliente: idCliente
                }
            });
            return data;
        }
    });
};

export const useSalvarAposta = () => {
    return useMutation<aposta, CustomError, aposta>({
        mutationFn: async (aposta) => {
            const { data } = await api.post("/jogo-bicho/", aposta);
            return data;
        }
    });
};