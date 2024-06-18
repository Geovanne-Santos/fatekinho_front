import "./styles/output.css";
import "./styles/scroll.css";
import "./styles/input.css";
import cyanDiamond from './assets/diamonds/cyan.png';
import mascote from './assets/mascote.svg';
import coins from './assets/coin.svg';
import {useGetFatecoins} from "../../api/controllers/fatecoins.ts";
import {useEffect, useRef, useState} from "react";
import $ from "jquery";
import {elementExists, roundToTwoDecimalPlaces, showAlert} from "./scripts/utils";
import { GameGrid } from "./scripts/classes/game-grid.js";
import { Game } from "./scripts/classes/game.js";
import { Player } from "./scripts/classes/player.js";

export function Minesweeper() {
    const {data} = useGetFatecoins(1);
    const [playerMoney, setPlayerMoney] = useState<number>(0);
    const [betValue, setBetValue] = useState<number>(1.0);
    const [bombsQuantity, setBombsQuantity] = useState(10);
    const [player, setPlayer] = useState<Player | null>(null);
    const [game, setGame] = useState<Game | null>(null);
    const [gamegrid, setGameGrid] = useState<GameGrid | null>(null);
    useEffect(() => {
        // Aqui dentro do useEffect, você pode inicializar seu jogo e interagir com o DOM
        const betButtonEl = document.getElementById("bet-button");
        const gridEl = document.getElementById("grid");
        const diamondsTextEl = document.getElementById("diamonds-quantity");
        const gameHintTextEl = document.getElementById("game-hint");
        const actualMultiplerTextEl = document.querySelector("[data-multiplier-now]");
        const nextMultiplerTextEl = document.querySelector("[data-multiplier-next]");
        const multiplerLabelTextEl = document.querySelector("[data-multiplier-label]");
        const totalWinTextEl = document.querySelector("[data-multiplier-total-value]");
        const updateBetButtons = document.querySelectorAll("button[data-button-update-bet]");
        const bombsSelectEl = document.getElementById("bombs-quantity");
        const betValueNumberInputEl = document.getElementById("bet-value");

        const multiplierTextElements = {
            actualMultiplier: actualMultiplerTextEl,
            nextMultiplier: nextMultiplerTextEl,
            multiplierLabel: multiplerLabelTextEl,
            totalWin: totalWinTextEl,
        };

        const elements = {
            grid: gridEl,
            multiplierEls: multiplierTextElements,
            diamondsText: diamondsTextEl,
            gameHint: gameHintTextEl,
            betButton: betButtonEl,
            inputsToDisableEls: [
                ...updateBetButtons,
                betValueNumberInputEl,
                bombsSelectEl,
            ],
        };

        let allElementsExists = [
            gridEl,
            Object.values(multiplierTextElements),
            gameHintTextEl,
            diamondsTextEl,
            betButtonEl,
        ].every((el) => elementExists(el));

        if (!allElementsExists) {
            throw new Error(
                "Game Grid not initialized correctly! Verify if elements exist in Document."
            );
        }

        const playerMoneyTextEl = document.getElementById("player-money");
        const player = new Player(playerMoneyTextEl);
        setPlayer(player);
        const gameGrid = new GameGrid(elements, player);
        setGameGrid(gameGrid)
        const game = new Game(player, gameGrid);
        setGame(game);
        game.build();

        // Cleanup function
        return () => {
            // Implemente qualquer limpeza necessária aqui
        };

    }, []);


    useEffect(() => {
        if (data) {
            $("#player-money").text(data.qtd);
            setPlayerMoney(parseFloat(data.qtd));
        }
    }, [data]);

    useEffect(() => {
        if(betValue){
            $("#bet-value").val(betValue.toFixed(2))
        }
    }, [betValue]);






    const isValidValueToBet = (value: number) => {
        const minimumValueToBet = 1.0; // Ajuste conforme necessário
        return !isNaN(value) && value >= minimumValueToBet;
    };

    const updateBetValue = (valueToUpdate: number) => {
        const minimumValueToBet = 1.0; // Ajuste conforme necessário
        let newValue = valueToUpdate;
        if (!isValidValueToBet(newValue)) {
            newValue = minimumValueToBet;
            showAlert(`O valor mínimo para aposta é R$ ${minimumValueToBet}.`);
        }
        setBetValue(parseFloat(newValue.toFixed(2)));// Garantir duas casas decimais

    };


    const handleBetButton = (event: React.MouseEvent<HTMLButtonElement>) => {
        const button = event.currentTarget;
        const valueToUpdate = button.dataset.buttonUpdateBet;
        const betValueNumberInputEl = document.getElementById("bet-value") as HTMLInputElement;

        if (!betValueNumberInputEl) {
            console.error("Element with ID 'bet-value' not found.");
            return;
        }

        const inputValue = parseFloat(betValueNumberInputEl.value);

        if (!isValidValueToBet(inputValue)) {
            showAlert(`O valor mínimo para aposta é R$ ${1.0}.`);
            betValueNumberInputEl.value = "1.00";
            return;
        }

        let newValue = 0;

        switch (valueToUpdate) {
            case "half":
                newValue = inputValue * 0.5;
                updateBetValue(newValue);
                break;
            case "double":
                newValue = inputValue * 2;
                console.log(`doublo para `+newValue)
                updateBetValue(newValue);
                break;
            default:
                break;
        }


    };
    const handleStartButton = () => {
        // Verifique se a instância do jogador está disponível
        if (!player) {
            console.error("Instância do jogador não está disponível.");
            return;
        }

        const betValueNumberInputEl = document.getElementById("bet-value") as HTMLInputElement;
        if (!betValueNumberInputEl) {
            console.error("Elemento 'bet-value' não encontrado.");
            return;
        }

        switch (player.getBet().status) {
            case "wait":
                let betValue = parseFloat(betValueNumberInputEl.value);
                if (!player.hasEnoughMoney(betValue)) {
                    showAlert("Você não possui dinheiro suficiente para fazer essa aposta!");
                    return;
                }
                if (betValue < Game.RULES.MINIMUM_VALUE_TO_BET) {
                    const minimumValueToBet = roundToTwoDecimalPlaces(Game.RULES.MINIMUM_VALUE_TO_BET);
                    betValueNumberInputEl.value = minimumValueToBet.toString();
                    showAlert(`O valor mínimo para aposta é R$ ${minimumValueToBet.toFixed(2)}!`);
                    return;
                }
                player.setBetValue(betValue);

                player.loseMoney(betValue);

                gamegrid.startNewRound();
                break;

            case "bet":
                gamegrid.winRound();
                break;

            default:
                throw new Error("Something goes wrong.");
        }
    };


    const handleBombChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setBombsQuantity(parseInt(event.target.value));
        // Implement logic to update game with new bomb quantity
    };
    return (
        <>
            <div id="app" className="bg-background w-full min-h-screen">
                {/*HEADER*/}
                <header
                    className="p-1 px-4 bg-slate-800 flex justify-between border border-b border-slate-700"
                >
                    {/*LOGO*/}
                    <a
                        className="text-primary text-4xl flex items-center gap-2 hover:animate-pulse"
                        href="#"
                    >
                        <img src={mascote} alt="" className="size-12 min-w-12"/>
                        <span className="hidden sm:inline-block">Mini Blaze</span>
                    </a>
                    {/*LOGO*/}

                    <div className="flex gap-2 items-center justify-center">
                        <a
                            className="bg-secondary flex py-0.5 px-3 items-center gap-1 justify-center rounded-full"
                            title="Clique aqui para saber como jogar o jogo"
                            href="./how-to-play.html"
                        >
                            {/*prettier-ignore*/}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                 className="size-5">
                                <path fillRule="evenodd"
                                      d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM8.94 6.94a.75.75 0 1 1-1.061-1.061 3 3 0 1 1 2.871 5.026v.345a.75.75 0 0 1-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 1 0 8.94 6.94ZM10 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                                      clipRule="evenodd"/>
                            </svg>

                            <span className="hidden sm:inline-block">Como jogar?</span>
                        </a>
                        {/*Saldo do usuário*/}
                        <div
                            className="flex gap-2 items-center justify-center py-0.5 px-3 bg-slate-900 border-slate-700 border rounded-full text-white"
                        >
            <span>
              <img src={coins} alt="fatecoins" className="size-6"/>
            </span>
                            <span id="player-money">0.00</span>
                        </div>
                    </div>
                </header>

                {/*MAIN*/}
                <main className="w-full flex items-center justify-center">
                    {/*main container*/}
                    <div
                        className="max-w-5xl flex flex-col md:flex-row w-full items-stretch justify-center p-2 gap-3"
                    >
                        {/*LOCAL DE APOSTA*/}
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
                                            {/*input group*/}
                                            <label className="relative flex flex-col gap-1 w-full">
                      <span className="text-slate-300 font-semibold">
                        Valor da aposta
                      </span>
                                                <input
                                                    type="number"
                                                    defaultValue="1.00"
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
                                                onClick={handleBetButton}
                                            >
                                                ½
                                            </button>
                                            <button
                                                type="button"
                                                className="flex flex-col items-center justify-center bg-slate-700 border-slate-600 size-9 min-w-9 border rounded disabled:cursor-not-allowed disabled:opacity-70"
                                                data-button-update-bet="double"
                                                onClick={handleBetButton}
                                            >
                                                2x
                                            </button>
                                        </div>

                                        <div className="flex gap-2 w-full items-end">
                                            {/*card group*/}
                                            <div className="flex flex-col gap-1 w-full">
                                                <span className="text-slate-300 text-sm">Bombas 💣</span>
                                                <div className="w-full relative">
                                                    <select
                                                        name="bombs-quantity"
                                                        id="bombs-quantity"
                                                        className="w-full p-1 px-2 rounded border border-slate-700 bg-slate-700 hover:bg-slate-600 disabled:hover:bg-slate-700 focus:outline-none focus:ring focus:ring-slate-300/50 appearance-none peer"
                                                        title="Selecione a quantidade de bombas da partida"
                                                        defaultValue="10"
                                                    >
                                                        <option value="10">10</option>
                                                        <option value="15">15</option>
                                                        <option value="20">20</option>
                                                        <option value="25">25</option>
                                                    </select>

                                                    {/*prettier-ignore*/}
                                                    <span
                                                        className="absolute right-1.5 top-[7px] pointer-events-none text-slate-200 peer-disabled:text-slate-500">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                               className="w-5 h-5">
                            <path fillRule="evenodd"
                                  d="M10.53 3.47a.75.75 0 0 0-1.06 0L6.22 6.72a.75.75 0 0 0 1.06 1.06L10 5.06l2.72 2.72a.75.75 0 1 0 1.06-1.06l-3.25-3.25Zm-4.31 9.81 3.25 3.25a.75.75 0 0 0 1.06 0l3.25-3.25a.75.75 0 1 0-1.06-1.06L10 14.94l-2.72-2.72a.75.75 0 0 0-1.06 1.06Z"
                                  clipRule="evenodd"/>
                          </svg>
                        </span>
                                                </div>
                                            </div>

                                            {/*card group*/}
                                            <div className="flex flex-col gap-1 w-full">
                      <span className="text-slate-300 text-sm flex gap-2">
                        Gemas

                        <div
                            className="inline-block relative w-4 h-4 translate-y-px"
                        >
                          <img
                              src={cyanDiamond}
                              alt="Diamante"
                              className="absolute top-0 right-0 w-4 h-4 blur-[3px]"
                          />
                          <img
                              src={cyanDiamond}
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
                                                {/*card group*/}
                                                <div className="flex flex-col gap-1 w-full">
                        <span className="text-slate-300 text-xs">
                          Multiplicador Atual
                        </span>
                                                    <div
                                                        className="p-1 px-2 rounded border border-slate-700 bg-slate-700"
                                                        data-multiplier-now
                                                    >
                                                        &nbsp;
                                                        {/*1.00x*/}
                                                    </div>
                                                </div>

                                                {/*card group*/}
                                                <div className="flex flex-col gap-1 w-full">
                        <span className="text-slate-300 text-xs">
                          Próximo Multiplicador
                        </span>
                                                    <div
                                                        className="p-1 px-2 rounded border border-slate-700 bg-slate-700"
                                                    >
                                                        <span data-multiplier-next>&nbsp;</span>

                                                        <span data-multiplier-next> </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-1 w-full">
                      <span className="text-slate-300 text-sm">
                        Ganhos totais
                          {/*<span data-multiplier-label>(1.00x)</span>*/}
                          <span data-multiplier-label>&nbsp;</span>
                      </span>
                                                <div
                                                    className="p-1 px-2 rounded border border-slate-700 bg-slate-700"
                                                    data-multiplier-total-value
                                                >
                                                    &nbsp;
                                                    1
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/*BET BUTTON*/}
                                    <button
                                        type="button"
                                        id="bet-button"
                                        className="w-full bg-primary py-4 text-xl font-bold rounded-md border-primary-dark border shadow-md shadow-primary/50 hover:bg-primary-dark hover:scale-105 transition duration-150 ease-in-out disabled:hover:scale-100 disabled:bg-primary-dark disabled:opacity-50"
                                        onClick={handleStartButton}
                                    >
                                        Apostar (Novo Jogo)
                                    </button>
                                </fieldset>
                            </form>
                        </aside>

                        {/*game container*/}
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
                    <img src="./assets/bomb.png" alt="bomba"/>
                </div>
            </div>
            <script type="module" src="./scripts/main-script.js"></script>
        </>
    )
}