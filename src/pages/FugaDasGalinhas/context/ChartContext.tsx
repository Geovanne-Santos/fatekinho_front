import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import aviator_icon from "../assets/aviator_icon.png";
import { ChartData } from "chart.js";

// Define the shape of the context state
interface ChartContextProps {
  chartData: ChartData<"line">;
  setChartData: React.Dispatch<React.SetStateAction<ChartData<"line">>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  clearChartData: () => void;
}

// Create the context
const ChartContext = createContext<ChartContextProps | undefined>(undefined);

type ChartProviderProps = {
  children: ReactNode;
};

const image = new Image(80, 40);
image.src = aviator_icon;
image.classList.add("object-contain");

// Create a provider component
export function ChartProvider({ children }: ChartProviderProps) {
  const [title, setTitle] = useState("1.00x");
  const [chartData, setChartData] = useState<ChartData<"line">>({
    labels: [0],
    datasets: [
      {
        label: "Aviator Game",
        data: [0],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prevData) => {
        if (!prevData.labels || prevData.labels == undefined)
          throw new Error("label don't exists");
        const nextX = prevData.labels.length;
        const nextY = Math.sin(nextX * 0.5) + nextX * 0.6;
        setTitle(`${nextX.toFixed(2)}x`);

        return {
          ...prevData,
          labels: [...prevData.labels, nextX],
          datasets: prevData.datasets.map((dataset) => ({
            ...dataset,
            data: [...(dataset.data as number[]), nextY],
            borderColor: "#ed1836",
            animation: {
              duration: 0,
            },
            pointStyle: (context) =>
              context.dataIndex === prevData.labels.length - 1 ? image : "line",
          })),
        };
      });
    }, 125);

    setTimeout(() => {
      clearInterval(interval);
      clearChartData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const clearChartData = () => {
    setChartData({
      labels: [],
      datasets: [
        {
          label: "Aviator Game",
          data: [],
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    });
    setTitle("1.00x");
  };

  return (
    <ChartContext.Provider
      value={{ chartData, setChartData, title, setTitle, clearChartData }}
    >
      {children}
    </ChartContext.Provider>
  );
}

// Custom hook to use the ChartContext
export const useChartContext = () => {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error("useChartContext must be used within a ChartProvider");
  }
  return context;
};
