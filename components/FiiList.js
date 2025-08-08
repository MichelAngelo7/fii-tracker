"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function FiiList() {
  const [fiis, setFiis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dados = localStorage.getItem("fiis");

    if (!dados) {
      setLoading(false);
      return;
    }

    if (dados) {
      const dataParsed = JSON.parse(dados);

      const agrupado = dataParsed.reduce((acc, curr) => {
        const { ticker, quantidade, precoMedio, dataCompra } = curr;
        const qtd = parseFloat(quantidade);
        const precoUnit = parseFloat(precoMedio);

        if (!acc[ticker]) {
          acc[ticker] = {
            ticker,
            totalQuantidade: 0,
            totalValor: 0,
            ultimaCompra: dataCompra,
          };
        }

        acc[ticker].totalQuantidade += qtd;
        acc[ticker].totalValor += qtd * precoUnit;
        acc[ticker].ultimaCompra = dataCompra;

        if (!ticker || isNaN(qtd) || isNaN(precoUnit)) {
          console.warn("Dados inválidos detectados:", curr);
        }

        return acc;
      }, {});

      const resultado = Object.values(agrupado).map((item) => ({
        ticker: item.ticker,
        quantidade: item.totalQuantidade,
        precoMedio: (item.totalValor / item.totalQuantidade).toFixed(2),
        dataCompra: item.ultimaCompra,
      }));
      setFiis(resultado);
    }
    setLoading(false);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de FIIs</h1>
      {loading ? (
        <p>Carregando...</p>
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
              <tr key={String(fii.ticker)}>
                <td className="border p-2">
                  <Link
                    href={`/fiis/${fii.ticker}`}
                    className="text-blue-500 underline"
                  >
                    {fii.ticker}
                  </Link>
                </td>
                <td className="border p-2">{fii.quantidade}</td>
                <td className="border p-2">{fii.precoMedio}</td>
                <td className="border p-2">{fii.dataCompra}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
