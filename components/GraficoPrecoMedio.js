"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function GraficoPrecoMedio({ fiis }) {
  if (!fiis || fiis.lenght === 0) return null;

  const chartData = {
    labels: fiis.map((fii) =>
      new Date(fii.dataCompra).toLocaleDateString("pt-BR")
    ),
    datasets: [
      {
        label: "Preço Médio R$",
        data: fiis.map((fii) => fii.precoMedio),
        borderColor: "#4a524a",
        backgroundColor: "rgba(74, 82, 74, 0.2)",
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: "#4a524a",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },

    scales: {
      y: {
        title: {
          display: true,
          text: "Preço médio(R$)",
        },
        beginAtZero: true,
      },
      x: {
        title: { display: true, text: "Data compra" },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}
