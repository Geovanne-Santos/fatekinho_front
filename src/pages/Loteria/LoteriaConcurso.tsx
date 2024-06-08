import { useEffect } from "react";
import { useGetConcursos, useGetLoterias } from "../../api/controllers/loteria";
import { Container } from "../../components/Container";
import { useParams } from "react-router-dom";
import { LoteriaDezena } from "../../components/LoteriaDezena";
import { BotaoLink } from "../../components/BotaoLink";
import { Carregando } from "../../components/Carregando";

export function LoteriaConcurso() {
    const { concurso } = useParams();
    const { data, isLoading } = useGetConcursos(concurso || "");

    useEffect(() => {
        console.log(concurso)
    }, [concurso]);
    return (
        <Container titulo="Loterias">
            {!isLoading && data && data?.length > 0 ? 
                <>
                    <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mb-10">
                        <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Último jogo</h5>
                        <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse mb-3">
                            <p className="dark:text-gray-400 w-full sm:w-auto bg-gray-800 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5"><b className="pr-1">Concurso: </b> {data[0].concurso}</p>
                            <p className="dark:text-gray-400 w-full sm:w-auto bg-gray-800 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5"><b className="pr-1">Data: </b> {data[0].data}</p>
                        </div>

                        <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse mb-5">
                            {data[0].dezenas.map(d => {
                                return (
                                    <LoteriaDezena tamanho={{x: 2.5, y: 2}} dezena={d} />
                                )
                            })}
                        </div>
                        {data[0].acumulou && <p className="dark:text-gray-400 w-full sm:w-auto bg-gray-800 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 mb-5">
                            <b className="pr-1">Acumulada próximo concurso: </b> {data[0].valorAcumuladoProximoConcurso.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                        </p>}<br />
                        <BotaoLink texto="Ver mais detalhes" link={`/game/loterias/${concurso}/${data[0].concurso}`} />
                    </div>

                    <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full">
                        {data?.map((item, index) => {
                            return (
                                < >
                                    {index != 0 && <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                        <div className="p-5">
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Concurso {item.concurso}</h5>
                                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> {item.data}</p>
                                            <BotaoLink texto="Ver resultado" link={`/game/loterias/${concurso}/${item.concurso}`} />
                                        </div>
                                    </div>}
                                </>
                            )
                        })}
                    </section>
                </> : 
                <Carregando/>
            }
        </Container>

    );
}
