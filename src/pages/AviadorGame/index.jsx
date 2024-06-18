import React, { useEffect, useState } from "react";
import { AviadorLogica } from "./AviadorLogica"
import "./input.css"
import "./output.css"
import "./scroll.css"
import { Carregando } from "../../components/Carregando";
import mascote from "../../assets/mascote.svg";
import coin from "../../assets/coin.svg";
import { Link } from "react-router-dom";
import { showAlert } from "./utils";
import { Game } from "./classes/game";



export function Aviator() {
    const [carregando, setCarregando] = useState(true)
    const [value, setValue] = useState(1.00)
    const [value2, setValue2] = useState(1.00)
    let declarado = false
    useEffect(() => {
        if(!declarado){
            declarado = true
            setTimeout(function () {
                console.log(1)
                setCarregando(false)
                AviadorLogica()
            }, 1000);
        }
        
    }, []);

    const formatarCampo = (v, b) => {
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
        if (b == 1)setValue(valor)
        else setValue2(valor)

    }
    const MaisMenosBotao = (mais, b) => {
        let total = b == 1 ? value : value2
        total = parseFloat(total)
        if (mais) total += 1
        else if (!mais && (total - 1) < 1) return showAlert(
            `O valor mínimo para aposta é ${Game.RULES.MINIMUM_VALUE_TO_BET}.`
        );
        else total -= 1

        total = total.toFixed(2)
        if (b == 1)setValue(total)
        else setValue2(total)
    }

    return (

        <div id="app" className="bg-background w-full min-h-screen">
            {carregando && <Carregando />}
            <header
                className="p-1 px-4 bg-slate-800 flex justify-between border border-b border-slate-700"
            >
                <a
                    className="text-primary text-4xl flex items-center hover:animate-pulse"
                    href="#"
                >
                    <img src={mascote} alt="" className="w-12 h-12" />
                    Aviator
                </a>
                <div className="flex gap-2 items-center justify-center">
                    <Link to="/game/aviator/como-jogar">
                        <a
                            className="bg-secondary flex py-0.5 px-3 items-center gap-1 justify-center rounded-full"
                            title="Clique aqui para saber como jogar o jogo"

                        >

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="text-gray-300" className="w-5 h-5">
                                <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM8.94 6.94a.75.75 0 1 1-1.061-1.061 3 3 0 1 1 2.871 5.026v.345a.75.75 0 0 1-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 1 0 8.94 6.94ZM10 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
                            </svg>

                            <span className="hidden sm:inline-block text-gray-800"> Como jogar? </span>
                        </a>
                    </Link>

                    <div
                        className="flex gap-2 items-center justify-center py-0.5 px-3 bg-slate-900 border-slate-700 border rounded-full text-white"
                    >
                        <span
                        ><img src={coin} alt="fatecoins" className="w-6 h-6"
                            /></span>
                        <span id="player-money">0.00</span>
                    </div>
                </div>
            </header>
            <main className="w-full flex items-center justify-center">

                <div
                    className="max-w-5xl flex flex-col w-full items-center justify-center p-2 gap-3"
                >

                    <div className="flex items-center gap-2 w-full">

                        <button
                            className="flex items-center justify-center py-0.5 px-2 rounded-full text-xs text-gray-500 bg-gray-800 border border-gray-700 hover:brightness-125"
                            title="Limpar o histórico de partidas anteriores"
                            id="clear-last-rounds"
                            type="button"
                        >

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                                <path d="M2 3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3Z" />
                                <path fillRule="evenodd" d="M13 6H3v6a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V6ZM5.72 7.47a.75.75 0 0 1 1.06 0L8 8.69l1.22-1.22a.75.75 0 1 1 1.06 1.06L9.06 9.75l1.22 1.22a.75.75 0 1 1-1.06 1.06L8 10.81l-1.22 1.22a.75.75 0 0 1-1.06-1.06l1.22-1.22-1.22-1.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <ul
                            id="last-rounds-list"
                            className="py-1 overflow-x-auto gap-1.5 flex items-center w-full"
                        >
                            <li>
                                <span className="text-sm text-gray-400 flex items-center gap-2">

                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                                        <path fillRule="evenodd" d="M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8Zm7.75-4.25a.75.75 0 0 0-1.5 0V8c0 .414.336.75.75.75h3.25a.75.75 0 0 0 0-1.5h-2.5v-3.5Z" clipRule="evenodd" />
                                    </svg>
                                    Aqui ficará o histórico das partidas anteriores
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div
                        className="overflow-hidden bg-gray-950 border-gray-700 border rounded-3xl py-2 px-8 sm:py-4 sm:px-14 min-h-96 w-full text-white flex items-center justify-center flex-col gap-2"
                    >

                        <div
                            className="relative"
                            id="chartContainer"
                            style={{ height: '360px', width: '100%' }}
                        ></div>
                    </div>

                    <form className="flex flex-col lg:flex-row gap-8 w-full">

                        <fieldset
                            data-bet-status="bet"
                            id="bet-fieldset-1"
                            className="group p-3 flex flex-col gap-4 justify-center items-center w-full text-white bg-gray-800 border border-gray-700 rounded-xl"
                        >

                            <div className="text-gray-400 text-sm">
                                <p data-bet-hint>Faça a sua aposta abaixo</p>
                            </div>

                            <div className="flex gap-8 flex-col-reverse sm:flex-row items-center">
                                <div
                                    className="grid grid-cols-2 gap-1 w-full sm:w-40 group-disabled:opacity-50"
                                >
                                    <label
                                        className="flex items-center justify-center w-full col-span-2 bg-gray-950 rounded-full border border-gray-700"
                                    >
                                        <input
                                            type="number"
                                            value={value}
                                            onChange={(e) => formatarCampo(e.target.value,1)}
                                            step=".01"
                                            min="0.01"
                                            name=""
                                            id="bet-value-1"
                                            data-bet-value
                                            className="pl-6 w-full flex text-center text-lg bg-transparent border-none outline-none appearance-none"
                                        />
                                        <div className="flex gap-1 px-2">
                                            <button
                                                type="button"
                                                onClick={() => MaisMenosBotao(true, 1)}
                                                id="plus-one-btn"
                                                className="flex items-center justify-center bg-gray-500 text-gray-800 rounded-full hover:brightness-125 hover:scale-105"
                                            >


                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                                                    <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                                                </svg>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => MaisMenosBotao(false, 1)}
                                                className="flex items-center justify-center bg-gray-500 text-gray-800 rounded-full hover:brightness-125 hover:scale-105"
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
                                        data-bet-value-input="1"
                                        className="flex place-content-center text-xs rounded-full bg-gray-700 border border-gray-600 p-0.5"
                                    >
                                        5
                                    </button>
                                    <button
                                        type="button"
                                        data-button-update-bet="10"
                                        data-bet-value-input="1"
                                        className="flex place-content-center text-xs rounded-full bg-gray-700 border border-gray-600 p-0.5"
                                    >
                                        10
                                    </button>
                                    <button
                                        type="button"
                                        data-button-update-bet="20"
                                        data-bet-value-input="1"
                                        className="flex place-content-center text-xs rounded-full bg-gray-700 border border-gray-600 p-0.5"
                                    >
                                        20
                                    </button>
                                    <button
                                        type="button"
                                        data-button-update-bet="100"
                                        data-bet-value-input="1"
                                        className="flex place-content-center text-xs rounded-full bg-gray-700 border border-gray-600 p-0.5"
                                    >
                                        100
                                    </button>
                                </div>

                                <div
                                    role="button"
                                    data-bet-button="1"
                                    data-button-disabled="false"
                                    className="button-bet h-24 w-52 rounded-3xl flex flex-col items-center justify-center text-3xl"
                                >
                                    <span className="text-nowrap" data-bet-button-text>Bet</span>
                                    <div
                                        className="cash-out-value-txt text-xl items-center justify-center gap-2"
                                    >
                                        <span data-bet-text-value>1.00x</span>
                                        <span className="text-sm">R$</span>
                                    </div>
                                </div>
                            </div>
                        </fieldset>


                        <fieldset
                            data-bet-status="bet"
                            id="bet-fieldset-2"
                            className="group p-3 flex flex-col gap-4 justify-center items-center w-full text-white bg-gray-800 border border-gray-700 rounded-xl"
                        >
                            <div className="text-gray-400 text-sm">
                                <p data-bet-hint>Faça a sua aposta abaixo</p>
                            </div>



                            <div className="flex gap-8 flex-col-reverse sm:flex-row items-center">
                                <div
                                    className="grid grid-cols-2 gap-1 sm:w-40 w-full group-disabled:opacity-50"
                                >
                                    <label
                                        className="flex items-center justify-center w-full col-span-2 bg-gray-950 rounded-full border border-gray-700"
                                    >
                                        <input
                                            type="number"
                                            value={value2}
                                            onChange={(e) => formatarCampo(e.target.value,2)}
                                            step=".01"
                                            min="0.01"
                                            name=""
                                            id="bet-value-2"
                                            data-bet-value
                                            className="pl-6 w-full flex text-center text-lg bg-transparent border-none outline-none appearance-none"
                                        />
                                        <div className="flex gap-1 px-2">
                                            <button
                                                type="button"
                                               
                                                id="plus-one-btn"
                                                className="flex items-center justify-center bg-gray-500 text-gray-800 rounded-full hover:brightness-125 hover:scale-105"
                                                onClick={() => MaisMenosBotao(true, 2)}
                                            >

                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                                                    <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                                                </svg>
                                            </button>
                                            <button
                                                type="button"
                                            
                                                className="flex items-center justify-center bg-gray-500 text-gray-800 rounded-full hover:brightness-125 hover:scale-105"
                                                onClick={() => MaisMenosBotao(false, 2)}
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
                                        data-bet-value-input="2"
                                        className="flex place-content-center text-xs rounded-full bg-gray-700 border border-gray-600 p-0.5"
                                    >
                                        5
                                    </button>
                                    <button
                                        type="button"
                                        data-button-update-bet="10"
                                        data-bet-value-input="2"
                                        className="flex place-content-center text-xs rounded-full bg-gray-700 border border-gray-600 p-0.5"
                                    >
                                        10
                                    </button>
                                    <button
                                        type="button"
                                        data-button-update-bet="20"
                                        data-bet-value-input="2"
                                        className="flex place-content-center text-xs rounded-full bg-gray-700 border border-gray-600 p-0.5"
                                    >
                                        20
                                    </button>
                                    <button
                                        type="button"
                                        data-button-update-bet="100"
                                        data-bet-value-input="2"
                                        className="flex place-content-center text-xs rounded-full bg-gray-700 border border-gray-600 p-0.5"
                                    >
                                        100
                                    </button>
                                </div>

                                <div
                                    role="button"
                                    data-bet-button="2"
                                    data-button-disabled="false"
                                    className="button-bet h-24 w-52 rounded-3xl flex flex-col items-center justify-center text-3xl"
                                >
                                    <span className="text-nowrap" data-bet-button-text>Bet</span>
                                    <div
                                        className="cash-out-value-txt text-xl items-center justify-center gap-2"
                                    >
                                        <span data-bet-text-value>1.40</span>
                                        <span className="text-sm">R$</span>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </main>
        </div>
    )
}