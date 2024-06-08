import { useQuery } from "@tanstack/react-query";
import { CustomError } from "../models/customError";
import { api } from "../services/axios";
import { loteria, loteriaResultadoResponse } from "../models/loteria";

export const useGetLoterias = () => {
    return useQuery<loteria[], CustomError>({
        queryKey: ["loterias"],
        queryFn: async () => {
            const { data } = await api.get("/loteria/");
            return data;
        }
    });
};

export const useGetConcursos = (concurso: string) => {
    return useQuery<loteriaResultadoResponse[], CustomError>({
        queryKey: ["loterias-todos", {concurso}],
        queryFn: async () => {
            const { data } = await api.get("/loteria/todos", {
                params: {
                    tipoLoteria: concurso
                }
            });
            return data;
        }
    });
};

export const useGetConcursoById = (concurso: string, id: string) => {
    return useQuery<loteriaResultadoResponse, CustomError>({
        queryKey: ["loterias-concurso", {concurso, id}],
        queryFn: async () => {
            const { data } = await api.get("/loteria/concurso", {
                params: {
                    tipoLoteria: concurso,
                    tipoConcurso: id
                }
            });
            return data;
        }
    });
};

export const useGetLoteriaByCodigo = (codigo: string) => {
    return useQuery<loteria, CustomError>({
        queryKey: ["loteria", {codigo}],
        queryFn: async () => {
            const { data } = await api.get("/loteria/obter-por-codigo", {
                params: {
                    codigo: codigo
                }
            });
            return data;
        }
    });
};