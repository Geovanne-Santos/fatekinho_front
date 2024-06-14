import { useEffect, useState } from "react";
import "./input.css";
import "./output.css";
import "./scroll.css";
import { Carregando } from "../../components/Carregando";
import { BetFieldset } from "./components/BetFieldset";
import ChartComponent from "./components/Chart";
import { GameHeader } from "./components/GameHeader";
import { LastRoundsContainer } from "./components/LastRoundsContainer/index";
import { useFieldsetContext } from "./context/FieldsetContext";

export function FugaDasGalinhas() {
  const [carregando, setCarregando] = useState(true);
  const [playerMoney, setPlayerMoney] = useState(100);
  const {
    fieldsets,
    handleBetValueChange,
    addBetValue,
    setFieldsetDisabled,
    setButtonDisabled,
    setHasBetted,
    setButtonStatusText,
  } = useFieldsetContext();

  useEffect(() => {
    setTimeout(() => {
      setCarregando(false);
    }, 1000);
  }, []);

  return (
    <div id="app" className="bg-background w-full min-h-screen">
      {carregando && <Carregando />}
      <GameHeader playerMoney={playerMoney} />

      <main className="w-full flex items-center justify-center">
        <div className="max-w-5xl flex flex-col w-full items-center justify-center p-2 gap-3">
          <LastRoundsContainer />

          <div className="overflow-hidden bg-gray-950 border-gray-700 border rounded-3xl py-2 px-8 sm:py-4 sm:px-14 min-h-96 w-full text-white flex items-center justify-center flex-col gap-2">
            <div
              className="relative"
              id="chartContainer"
              style={{ height: "360px", width: "100%" }}
            >
              <ChartComponent />
            </div>
          </div>

          <form className="flex flex-col lg:flex-row gap-8 w-full">
            {fieldsets.map((f) => (
              <BetFieldset
                key={`fieldset-${f.id}`}
                id={f.id}
                betValue={f.betValue}
                buttonStatusText={f.buttonText}
                isFieldsetDisabled={f.isFieldsetDisabled}
                isButtonDisabled={f.isButtonDisabled}
                handleBetValueChange={(e) => handleBetValueChange(e, f.id)}
                addBetValue={(v) => addBetValue(f.id, v)}
                setFieldsetDisabled={(b) => setFieldsetDisabled(f.id, b)}
                setButtonDisabled={(b) => setButtonDisabled(f.id, b)}
                setButtonStatusText={(t) => setButtonStatusText(f.id, t)}
                setHasBetted={(b) => setHasBetted(f.id, b)}
                playerMoney={playerMoney}
                setPlayerMoney={(newMoney) => setPlayerMoney(newMoney)}
              />
            ))}
          </form>
        </div>
      </main>
    </div>
  );
}
