import { FieldsetProvider } from "../context/FieldsetContext";
import { ChartProvider } from "../context/ChartContext";
import { FugaDasGalinhas } from "../index";

export function AviatorGame() {
  return (
    <ChartProvider>
      <FieldsetProvider>
        <FugaDasGalinhas />
      </FieldsetProvider>
    </ChartProvider>
  );
}
