import { ChangeEvent } from "react";

export interface BetFieldSetProps {
  id: string;
  betValue: number;
  isFieldsetDisabled: boolean;
  isButtonDisabled: boolean;
  buttonStatusText: buttonStatusTextType;
  handleBetValueChange: (e: ChangeEvent<HTMLInputElement>) => void;
  addBetValue: (valueToAdd: number) => void;
  setFieldsetDisabled: (isDisabled: boolean) => void;
  setButtonDisabled: (isDisabled: boolean) => void;
  setButtonStatusText(text: buttonStatusTextType): void;
  playerMoney: number;
  setPlayerMoney: (newMoney: number) => void;
  setHasBetted: (hasBetted: boolean) => void;
}

export type FieldsetStatusType = "bet" | "cash-out" | "cancel";

export type buttonStatusTextType = "Bet" | "Cash out" | "Cancel";
