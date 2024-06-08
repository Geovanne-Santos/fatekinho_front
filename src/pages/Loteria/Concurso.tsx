import { useEffect } from "react";
import { useGetConcursoById, useGetConcursos, useGetLoteriaByCodigo, useGetLoterias } from "../../api/controllers/loteria";
import { Container } from "../../components/Container";
import { useParams } from "react-router-dom";
import { LoteriaDezena } from "../../components/LoteriaDezena";
import { BotaoLink } from "../../components/BotaoLink";
import { Carregando } from "../../components/Carregando";

export function Concurso() {
    const { concurso, id } = useParams();
    const { data, isLoading } = useGetConcursoById(concurso || "", id || "");
    const { data: loteria } = useGetLoteriaByCodigo(concurso || "");

    useEffect(() => {
        console.log(concurso, id, data)
    }, [concurso, id]);
    return (
        <Container titulo="Loterias">
            {!isLoading && data ? <>
                <div className="grid grid-cols-9 gap-4 w-full sm:space-x-4">
                    <div className="col-span-5 w-full pt-4 text-center pr-20">
                        <h5 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">{loteria?.nome}</h5>
                        <p className="text-3xl dark:text-gray-400 w-full sm:w-auto rounded-lg inline-flex items-center justify-center mb-4">
                            <b className="pr-1">{data.acumulou ? "Acumulou!" : "Não acumulou"}</b>
                        </p>
                        <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse mb-3">
                            <p className="text-2xl dark:text-gray-400 w-full sm:w-auto rounded-lg inline-flex items-center justify-center px-4 py-2.5"><b className="pr-1">Concurso: </b> {data.concurso}</p>
                            <p className="text-2xl dark:text-gray-400 w-full sm:w-auto rounded-lg inline-flex items-center justify-center px-4 py-2.5"><b className="pr-1">Data: </b> {data.data}</p>
                        </div>
                        <p className="dark:text-gray-400 w-full sm:w-auto rounded-lg inline-flex items-center justify-center mb-16"><b className="pr-1">
                            Sorteio realizado em {data.local}</b>
                        </p><br />

                        <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse mb-8">
                            {data.dezenas?.map(d => {
                                return (
                                    <LoteriaDezena tamanho={{ x: 2.5, y: 2 }} dezena={d} />
                                )
                            })}
                        </div>
                        <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse mb-16">
                            <p className="mr-1">Trevos: </p>
                            {data?.trevos?.map(d => {
                                return (
                                    <LoteriaDezena tamanho={{ x: 3, y: 1 }} dezena={d} />
                                )
                            })}
                        </div>
                        {data.acumulou && <p className="dark:text-gray-400 w-full sm:w-auto rounded-lg inline-flex items-center justify-center mb-2">
                            <b className="pr-1">Acumulada próximo concurso: </b> {data.valorAcumuladoProximoConcurso.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                        </p>}<br />
                        {data.acumulou && <p className="dark:text-gray-400 w-full sm:w-auto rounded-lg inline-flex items-center justify-center mb-5">
                            <b className="pr-1">Estimativa de prêmio do próximo concurso: </b> {data.valorEstimadoProximoConcurso.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                        </p>}<br />
                    </div>

                    <div className="col-span-4 w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <h5 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">Premiação</h5>
                        {data.premiacoes?.map(p => {
                            return (
                                <div className="mb-8">
                                    <p className="dark:text-gray-400 w-full sm:w-auto bg-gray-800 text-white rounded-lg inline-flex items-center justify-center"><b className="pr-1">
                                        {p.descricao}</b>
                                    </p><br />
                                    <p className="dark:text-gray-400 w-full sm:w-auto bg-gray-800 text-white rounded-lg inline-flex items-center justify-center">
                                        {p.ganhadores > 0 ? `${p.ganhadores} ganhadores, ${p.valorPremio.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}` : "Nenhum ganhador"}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </> :
                <Carregando />
            }
        </Container>

    );
}
