import {
  createContext,
  useContext,
  useState,
  useEffect,
  ChangeEvent,
  ReactNode,
} from "react";
import { FieldsetType, FieldsetContextType } from "./types";

const FieldsetContext = createContext<FieldsetContextType | undefined>(
  undefined
);

type FieldsetProviderProps = {
  children: ReactNode;
};

export function FieldsetProvider({ children }: FieldsetProviderProps) {
  const [fieldsets, setFieldsets] = useState<FieldsetType[]>([
    {
      id: "1",
      betValue: 1.0,
      isFieldsetDisabled: false,
      isButtonDisabled: false,
      buttonText: "Bet",
      hasBetted: false,
    },
    {
      id: "2",
      betValue: 1.0,
      isFieldsetDisabled: false,
      isButtonDisabled: false,
      buttonText: "Bet",
      hasBetted: false,
    },
  ]);

  useEffect(() => {
    setTimeout(() => {
      // setCarregando(false);
    }, 1000);
  }, []);

  const handleBetValueChange = (
    e: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const newValue = +e.target.value;
    setFieldsets((prevFieldsets) =>
      prevFieldsets.map((fieldset) =>
        fieldset.id === id ? { ...fieldset, betValue: newValue } : fieldset
      )
    );
  };

  const addBetValue = (id: string, valueToAdd: number) => {
    setFieldsets((prevFieldsets) =>
      prevFieldsets.map((fieldset) =>
        fieldset.id === id
          ? {
              ...fieldset,
              betValue: Math.max(1, fieldset.betValue + valueToAdd),
            }
          : fieldset
      )
    );
  };

  const setFieldsetDisabled = (id: string, isDisabled: boolean) => {
    setFieldsets((prevFieldsets) =>
      prevFieldsets.map((fieldset) =>
        fieldset.id === id
          ? { ...fieldset, isFieldsetDisabled: isDisabled }
          : fieldset
      )
    );
  };

  const setButtonDisabled = (id: string, isDisabled: boolean) => {
    setFieldsets((prevFieldsets) =>
      prevFieldsets.map((fieldset) =>
        fieldset.id === id
          ? { ...fieldset, isButtonDisabled: isDisabled }
          : fieldset
      )
    );
  };

  const setHasBetted = (id: string, hasBetted: boolean) => {
    setFieldsets((prevFieldsets) =>
      prevFieldsets.map((fieldset) =>
        fieldset.id === id ? { ...fieldset, hasBetted: hasBetted } : fieldset
      )
    );
  };

  const setButtonStatusText = (id: string, text: string) => {
    setFieldsets((prevFieldsets) =>
      prevFieldsets.map((fieldset) =>
        fieldset.id === id ? { ...fieldset, buttonText: text } : fieldset
      )
    );
  };

  return (
    <FieldsetContext.Provider
      value={{
        fieldsets,
        setFieldsets,
        handleBetValueChange,
        addBetValue,
        setFieldsetDisabled,
        setButtonDisabled,
        setHasBetted,
        setButtonStatusText,
      }}
    >
      {children}
    </FieldsetContext.Provider>
  );
}

export function useFieldsetContext() {
  const context = useContext(FieldsetContext);
  if (context === undefined) {
    throw new Error(
      "useFieldsetContext must be used within a FieldsetProvider"
    );
  }
  return context;
}
