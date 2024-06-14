import { buttonStatusTextType } from "../components/BetFieldset/BetFieldset.types";

export interface FieldsetType {
  id: string;
  betValue: number;
  isFieldsetDisabled: boolean;
  isButtonDisabled: boolean;
  buttonText: buttonStatusTextType;
  hasBetted: boolean;
}

export interface FieldsetContextType {
  fieldsets: FieldsetType[];
  setFieldsets: React.Dispatch<React.SetStateAction<FieldsetType[]>>;
  handleBetValueChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => void;
  addBetValue: (id: string, valueToAdd: number) => void;
  setFieldsetDisabled: (id: string, isDisabled: boolean) => void;
  setButtonDisabled: (id: string, isDisabled: boolean) => void;
  setHasBetted: (id: string, hasBetted: boolean) => void;
  setButtonStatusText: (id: string, text: string) => void;
}
