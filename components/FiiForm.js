"use client";
import React, { useState } from "react";

export default function FiiForm() {
  const [ticker, setTicker] = useState("");
  const [quantidade, setQuantidade] = useState(0);
  const [precoMedio, setPrecoMedio] = useState(0);
  const [dataCompra, setDataCompra] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const novaFii = {
      id: crypto.randomUUID(),
      ticker: ticker.toUpperCase(),
      quantidade: Number(quantidade),
      precoMedio: Number(precoMedio),
      dataCompra: dataCompra || null,
    };

    const dadosExistentes = JSON.parse(localStorage.getItem("fiis")) || [];
    const atualizados = [...dadosExistentes, novaFii];
    localStorage.setItem("fiis", JSON.stringify(atualizados));

    setTicker("");
    setQuantidade("");
    setPrecoMedio(0);
    setDataCompra(0);
    alert("FII cadastrado com sucesso!");
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-xl p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Cadastro de FIIs</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block mb-1 font-medium">Papel: </label>
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          placeholder="Ex: MXRF11"
          className="w-full px-3 py-2 border rounded-md shadown-sm focus:outline-none focus:ring focus:border-blue-500"
          required
        />
        <label className="block mb-1 font-medium">Quantidade: </label>
        <input
          type="number"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          placeholder="Ex: 10"
          required
        />
        <label className="block mb-1 font-medium">Preço Médio: </label>
        <input
          type="number"
          value={precoMedio}
          onChange={(e) => setPrecoMedio(e.target.value)}
          placeholder="EX: 11.50"
          required
        />
        <label className="block mb-1 font-medium">Data da compra: </label>
        <input
          type="date"
          value={dataCompra}
          onChange={(e) => setDataCompra(e.target.value)}
          placeholder="Data da compra (opcional)"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
