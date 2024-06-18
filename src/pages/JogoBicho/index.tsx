import { useEffect, useState } from "react";
import { Container } from "../../components/Container";
import { bichos, modalidades } from "./objetos";
import { Label } from "../../components/Label";
import { AnimalComponente } from "../../components/AnimalComponente";
import { useGetApostas, useSalvarAposta } from "../../api/controllers/jogo-bicho";
import { Carregando } from "../../components/Carregando";
import { useDispatch, useSelector } from "react-redux";
import { getCoins, setCoins } from "../../features/auth/fatecoins";

export function JogoBicho() {
    const [modalidade, setModalidade] = useState({ id: 1, nome: "Grupo", tipo: 1, itensMaximo: 10, quebra: /./g, minimoSelecionado: 1 })
    const { mutate, isSuccess } = useSalvarAposta()
    const { data, refetch, isLoading } = useGetApostas(1)
    const [itens, setItens] = useState<number[]>([])
    const [valor, setValor] = useState(0)
    const [carregando, setCarregando] = useState(false)
    const dispatch = useDispatch();
    const coins = useSelector(getCoins);

    useEffect(() => {
        if(isSuccess){
            dispatch(setCoins(coins - valor))
            setModalidade({ id: 1, nome: "Grupo", tipo: 1, itensMaximo: 10, quebra: /./g, minimoSelecionado: 1 })
            setValor(0)
            setItens([])
            refetch()
            setCarregando(false)
        }
    }, [isSuccess]);

    useEffect(() => {
        setItens([])
    }, [modalidade]);

    const selecionarItens = (numeroAnimal: number) => {
        console.log(itens)
        if (itens.find((i) => i == numeroAnimal)) setItens(l => l.filter(item => item != numeroAnimal));
        else if (itens.length == modalidade.itensMaximo) {
            setItens([...itens.slice(1, itens.length), numeroAnimal])

        } else setItens([...itens, numeroAnimal]);
        
    }
    const selecionarItensInput = (value: string) => {
        let itensInt: number[] = []
        value.match(modalidade?.quebra)?.map(v => itensInt.push(parseInt(v)))
        if (!itensInt.includes(NaN)) setItens(itensInt)
    }

    const formatarMoeda = (valor: string) => {
        setValor(parseFloat(valor) ? parseFloat(valor) : 0)
    }

    const AdicionarAposta = () => {
        if (valor >= 1 && 
            ((modalidade.tipo == 1 && itens.length >= modalidade.minimoSelecionado) ||
            (modalidade.tipo == 2 && itens[0] && itens[0]?.toString().length == modalidade.minimoSelecionado))
        ) {
            setCarregando(true)
            mutate({
                id: 0,
                valor: valor,
                tipo: modalidade.tipo,
                jogo: itens.join(";"),
                idCliente: 1,
                modalidade: modalidade.id,
                dataCadastro: new Date(),
                ganho: 0,
                finalizada: false
            })
        }
    }
    return (
        <>
            <Container titulo="Jogo do bicho">
                {(isLoading || carregando) && <Carregando />}
                <div className="grid grid-cols-9 gap-4 w-full sm:space-x-4">
                    <div className="col-span-6 w-full pt-4 pr-20">
                        <Label texto={modalidades.find((m) => m.id == modalidade.id) ? modalidades.find((m) => m.id == modalidade.id)?.nome : ""} textoGrifado="Escolha a modalidade:" classes="mb-5" />
                        <br />
                        {modalidades.map((m) => {
                            return (
                                <button
                                    type="button"
                                    className={` ${modalidade.id == m.id ? "text-[#1E1E1E] bg-[#FAF755]" : "text-white bg-[#090F15]"} 
                            font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2`}
                                    onClick={() => setModalidade(modalidade.id == m.id ? modalidades[0] : m)}>
                                    {m.nome}
                                </button>
                            )
                        })}
                        <br />
                        <Label textoGrifado={modalidade.tipo == 1 ? "Escolha seu grupo" : "Insira seu jogo"} classes="mt-8 mb-5" /><br />
                        {modalidade.tipo == 1 ?
                            <div className="grid gap-x-20 gap-y-4 grid-cols-4">
                                {bichos.map((b) => {
                                    return (
                                        <AnimalComponente bicho={b} selecionarItens={() => selecionarItens(b.numero)} itens={itens} />
                                    )
                                })}
                            </div> :
                            <input type="email" id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                maxLength={modalidade.itensMaximo}
                                onChange={(e) => selecionarItensInput(e.target.value)}
                                value={itens.join("")}
                            />
                        }
                        <Label textoGrifado="Insira o valor da aposta" classes="mt-10 mb-5" /><br />
                        <label className="relative text-gray-400 block ">
                            <div className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 left-3 items-center text-center flex">
                                F
                            </div>
                            <input onChange={(e) => formatarMoeda(e.target.value)}
                                value={valor.toString().replace(".", ",")}
                                type="text" name="email" id="email" placeholder="email@kemuscorp.com" className="text-left form-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg py-3 px-4 appearance-none w-full block pl-14 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:bg-gray-700" />
                        </label>

                        <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center rounded-lg bg-[#FAF753] text-[#1E1E1E] mt-12 disabled:bg-[#090F15] disabled:text-white"
                            disabled={!(valor >= 1 && 
                                ((modalidade.tipo == 1 && itens.length >= modalidade.minimoSelecionado) ||
                                (modalidade.tipo == 2 && itens[0] && itens[0]?.toString().length == modalidade.minimoSelecionado))
                            )}
                            onClick={() => {
                                AdicionarAposta()
                            }}>
                            Adicionar jogo

                        </button>
                    </div>
                    <div className="col-span-3 w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <Label textoGrifado="Apostas" classes="mb-5" personalizado="text-gray-200" tamanho="2xl" />
                        {data && data?.map((a) => {
                            return (
                                <div className={` ${a.finalizada ? (a.ganho > 0 ? "bg-[#5EEB21]" : "bg-[#EB2621]") : "bg-gray-500"} bg-opacity-25 rounded-lg mb-3 p-5`}>
                                    <Label texto={a.jogo.split(";").toString()} textoGrifado="Aposta:" classes="mb-1" personalizado="text-gray-200" />
                                    <br />
                                    <Label texto={modalidades.find(m => m.id == a.modalidade)?.nome} textoGrifado="Modalidade:" classes="mb-1" personalizado="text-gray-200" />
                                    <br />
                                    <Label texto={`R$ ${a.valor.toString().replace(".", ",")}`} textoGrifado="Valor:" classes="mb-5" personalizado="text-gray-200" />
                                    <br />
                                    <Label texto={a.finalizada ? (a.ganho == 0 ? "Perdeu" : "Ganhou") : "Não divulgado ainda"} textoGrifado="Resultado:" classes=""
                                        personalizado="text-white" tamanho="lg" />
                                    <br />
                                    {a.finalizada && a.ganho > 0 && <><Label texto={`R$ ${a.ganho.toString().replace(".", ",")}`} textoGrifado="Ganho:" classes="mt-1"
                                        personalizado="text-white" tamanho="lg"
                                    /><br /></>}
                                    {a?.dataCadastroSorteio && <Label texto={new Date(a.dataCadastroSorteio).toLocaleDateString("pt-BR")} textoGrifado="Data do Sorteio:" classes="" tamanho="sm" />}

                                </div>
                            )
                        })}
                    </div>
                </div>


            </Container>
        </>
    )
}