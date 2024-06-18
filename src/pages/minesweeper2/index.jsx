import { useEffect, useState } from "react";
import { Carregando } from "../../components/Carregando";
import { Game } from "./classes/game";
import { MineSweeperLogica } from "./main-script";
import "./input.css"
import "./output.css"
import "./scroll.css"
import mascote from "../../assets/mascote.svg";
import coin from "../../assets/coin.svg";
import { Link } from "react-router-dom";

export function MineSweeper() {
    const [carregando, setCarregando] = useState(true)
    const [value, setValue] = useState(1.00)
    let declarado = false
    useEffect(() => {
        if (!declarado) {
            declarado = true
            setTimeout(function () {
                console.log(1)
                setCarregando(false)
                MineSweeperLogica()
            }, 1000);
        }

    }, []);

    const formatarCampo = (v) => {
        let nv = v.toString() ? v.toString() : v
        console.log(typeof v, v)
        if (nv.includes(".")) {
            nv = nv.replace(".", "")
            nv = nv.substr(0, nv.length - 2) + "." + nv.substr(nv.length - 2, nv.length - 1)
        }
        else {
            nv = nv.substr(0, nv.length - 1) + "." + nv.substr(nv.length - 1, nv.length - 1) + "0"
        }

        let valor = parseFloat(nv)
        setValue(valor)

    }

    return (
        <>
            {carregando && <Carregando />}
            <div id="app" className="bg-background w-full min-h-screen mt-20">
                <header
                    className="p-1 px-4 bg-slate-800 flex justify-between border border-b border-slate-700"
                >
                    <a
                        className="text-primary text-4xl flex items-center gap-2 hover:animate-pulse"
                        href="#"
                    >
                        <img src={mascote} alt="" className="size-12 min-w-12" />
                        <span className="hidden sm:inline-block">Mini Blaze</span>
                    </a>


                    <div className="flex gap-2 items-center justify-center text-gray-800">
                        <Link to="/game/minesweeper/como-jogar">
                            <a
                                className="bg-secondary flex py-0.5 px-3 items-center gap-1 justify-center rounded-full"
                                title="Clique aqui para saber como jogar o jogo"

                            >

                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM8.94 6.94a.75.75 0 1 1-1.061-1.061 3 3 0 1 1 2.871 5.026v.345a.75.75 0 0 1-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 1 0 8.94 6.94ZM10 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
                                </svg>

                                <span className="hidden sm:inline-block">Como jogar?</span>
                            </a>
                        </Link>
                        <div
                            className="flex gap-2 items-center justify-center py-0.5 px-3 bg-slate-900 border-slate-700 border rounded-full text-white"
                        >
                            <span>
                                <img src={coin} alt="fatecoins" className="size-6" />
                            </span>
                            <span id="player-money">0.00</span>
                        </div>
                    </div>
                </header>


                <main className="w-full flex items-center justify-center">

                    <div
                        className="max-w-5xl flex flex-col md:flex-row w-full items-stretch justify-center p-2 gap-3"
                    >

                        <aside
                            className="basis-1/3 text-white bg-gray-800 border border-gray-700 rounded-2xl"
                        >
                            <form className="flex flex-col gap-8 w-full">
                                <fieldset
                                    className="group p-3 flex flex-col gap-4 justify-center items-center w-full"
                                >
                                    <p className="text-gray-400 text-sm">
                                        <span id="game-hint">Faça a sua aposta abaixo</span>
                                    </p>

                                    <div className="flex flex-col gap-4 w-full max-w-md md:max-w-full">
                                        <div className="flex gap-2 items-end w-full">

                                            <label className="relative flex flex-col gap-1 w-full">
                                                <span className="text-slate-300 font-semibold">
                                                    Valor da aposta
                                                </span>
                                                <input
                                                    type="number"
                                                    value={value}
                                                    onChange={(e) => formatarCampo(e.target.value)}
                                                    step=".01"
                                                    min="0.01"
                                                    name="bet-value"
                                                    id="bet-value"
                                                    className="px-2 h-9 rounded border border-slate-600 bg-slate-800 outline-none shadow-md disabled:text-gray-400"
                                                />
                                                <span
                                                    className="absolute bottom-2 right-3 text-sm text-slate-500 font-bold pointer-events-none"
                                                >
                                                    R$
                                                </span>
                                            </label>
                                            <button
                                                type="button"
                                                className="flex flex-col items-center justify-center bg-slate-700 border-slate-600 text-xl size-9 min-w-9 border rounded disabled:cursor-not-allowed disabled:opacity-70"
                                                data-button-update-bet="half"
                                            >
                                                ½
                                            </button>
                                            <button
                                                type="button"
                                                className="flex flex-col items-center justify-center bg-slate-700 border-slate-600 size-9 min-w-9 border rounded disabled:cursor-not-allowed disabled:opacity-70"
                                                data-button-update-bet="double"
                                            >
                                                2x
                                            </button>
                                        </div>

                                        <div className="flex gap-2 w-full items-end">

                                            <div className="flex flex-col gap-1 w-full">
                                                <span className="text-slate-300 text-sm">Bombas 💣</span>
                                                <div className="w-full relative">
                                                    <select
                                                        name="bombs-quantity"
                                                        id="bombs-quantity"
                                                        className="w-full p-1 px-2 rounded border border-slate-700 bg-slate-700 hover:bg-slate-600 disabled:hover:bg-slate-700 focus:outline-none focus:ring focus:ring-slate-300/50 appearance-none peer"
                                                        title="Selecione a quantidade de bombas da partida"
                                                    >
                                                        <option value="10" selected>10</option>
                                                        <option value="15">15</option>
                                                        <option value="20">20</option>
                                                        <option value="25">25</option>
                                                    </select>


                                                    <span className="absolute right-1.5 top-[7px] pointer-events-none text-slate-200 peer-disabled:text-slate-500">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                            <path fillRule="evenodd" d="M10.53 3.47a.75.75 0 0 0-1.06 0L6.22 6.72a.75.75 0 0 0 1.06 1.06L10 5.06l2.72 2.72a.75.75 0 1 0 1.06-1.06l-3.25-3.25Zm-4.31 9.81 3.25 3.25a.75.75 0 0 0 1.06 0l3.25-3.25a.75.75 0 1 0-1.06-1.06L10 14.94l-2.72-2.72a.75.75 0 0 0-1.06 1.06Z" clipRule="evenodd" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>


                                            <div className="flex flex-col gap-1 w-full">
                                                <span className="text-slate-300 text-sm flex gap-2">
                                                    Gemas

                                                    <div
                                                        className="inline-block relative w-4 h-4 translate-y-px"
                                                    >
                                                        <img
                                                            src="./assets/diamonds/cyan.png"
                                                            data-diamond-img
                                                            alt="Diamante"
                                                            className="absolute top-0 right-0 w-4 h-4 blur-[3px]"
                                                        />
                                                        <img
                                                            data-diamond-img
                                                            src="./assets/diamonds/cyan.png"
                                                            alt="Diamante"
                                                            className="absolute top-0 right-0 w-4 h-4 inline-block"
                                                        />
                                                    </div>
                                                </span>
                                                <div
                                                    className="p-1 px-2 rounded border border-slate-700 bg-slate-700"
                                                >
                                                    <span id="diamonds-quantity">26</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-4 my-4">
                                            <div className="flex gap-2 w-full">

                                                <div className="flex flex-col gap-1 w-full">
                                                    <span className="text-slate-300 text-xs">
                                                        Multiplicador Atual
                                                    </span>
                                                    <div
                                                        className="p-1 px-2 rounded border border-slate-700 bg-slate-700"
                                                        data-multiplier-now
                                                    >
                                                        &nbsp;

                                                    </div>
                                                </div>


                                                <div className="flex flex-col gap-1 w-full">
                                                    <span className="text-slate-300 text-xs">
                                                        Próximo Multiplicador
                                                    </span>
                                                    <div
                                                        className="p-1 px-2 rounded border border-slate-700 bg-slate-700"
                                                    >
                                                        <span data-multiplier-next>&nbsp;</span>


                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-1 w-full">
                                                <span className="text-slate-300 text-sm">
                                                    Ganhos totais

                                                    <span data-multiplier-label>&nbsp;</span>
                                                </span>
                                                <div
                                                    className="p-1 px-2 rounded border border-slate-700 bg-slate-700"
                                                    data-multiplier-total-value
                                                >
                                                    &nbsp;

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        id="bet-button"
                                        className="w-full bg-primary py-4 text-xl font-bold rounded-md border-primary-dark border shadow-md shadow-primary/50 hover:bg-primary-dark hover:scale-105 transition duration-150 ease-in-out disabled:hover:scale-100 disabled:bg-primary-dark disabled:opacity-50"
                                    >
                                        Apostar (Novo Jogo)
                                    </button>
                                </fieldset>
                            </form>
                        </aside>

                        <div
                            className="p-2 overflow-hidden bg-gray-950 border-gray-700 border rounded-2xl min-h-96 w-full text-white flex items-center justify-center flex-col gap-2"
                        >
                            <div className="overflow-auto p-4 px-8 w-full">
                                <div
                                    className="grid grid-cols-6 grid-rows-6 gap-2 max-w-fit min-w-max mx-auto my-0"
                                    id="grid"
                                    data-disabled="false"
                                ></div>
                            </div>
                        </div>
                    </div>
                </main>
                <div id="diamond-cache" className="hidden invisible">
                    <div className="diamond"></div>
                    <img src="./assets/bomb.png" alt="bomba" />
                </div>
            </div>
        </>
    )
}