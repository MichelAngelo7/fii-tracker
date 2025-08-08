"use client";
import React, { useEffect, useState } from "react";

export default function FiiList() {
  const dadosExistentes = JSON.parse(localStorage.getItem("fiis")) || [];

  console.log(dadosExistentes);

  return (
    <>
      <h1>Lista de FIIs</h1>
    </>
  );
}
