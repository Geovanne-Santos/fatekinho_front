import { buttonStatusTextType } from "./components/BetFieldset/BetFieldset.types";

export type FieldsetType = {
  id: string;
  betValue: number;
  isFieldsetDisabled: boolean;
  isButtonDisabled: boolean;
  buttonText: buttonStatusTextType;
  hasBetted: boolean;
};
