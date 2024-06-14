import { useState } from "react";
import { betHintMessagesEnum } from "../enum/betHintMessagesEnum";
import { BetFieldSetProps, FieldsetStatusType } from "./BetFieldset.types";
import { Icon } from "../Icons";

export function BetFieldset({
  id,
  betValue,
  isFieldsetDisabled,
  isButtonDisabled,
  buttonStatusText,
  handleBetValueChange,
  addBetValue,
  setFieldsetDisabled,
  setButtonDisabled,
  setButtonStatusText,
  playerMoney,
  setPlayerMoney,
  setHasBetted,
}: BetFieldSetProps) {
  const [hintText, setHintText] = useState<betHintMessagesEnum>(
    betHintMessagesEnum.userCanBet
  );
  const [status, setStatus] = useState<FieldsetStatusType>("bet");

  function playerHasEnoughMoney(betValue: number) {
    return playerMoney >= betValue;
  }

  function handleBetGame() {
    switch (status) {
      case "bet": {
        if (!playerHasEnoughMoney(betValue)) {
          alert("Você possui dinheiro suficiente");
          break;
        }

        const lostMoney = playerMoney - betValue;

        setPlayerMoney(lostMoney);
        setHintText(betHintMessagesEnum.awaitRoundStart);
        setStatus("cancel");
        setFieldsetDisabled(true);
        setButtonStatusText("Cash out");
        setHasBetted(true);

        break;
      }
      case "cancel": {
        const previousMoney = playerMoney + betValue;

        setPlayerMoney(previousMoney);
        setHintText(betHintMessagesEnum.userCanBet);

        setStatus("bet");
        setFieldsetDisabled(false);
        setButtonStatusText("Bet");
        setHasBetted(false);
        break;
      }
      case "cash-out": {
        setHintText(betHintMessagesEnum.awaitNewRoundWhenCashOut);

        const winnedMoney = playerMoney + betValue * 2;
        setPlayerMoney(winnedMoney);

        alert(`Você ganhou ${winnedMoney.toFixed(2)}!`);

        setFieldsetDisabled(true);
        setButtonDisabled(true);
        setButtonStatusText("Bet");
        setStatus("bet");
        setHasBetted(false);

        break;
      }
    }
  }

  return (
    <fieldset
      data-bet-status={status}
      id={`bet-fieldset-${id}`}
      className="group p-3 flex flex-col gap-4 justify-center items-center w-full text-white bg-gray-800 border border-gray-700 rounded-xl"
      disabled={isFieldsetDisabled}
    >
      <div className="text-gray-400 text-sm">
        <p> {hintText} </p>
      </div>

      <div className="flex gap-8 flex-col-reverse sm:flex-row items-center">
        <div className="grid grid-cols-2 gap-1 w-full sm:w-40 group-disabled:opacity-50">
          <label className="flex items-center justify-center w-full col-span-2 bg-gray-950 rounded-full border border-gray-700">
            <input
              type="number"
              step=".01"
              min="0.01"
              name=""
              value={betValue}
              onChange={(e) => handleBetValueChange(e)}
              id={`bet-value-${id}`}
              data-bet-value
              className="pl-6 w-full flex text-center text-lg bg-transparent border-none outline-none appearance-none"
            />
            <div className="flex gap-1 px-2">
              <button
                type="button"
                onClick={() => addBetValue(1)}
                id="plus-one-btn"
                className="flex items-center justify-center bg-gray-500 text-gray-800 rounded-full hover:brightness-125 hover:scale-105"
              >
                <Icon.Plus className="w-4" />
              </button>
              <button
                type="button"
                onClick={() => addBetValue(-1)}
                className="flex items-center justify-center bg-gray-500 text-gray-800 rounded-full hover:brightness-125 hover:scale-105"
              >
                <Icon.Minus className="w-4" />
              </button>
            </div>
          </label>
          <button
            type="button"
            onClick={() => addBetValue(5)}
            className="flex place-content-center text-xs rounded-full bg-gray-700 border border-gray-600 p-0.5"
          >
            5
          </button>
          <button
            type="button"
            onClick={() => addBetValue(10)}
            className="flex place-content-center text-xs rounded-full bg-gray-700 border border-gray-600 p-0.5"
          >
            10
          </button>
          <button
            type="button"
            onClick={() => addBetValue(20)}
            className="flex place-content-center text-xs rounded-full bg-gray-700 border border-gray-600 p-0.5"
          >
            20
          </button>
          <button
            type="button"
            onClick={() => addBetValue(100)}
            className="flex place-content-center text-xs rounded-full bg-gray-700 border border-gray-600 p-0.5"
          >
            100
          </button>
        </div>

        <div
          role="button"
          data-bet-button={id}
          data-button-disabled={isButtonDisabled}
          className="button-bet h-24 w-52 rounded-3xl flex flex-col items-center justify-center text-3xl"
          onClick={() => handleBetGame()}
        >
          <span className="text-nowrap" data-bet-button-text>
            {buttonStatusText}
          </span>
          <div className="cash-out-value-txt text-xl items-center justify-center gap-2">
            <span data-bet-text-value>1.00x</span>
            <span className="text-sm">R$</span>
          </div>
        </div>
      </div>
    </fieldset>
  );
}
