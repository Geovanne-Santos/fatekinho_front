import { useEffect, useState } from "react";
import { Carregando } from "../../components/Carregando";
import "./input.css"
import "./output.css"
import "./scroll.css"
import { RoosterFightLogica } from "./main-script";
import mascote from "../../assets/mascote.svg";
import coin from "../../assets/coin.svg";
import red from "../../assets/rooster-img/red.png";
import blue from "../../assets/rooster-img/blue.png";
import cloudFight from "../../assets/cloud-fight.gif";
import redWin from "../../assets/rooster-img/red-win.png";
import blueWin from "../../assets/rooster-img/blue-win.png";
import bgRinha1 from "../../assets/arenas/background_rinha_1.png";
import bgVersus from "../../assets/arenas/background_versus.png";
import { Link } from "react-router-dom";
import { Game } from "./classes/Game";
import { showAlert } from "./utils";

export function RoosterFight() {
    const [carregando, setCarregando] = useState(true)
    const [value, setValue] = useState(1.00)
    let declarado = false
    useEffect(() => {
        if (!declarado) {
            declarado = true
            setTimeout(function () {
                console.log(1)
                setCarregando(false)
                RoosterFightLogica()
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
    const MaisMenosBotao = (mais) => {
        let total = parseFloat(value)
        if (mais) total += 1
        else if (!mais && (value - 1) < 1) return showAlert(
            `O valor mínimo para aposta é ${Game.RULES.MINIMUM_VALUE_TO_BET}.`
        );
        else total -= 1

        setValue(total.toFixed(2))
    }

    return (
        <>
            {carregando && <Carregando />}
            <div id="app" className="w-full min-h-screen">

                <header
                    className="p-1 px-4 bg-slate-800 flex justify-between border border-b border-slate-700"
                >

                    <a
                        className="text-primary text-4xl flex items-center gap-2 hover:animate-pulse"
                        href="#"
                    >
                        <img src={mascote} alt="" className="size-12 min-w-12" />
                        <span className="hidden md:inline-block">Rinha de Galo</span>
                    </a>
                    <div className="flex gap-2 items-center justify-center">
                        <Link to="/game/rooster-fight/como-jogar">
                            <a
                                className="bg-secondary flex py-0.5 px-3 items-center gap-1 justify-center rounded-full"
                                title="Clique aqui para saber como jogar o jogo"

                            >

                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="text-gray-800" className="size-5">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM8.94 6.94a.75.75 0 1 1-1.061-1.061 3 3 0 1 1 2.871 5.026v.345a.75.75 0 0 1-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 1 0 8.94 6.94ZM10 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
                                </svg>

                                <span className="hidden sm:inline-block text-gray-800">Como jogar?</span>
                            </a>
                        </Link>
                        <div
                            className="flex gap-2 items-center justify-center py-0.5 px-3 bg-slate-900 border-slate-700 border rounded-full text-white"
                        >
                            <span>
                                <img
                                    src={coin}
                                    alt="fatecoins"
                                    className="size-6 min-w-6"
                                />
                            </span>
                            <span id="player-money">0.00</span>
                        </div>
                    </div>
                </header>

                <main className="w-full flex items-center justify-center">

                    <div
                        className="max-w-5xl flex flex-col w-full items-center justify-center p-2 gap-3"
                    >
                        <h3 className="text-3xl font-bold text-white" data-title>
                            Quem ganha essa briga?
                        </h3>

                        <div
                            className="relative versus-background p-10 bg-cover bg-no-repeat w-[640px] h-[480px] rounded shadow-lg border border-slate-700"
                            data-arena
                        >
                            <div
                                className="mt-20 flex gap-2 items-center"
                                data-rooster-choose-container
                            >

                                <label
                                    className="group cursor-pointer w-80 h-60 rounded-l-2xl flex flex-col gap-2 p-2 items-center hover:scale-105 transition-all ease-in-out has-[:checked]:scale-95"
                                    data-rooster="red"
                                >
                                    <input
                                        type="checkbox"
                                        name="rooster"
                                        id=""
                                        className="hidden"
                                        value="red"
                                    />

                                    <div className="relative size-40 min-w-40">
                                        <img
                                            src={red}
                                            alt="Galo vermelho"
                                            className="absolute top-0 right-0 size-40 blur-xl group-has-[:checked]:opacity-100 opacity-0 object-contain move-rooster"
                                        />
                                        <img
                                            src={red}
                                            alt="Galo vermelho"
                                            className="absolute top-0 right-0 size-40 inline-block object-contain move-rooster"
                                        />
                                    </div>
                                    <div
                                        className="rounded-full bg-slate-700 border border-slate-800 px-8 py-1"
                                    >
                                        <span className="text-white">Ataliba</span>
                                    </div>
                                </label>




                                <label
                                    className="group cursor-pointer w-80 h-60 rounded-r-2xl flex flex-col gap-2 p-2 items-center hover:scale-105 transition-all ease-in-out shadow-none has-[:checked]:scale-95"
                                    data-rooster="blue"
                                >
                                    <input
                                        type="checkbox"
                                        name="rooster"
                                        id=""
                                        className="hidden"
                                        value="blue"
                                    />
                                    <div className="relative size-40 min-w-40">
                                        <img
                                            src={blue}
                                            alt="Galo azul"
                                            className="absolute top-0 right-0 size-40 blur-xl group-has-[:checked]:opacity-100 opacity-0 flip-horizontally object-contain move-rooster"
                                        />
                                        <img
                                            src={blue}
                                            alt="Galo azul"
                                            className="absolute top-0 right-0 size-40 inline-block flip-horizontally object-contain move-rooster"
                                        />
                                    </div>

                                    <div
                                        className="rounded-full bg-slate-700 border border-slate-800 px-8 py-1"
                                    >
                                        <span className="text-white">Frango da Sadia</span>
                                    </div>
                                </label>
                            </div>


                            <div
                                className="absolute w-full h-[1px] bottom-0 left-0 hidden"
                                data-rooster-fight-container
                            >
                                <img
                                    src={red}
                                    data-rooster-fight-rooster="red"
                                    className="absolute w-40 h-40 object-contain left-1 bottom-2 hidden"
                                    alt=""
                                />

                                <img
                                    src={blue}
                                    data-rooster-fight-rooster="blue"
                                    className="absolute w-40 h-40 object-contain flip-horizontally right-1 bottom-2 hidden"
                                    alt=""
                                />

                                <img
                                    src={cloudFight}
                                    data-rooster-fight-cloud
                                    alt=""
                                    className="absolute w-80 min-h-80 object-contain left-1/4 -bottom-16 hidden"
                                />
                                <img
                                    src={blueWin}
                                    alt="O Galo Vermelho ganhou a luta"
                                    data-rooster-winner="blue"
                                    className="absolute h-40 object-contain left-[20%] bottom-2 hidden flip-horizontally"
                                />
                                <img
                                    src={redWin}
                                    data-rooster-winner="red"
                                    alt="O Galo Azul ganhou a luta"
                                    className="absolute h-40 object-contain left-[20%] bottom-2 hidden"
                                />
                            </div>
                        </div>
                        <div
                            className="p-3 flex flex-col gap-4 justify-center items-center w-full text-white bg-gray-800 border border-gray-700 rounded-xl"
                        >
                            <div className="text-gray-400 text-sm">
                                <p data-bet-hint>Escolha um dos galos antes de fazer a aposta</p>
                            </div>

                            <fieldset
                                className="group flex gap-8 flex-col-reverse sm:flex-row items-center"
                                data-bet-fieldset
                            >
                                <div
                                    className="grid grid-cols-2 gap-1 w-full sm:w-40 group-disabled:opacity-50"
                                >
                                    <label
                                        className="flex items-center justify-center w-full col-span-2 bg-gray-950 rounded-full border border-gray-700"
                                    >
                                        <input
                                            type="number"
                                            value={value}
                                            onChange={(e) => formatarCampo(e.target.value)}
                                            step=".01"
                                            min="0.01"
                                            name=""
                                            defaultValue={1}
                                            data-bet-value
                                            className="pl-6 w-full flex text-center text-xl bg-transparent border-none outline-none appearance-none"
                                        />
                                        <div className="flex gap-1 px-2">
                                            <button
                                                type="button"
                                             
                                                id="plus-one-btn"
                                                className="flex items-center justify-center bg-gray-500 text-gray-800 rounded-full hover:brightness-125 hover:scale-105"
                                                onClick={() => MaisMenosBotao(true)}
                                            >

                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                                                    <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                                                </svg>
                                            </button>
                                            <button
                                                type="button"
                                          
                                                className="flex items-center justify-center bg-gray-500 text-gray-800 rounded-full hover:brightness-125 hover:scale-105"
                                                onClick={() => MaisMenosBotao()}
                                            >

                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                                                    <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </label>
                                    <button
                                        type="button"
                                        data-button-update-bet="5"
                                        className="flex place-content-center text-xs rounded-full bg-gray-700 border border-gray-600 p-0.5"
                                    >
                                        +5
                                    </button>
                                    <button
                                        type="button"
                                        data-button-update-bet="10"
                                        className="flex place-content-center text-xs rounded-full bg-gray-700 border border-gray-600 p-0.5"
                                    >
                                        +10
                                    </button>
                                    <button
                                        type="button"
                                        data-button-update-bet="20"
                                        className="flex place-content-center text-xs rounded-full bg-gray-700 border border-gray-600 p-0.5"
                                    >
                                        +20
                                    </button>
                                    <button
                                        type="button"
                                        data-button-update-bet="100"
                                        className="flex place-content-center text-xs rounded-full bg-gray-700 border border-gray-600 p-0.5"
                                    >
                                        +100
                                    </button>
                                </div>

                                <button
                                    className="h-24 w-60 rounded-md bet-button flex flex-col items-center justify-center hover:scale-[1.025] active:scale-[0.975] active:shadow-none border border-transparent"
                                    data-bet-button
                                    disabled
                                >
                                    <span className="text-4xl" data-bet-button-title>Apostar</span>
                                    <span
                                        className="text-gray-300 font-bold"
                                        data-bet-button-description
                                    ></span>
                                </button>
                            </fieldset>
                        </div>
                    </div>
                </main>
            </div>

            <div className="invisible opacity-0 hidden">
                <img src={bgRinha1} alt="" />
                <img src={bgVersus} alt="" />
            </div>
        </>
    )
}