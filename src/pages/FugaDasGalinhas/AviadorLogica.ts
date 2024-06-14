import { Chart } from "./classes/chart.js";
import { Game } from "./classes/game.js";
import { RoundsHistory } from "./classes/roundsHistory.js";
import { Player } from "./classes/player.js";
import { Round } from "./classes/round.js";
import {
  BET_HINT_MESSAGES,
  elementExists,
  isBetStatusValid,
  isBoolean,
  showAlert,
  sleep,
} from "./utils.js";

export function AviadorLogica() {
  // ------------------------------------[ SCRIPT DA PARTIDA ]------------------------------------
  const player = new Player();
  const chart = new Chart();
  const round = new Round(chart);

  // TODO: fazer as partidas serem infinitas
  // TODO: simular o dinheiro do jogador em um local storage para que seja alterado o money...
  //    ... mesmo que o usuário de F5 na página

  const game = new Game(player, round, chart);
  game.build();

  // ------------------ [ COMEÇO DA PARTIDA ] ------------------
  // -- Pegar todos os fieldset
  const allFieldsetEls = document.querySelectorAll<HTMLFieldSetElement>(
    "fieldset[data-bet-status]"
  );
  let isAllFieldsetDisabled = false;

  // -- Função principal do jogo
  async function mainGame() {
    await sleep(round.loadingTime);
    isAllFieldsetDisabled = false;

    const { roundDuration } = round.startNewRound();

    // ----- Desabilitar os fieldset e botões que não houveram aposta
    disableAllNotBettedFieldsetsAndButtons();

    // ----- Para cada aposta feita...
    player.playersBets.forEach((bet) => {
      // -- Desabilitar todos os fieldset para não haver alteração na aposta feita
      allFieldsetEls.forEach((fieldset) => {
        if (isAllFieldsetDisabled == false) {
          setFieldsetDisabled(fieldset, true);

          const betHintTextEl = fieldset.querySelector(
            "[data-bet-hint]"
          ) as HTMLElement;
          setBetHintStatusText(
            betHintTextEl,
            BET_HINT_MESSAGES.awaitNewRoundWhenNotBetted
          );
          isAllFieldsetDisabled = true;
        }
      });

      const bettedFieldsetEl = document.getElementById(
        `bet-fieldset-${bet.id}`
      ) as HTMLFieldSetElement;
      if (!bettedFieldsetEl) throw new Error("Elemento não existe"); //mudar isso aqui

      const betHintTextEl = bettedFieldsetEl.querySelector(
        "[data-bet-hint]"
      ) as HTMLElement;

      setBetHintStatusText(betHintTextEl, BET_HINT_MESSAGES.cashOut);

      const numberButtonTextEl = bettedFieldsetEl.querySelector<HTMLElement>(
        "[data-bet-text-value]"
      );

      const buttonTextEl = bettedFieldsetEl.querySelector(
        "[data-bet-button-text]"
      ) as HTMLElement;
      if (!numberButtonTextEl) throw new Error("Elemento não existe"); //mudar isso aqui

      changeBetFieldsetStatus(bettedFieldsetEl, "cash-out");
      setBetButtonStatusText(buttonTextEl, "Cash out");

      // -- Função que muda o texto que tem no botão de aposta
      const updateFieldsetValueIntervalId = setInterval(() => {
        numberButtonTextEl.textContent = `${round.multiplierCount.toFixed(2)}x`;
      }, round.intervalTime);

      // --  Quando acabar a partida, excluir o interval para que não fique repetindo infinitamente
      setTimeout(() => {
        clearInterval(updateFieldsetValueIntervalId);
      }, roundDuration);
    });

    // ------------- FIM DA PARTIDA ------------------
    setTimeout(() => {
      // -- Salvar a partida no histórico de partidas anteriores
      lastRoundsHistory.saveNewRoundInHistory(round.multiplierCount);

      // -- Desabilitar todos os campos
      allFieldsetEls.forEach((fieldset) => {
        disableFieldsetAndBetButton(fieldset);

        const buttonTextEl = fieldset.querySelector(
          "[data-bet-button-text]"
        ) as HTMLElement;
        const betHintTextEl = fieldset.querySelector(
          "[data-bet-hint]"
        ) as HTMLElement;
        setBetHintStatusText(betHintTextEl, BET_HINT_MESSAGES.roundIsOver);

        setBetButtonStatusText(buttonTextEl, "Bet");
        changeBetFieldsetStatus(fieldset, "bet");
      });

      // -- Define todas as apostas que não foram tirada a tempo
      player.loseBetsDone();

      const lostBets = player.getLostBets();
      lostBets.forEach((lostBet) => {
        const lostMoney =
          player.getBetValue(lostBet.id) * round.multiplierCount;
        player.loseMoney(lostMoney);

        showAlert(`Você perdeu ${lostMoney.toFixed(2)}!`);
      });

      // -- Mostrar tela de carregamento (A partida começará em instantes!)
      setTimeout(() => {
        allFieldsetEls.forEach((fieldset) => {
          disableFieldsetAndBetButton(fieldset, false);
          const betHintTextEl = fieldset.querySelector(
            "[data-bet-hint]"
          ) as HTMLElement;

          setBetHintStatusText(betHintTextEl, BET_HINT_MESSAGES.userCanBet);
        });
        round.awaitNewRound();
      }, round.loadingTime);
    }, roundDuration);

    await sleep(roundDuration + round.loadingTime);
  }

  // Executa o jogo em um Loop infinito
  game.init(mainGame);

  // setTimeout(mainGame, round.loadingTime);

  // ------------------------------------[ SCRIPT DOS BOTÕES DE ADICIONAR MAIS DINHEIRO NO INPUT ]------------------------------------
  /**
   * Verifica se o valor é válido para uma aposta.
   * Um valor é considerado válido se for um número e maior ou igual a 1.
   *
   * @param {string} value - O valor da aposta  ser verificado.
   * @returns {boolean} Retorna verdadeiro se o valor for válido para apostar, caso contrário, falso.
   *
   * @example
   * // Retorna true
   * isValidValueToBet(5);
   *
   * // Retorna false
   * isValidValueToBet(0);
   */
  function isValidValueToBet(value: number) {
    return isNaN(value) == false && value >= Game.RULES.MINIMUM_VALUE_TO_BET;
  }

  // ------------------------------------[ SCRIPT DOS BOTÕES DE APOSTA ]------------------------------------
  function getBetValueFromInput(fieldsetEl: HTMLElement) {
    const input =
      fieldsetEl.querySelector<HTMLInputElement>("[data-bet-value]");
    if (!input) throw new Error("element dont exists"); //mudar isso aqui

    const betValue = parseFloat(input.value).toFixed(2);

    input.value = betValue;
    return parseFloat(betValue);
  }

  const betButtonsEls =
    document.querySelectorAll<HTMLDivElement>("[data-bet-button]");

  betButtonsEls.forEach((button) => {
    let betStatus = "";
    let bet = 0;
    const betId = button.dataset.betButton;
    const betValueButtonTextEl = button.querySelector("[data-bet-text-value]");
    const buttonTextEl = button.querySelector(
      "[data-bet-button-text]"
    ) as HTMLElement;
    const selectedFieldsetEl = document.getElementById(
      `bet-fieldset-${betId}`
    ) as HTMLFieldSetElement;
    if (!selectedFieldsetEl) throw new Error("element dont exists"); //mudar isso aqui

    const betHintTextEl = selectedFieldsetEl.querySelector(
      "[data-bet-hint]"
    ) as HTMLElement;

    // -- Verificar se o atributo data-bet-button está definido dentro do button
    if (!betId) throw new Error("button dataset attribute don't defined!");
    // -- Verificar se os elementos dentro do button existem
    if (!betValueButtonTextEl || !buttonTextEl)
      throw new Error("button's elements not defined correctly!");
    // -- Verificar se o fieldset existe no HTML
    if (!selectedFieldsetEl) throw new Error("fieldset don't exists!");

    button.addEventListener("click", () => {
      // -- Variável que pega o valor definido no atributo data-bet-button -> se é o primeiro ou segundo
      betStatus = selectedFieldsetEl.dataset.betStatus || "";
      bet = getBetValueFromInput(selectedFieldsetEl);

      if (!betStatus) throw new Error("fieldset status don't defined!");
      if (!isBetStatusValid(betStatus))
        throw new Error("Not a valid fieldset status!");

      switch (betStatus) {
        case "bet":
          // -- Verificar se o player não possui fatecoins suficientes
          if (player.hasEnoughMoney(bet) == false) {
            showAlert("Você não possui esse dinheiro!");
            break;
          }

          // -- Verificar se o valor da aposta é válido
          if (isValidValueToBet(bet) == false) {
            showAlert(
              `O valor mínimo para aposta é ${Game.RULES.MINIMUM_VALUE_TO_BET}.`
            );
            break;
          }

          player.setBetValue(betId, bet);
          player.loseMoney(bet);
          setBetHintStatusText(
            betHintTextEl,
            BET_HINT_MESSAGES.awaitRoundStart
          );

          // -- Mudança no HTML
          changeBetFieldsetStatus(selectedFieldsetEl, "cancel");
          setFieldsetDisabled(selectedFieldsetEl, true);
          setBetButtonStatusText(buttonTextEl, "Cancel");

          break;
        case "cancel":
          player.cancelBet(betId);
          player.winMoney(bet);

          // -- Mudança no HTML
          setBetHintStatusText(betHintTextEl, BET_HINT_MESSAGES.userCanBet);

          changeBetFieldsetStatus(selectedFieldsetEl, "bet");
          setFieldsetDisabled(selectedFieldsetEl, false);
          setBetButtonStatusText(buttonTextEl, "Bet");

          break;
        case "cash-out":
          if (round.isGameEnded == false) {
            player.winBet(betId);
            setBetHintStatusText(
              betHintTextEl,
              BET_HINT_MESSAGES.awaitNewRoundWhenCashOut
            );

            const winMoney = player.getBetValue(betId) * round.multiplierCount;
            player.winMoney(winMoney);

            showAlert(`Você ganhou ${winMoney.toFixed(2)}!`);

            // -- Mudança no HTML
            changeBetFieldsetStatus(selectedFieldsetEl, "bet");
            setFieldsetDisabled(selectedFieldsetEl, true);
            setBetButtonDisabled(button, true);
            setBetButtonStatusText(buttonTextEl, "Bet");
          }
          break;

        default:
          throw new Error(`Bet status: "${betStatus}" don't exists!`);
          break;
      }
    });
  });

  function changeBetFieldsetStatus(
    fieldsetElement: HTMLFieldSetElement,
    newStatus: "bet" | "cancel" | "cash-out"
  ) {
    if (elementExists(fieldsetElement) == false)
      throw new Error(`Fieldset don't exists! - ${fieldsetElement}`);
    if (!isBetStatusValid(newStatus))
      throw new Error("Not a valid bet status to change fieldset!");
    fieldsetElement.dataset.betStatus = newStatus;
  }

  /**
   * - Essa função desabilita todos os botões de adicionar valores no input de número de aposta
   * - O único botão que não é desabilitado é o **principal**, o botão de Bet (Apostar)
   */
  function setFieldsetDisabled(
    fieldsetElement: HTMLFieldSetElement,
    boolean: boolean
  ) {
    // validar se o elemento fieldset existe
    if (elementExists(fieldsetElement) == false)
      throw new Error(`Fieldset don't exists! - ${fieldsetElement}`);
    // validar se é um valor booleano (lógico)
    if (isBoolean(boolean) == false)
      throw new Error(
        "Not a valid boolean value to disable or enable fieldset!"
      );

    if (boolean) {
      fieldsetElement.setAttribute("disabled", "");
    } else {
      fieldsetElement.removeAttribute("disabled");
    }
  }

  function disableFieldsetAndBetButton(
    fieldsetElement: HTMLFieldSetElement,
    boolean = true
  ) {
    if (elementExists(fieldsetElement) == false)
      throw new Error(`Fieldset element don't exists! - ${fieldsetElement}`);

    if (isBoolean(boolean) == false)
      throw new Error("Not a valid boolean value to disable or enable button!");

    const buttonToDisable = fieldsetElement.querySelector<HTMLElement>(
      "[data-bet-button]"
    ) as HTMLElement;

    if (elementExists(buttonToDisable) == false)
      throw new Error(`Bet button element don't exists! - ${buttonToDisable}`);

    setFieldsetDisabled(fieldsetElement, boolean);
    setBetButtonDisabled(buttonToDisable, boolean);
  }

  function setBetButtonDisabled(
    betButtonElement: HTMLElement,
    boolean: boolean
  ) {
    if (elementExists(betButtonElement) == false)
      throw new Error(`Bet button element don't exists! - ${betButtonElement}`);

    if (isBoolean(boolean) == false)
      throw new Error("Not a valid boolean value to disable or enable button!");
    betButtonElement.dataset.buttonDisabled = `${boolean}`;
  }

  function disableAllNotBettedFieldsetsAndButtons() {
    const fieldsetNotBettedEls = document.querySelectorAll<HTMLFieldSetElement>(
      "fieldset[data-bet-status='bet']"
    );
    fieldsetNotBettedEls.forEach((fieldset) => {
      disableFieldsetAndBetButton(fieldset);
      const betHintTextEl = fieldset.querySelector(
        "[data-bet-hint]"
      ) as HTMLElement;

      setBetHintStatusText(betHintTextEl, BET_HINT_MESSAGES.awaitNewRound);
    });
  }

  function setBetButtonStatusText(
    betButtonElement: HTMLElement,
    status: string
  ) {
    if (elementExists(betButtonElement) == false)
      throw new Error(`Bet button element don't exists! - ${betButtonElement}`);

    betButtonElement.textContent = status;
  }

  // ------------------------------------[ SCRIPT DE PEGAR O HISTÓRICO DAS ÚLTIMAS PARTIDAS E EXIBIR NO HTML ]------------------------------------
  const lastRoundsListEl = document.getElementById("last-rounds-list");

  if (!lastRoundsListEl) throw new Error("element dont exists"); // mudar isso aqui

  const lastRoundsHistory = new RoundsHistory(lastRoundsListEl);
  lastRoundsHistory.updateRoundsHistoryInListElement();

  const clearRoundHistoryBtnEl = document.getElementById("clear-last-rounds");
  if (!clearRoundHistoryBtnEl) throw new Error("element dont exists"); // mudar isso aqui

  clearRoundHistoryBtnEl.addEventListener("click", () => {
    lastRoundsHistory.clearRoundHistory();
  });

  function setBetHintStatusText(betHintTextEl: HTMLElement, message: string) {
    if (elementExists(betHintTextEl) == false)
      throw new Error(`Bet hint element don't exists! - ${betHintTextEl}`);

    betHintTextEl.innerText = message;
  }
}
