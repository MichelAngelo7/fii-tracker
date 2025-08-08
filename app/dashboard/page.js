"use client";
import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [fiis, setFiis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dados = localStorage.getItem("fiis");

    if (!dados) {
      setLoading(false);
      return;
    }

    const parsed = JSON.parse(dados);
    const agrupado = parsed.reduce((acc, cur) => {
      const { ticker, quantidade, precoMedio, dataCompra } = cur;
      const qtd = parseFloat(quantidade);
      const precoUnit = parseFloat(precoMedio);

      if (!ticker || isNaN(qtd) || isNaN(precoUnit)) {
        console.warn("Dados inválidos detectados:", cur);
        return acc;
      }

      const existente = acc[ticker] || {
        ticker,
        totalQuantidade: 0,
        totalValor: 0,
        ultimaCompra: null,
      };

      acc[ticker] = {
        ...existente,
        totalQuantidade: existente.totalQuantidade + qtd,
        totalValor: existente.totalValor + qtd * precoUnit,
        ultimaCompra: dataCompra,
      };

      return acc;
    }, {});

    const resultado = Object.values(agrupado).map((item) => ({
      ticker: item.ticker,
      quantidade: item.totalQuantidade,
      precoMedio: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(item.totalValor / item.totalQuantidade),
      dataCompra: item.ultimaCompra,
    }));

    setFiis(resultado);
    setLoading(false);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de FIIs</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="overflow-x-auto">
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
                  <td className="border p-2">{fii.ticker}</td>
                  <td className="border p-2">{fii.quantidade}</td>
                  <td className="border p-2">{fii.precoMedio}</td>
                  <td className="border p-2">{fii.dataCompra}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
