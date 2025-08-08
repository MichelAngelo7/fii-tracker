"use client";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28DFF",
  "#FF6384",
];

export default function GraficoHistoricoPizza({ historico }) {
  if (!historico || historico.lenght === 0) return null;

  const dados = historico.map((fii) => ({
    name: fii.ticker,
    value:
      parseFloat(fii.quantidade) *
      parseFloat(
        fii.precoMedio.replace("R$", "").replace(".", "").replace(",", ".")
      ),
  }));

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-2">Distribuição da Carteira</h2>
      <PieChart width={400} height={300}>
        <Pie
          data={dados}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label={({ name }) => name}
        >
          {dados.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) =>
            new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(value)
          }
        />
        <Legend />
      </PieChart>
    </div>
  );
}
