"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import GraficoPrecoMedio from "@/components/GraficoPrecoMedio";

export default function DetalheFii() {
  const params = useParams();
  const ticker = params?.ticker;
  const [fiis, setFiis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dados = localStorage.getItem("fiis");
    if (dados) {
      if (!dados) {
        setLoading(false);
        return;
      }
      const dataParsed = JSON.parse(dados);
      const filtered = dataParsed.filter(
        (tickers) =>
          tickers.ticker.toUpperCase().trim() === ticker.toUpperCase().trim()
      );

      const ordered = filtered.sort(
        (a, b) => new Date(b.dataCompra) - new Date(a.dataCompra)
      );

      setFiis(ordered);
      setLoading(false);
    }
  }, [ticker]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Histórico compra {ticker}</h1>
      {!loading && fiis.length === 0 ? (
        <p>Nenhum dado encontrado para o FII {ticker}.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2">Papel</th>
              <th className="border p-2">Quantidade</th>
              <th className="border p-2">Preço Médio</th>
              <th className="border p-2">Data Compra</th>
            </tr>
          </thead>
          <tbody>
            {fiis.map((fii, index) => (
              <tr key={String(fii.id)}>
                <td className="border p-2">{fii.ticker}</td>
                <td className="border p-2">{fii.quantidade}</td>
                <td className="border p-2">{fii.precoMedio}</td>
                <td className="border p-2">{fii.dataCompra}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <GraficoPrecoMedio fiis={fiis} />
    </div>
  );
}
