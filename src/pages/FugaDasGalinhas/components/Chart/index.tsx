import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { useChartContext } from "../../context/ChartContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function AviatorChart() {
  const { chartData, title } = useChartContext();

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: "gráfico",
      },
    },
    scales: {
      x: {
        title: {
          display: false,
          text: "Time",
        },
        ticks: {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          callback: (_value, _index, _ticks) => {
            return "•";
          },
        },
      },
      y: {
        title: {
          display: false,
          text: "Value",
        },
        ticks: {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          callback: (_value, _index, _ticks) => {
            return "•";
          },
        },
        display: true,
      },
    },
    animation: {
      duration: 0,
    },
  };

  return (
    <div className="w-full h-full relative">
      <Line
        data={chartData}
        options={options}
        className="w-full h-full mx-auto"
      />
      <h3 className="absolute top-[calc(50%-100px)] right-[calc(50%-200px)] text-[100px] font-bold">
        {title}
      </h3>
    </div>
  );
}

export default AviatorChart;
