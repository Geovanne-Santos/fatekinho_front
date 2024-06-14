import CanvasJS from "canvasjs";
import { buildChartConfiguration } from "../config/chart.config.js";

type DataPointType = {
  x: number;
  y: number;
};

export class Chart {
  private chartInterface: CanvasJS.Chart;
  dps: DataPointType[] = [];

  private xVal = 0;

  private yVal = 0;
  private imageMarker: HTMLImageElement;

  public shouldUpdateMarkerPositionAfterResize = false;

  constructor() {
    this.chartInterface = new CanvasJS.Chart(
      "chartContainer",
      buildChartConfiguration(this.dps)
    );

    this.imageMarker = document.createElement("img");
    this.imageMarker.id = "aviator";
    this.imageMarker.src = "./assets/aviator_icon.png";
    this.imageMarker.setAttribute(
      "style",
      "display: none; height: 80px; width: 80px; object-fit: contain;"
    );

    // document
    //   .querySelector("#chartContainer > .canvasjs-chart-container")
    //   .append(this.#imageMarker);

    const chartContainer = document.querySelector(
      "#chartContainer > .canvasjs-chart-container"
    );

    if (!chartContainer) throw new Error("Chart container element not found.");

    chartContainer.append(this.imageMarker);
  }

  /**
   * Renderiza o gráfico.
   */
  render() {
    this.chartInterface.render();
    this.addMarkerResizeEvent();
  }

  /**
   * Adiciona um evento de redimensionamento para atualizar a posição do marcador.
   */
  private addMarkerResizeEvent() {
    // -- Função que atualiza a posição do ícone do aviãozinho caso o usuário redimensione a tela
    window.addEventListener("resize", () => {
      if (this.shouldUpdateMarkerPositionAfterResize) {
        this.updateMarkerPosition(
          this.chartInterface.options.data[0].dataPoints.length - 1
        );
      }
    });
  }

  private updateMarkerPosition(index: number) {
    const dotX = this.chartInterface.options.data[0].dataPoints[index]
      .x as number;
    const dotY = this.chartInterface.options.data[0].dataPoints[index]
      .y as number;
    const pixelX = this.chartInterface.axisX[0].convertValueToPixel(dotX);
    const pixelY = this.chartInterface.axisY[0].convertValueToPixel(dotY);

    const imageWidth = parseInt(this.imageMarker.style.width, 10);
    const imageHeight = parseInt(this.imageMarker.style.height, 10);

    this.imageMarker.style.position = "absolute";
    this.imageMarker.style.display = "block";
    this.imageMarker.style.top = `${pixelY - imageHeight / 2}px`;
    this.imageMarker.style.left = `${pixelX - imageWidth / 2}px`;
  }

  /**
   * Atualiza o gráfico em tempo real.
   */
  updateChart(valueToAddInXAxis: number) {
    // this.#yVal = this.#xVal ** 2; // Gráfico exponencial

    this.yVal =
      Math.sin(this.xVal * 0.5) +
      this.xVal * 0.6 +
      this.xVal * valueToAddInXAxis;

    // sin(x*0.1)
    // #yVal = Math.log(#xVal + 1) + Math.sin(#xVal * randomNumberToSumYAxis);
    // #yVal = Math.log(#xVal + 1); // gráfico de log10() sem aparecer o número negativo
    // this.#yVal = Math.sin(this.#xVal) + this.#xVal; // gráfico de ondulação + crescente
    this.dps.push({ x: this.xVal, y: this.yVal });
    this.xVal++;
    this.chartInterface.render();
    this.chartInterface.axisY[0].set("maximum", this.xVal + 20, true);
    this.updateMarkerPosition(
      this.chartInterface.options.data[0].dataPoints.length - 1
    );
  }

  setTitleFontColor(color: string) {
    this.chartInterface.title.set("fontColor", color, true);
  }

  setSubtitleText(text: string) {
    this.chartInterface.subtitles[0].set("text", text, true);
  }

  setTitleText(text: string) {
    this.chartInterface.title.set("text", text, true);
  }

  setTitleFontSize(size: string) {
    this.chartInterface.title.set("fontSize", size, true);
  }

  clearChartDps() {
    this.chartInterface.options.data[0].dataPoints = [];
    this.dps = [];
    this.chartInterface.options.data[0].dataPoints = this.dps;
    this.xVal = 0;
    this.yVal = 0;
  }
}
