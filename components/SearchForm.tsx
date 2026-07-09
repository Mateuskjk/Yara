"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CLASSES } from "@/lib/constants";

type Destino = { nome: string; sigla: string };

export default function SearchForm() {
  const router = useRouter();
  const [destinos, setDestinos] = useState<Destino[]>([]);
  const [erro, setErro] = useState("");

  const hoje = new Date().toISOString().split("T")[0];
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [dataIda, setDataIda] = useState("");
  const [dataVolta, setDataVolta] = useState("");
  const [idaEVolta, setIdaEVolta] = useState(true);
  const [classe, setClasse] = useState<string>(CLASSES[0]);
  const [passageiros, setPassageiros] = useState(1);

  useEffect(() => {
    fetch("/api/destinations")
      .then((res) => res.json())
      .then(setDestinos)
      .catch(() => setDestinos([]));
  }, []);

  function buscar(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    if (!origem || !destino) return setErro("Escolha a origem e o destino.");
    if (origem === destino) return setErro("Origem e destino precisam ser diferentes.");
    if (!dataIda) return setErro("Escolha a data de ida.");
    if (idaEVolta && !dataVolta) return setErro("Escolha a data de volta.");

    const params = new URLSearchParams({
      origem,
      destino,
      ida: dataIda,
      classe,
      pax: String(passageiros),
    });
    if (idaEVolta && dataVolta) params.set("volta", dataVolta);

    router.push(`/passagens?${params.toString()}`);
  }

  const campo =
    "w-full min-w-0 rounded-xl border border-river-200 bg-white px-3 py-2.5 text-sm text-river-950 outline-none transition focus:border-river-500 focus:ring-2 focus:ring-river-200";

  const pill = (ativa: boolean) =>
    `rounded-full px-4 py-1.5 text-sm font-semibold transition cursor-pointer ${
      ativa ? "bg-river-600 text-white shadow" : "bg-river-50 text-river-700 hover:bg-river-100"
    }`;

  return (
    <form
      onSubmit={buscar}
      className="w-full max-w-full rounded-3xl bg-white/95 p-4 text-left shadow-2xl backdrop-blur sm:p-6"
    >
      {/* Tipo de viagem */}
      <div className="flex gap-2">
        <button type="button" onClick={() => setIdaEVolta(true)} className={pill(idaEVolta)}>
          Ida e volta
        </button>
        <button type="button" onClick={() => setIdaEVolta(false)} className={pill(!idaEVolta)}>
          Somente ida
        </button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="block min-w-0">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-river-700">Origem</span>
          <select value={origem} onChange={(e) => setOrigem(e.target.value)} className={campo}>
            <option value="">De onde você sai?</option>
            {destinos.map((d) => (
              <option key={d.nome} value={d.nome}>{d.nome} ({d.sigla})</option>
            ))}
          </select>
        </label>

        <label className="block min-w-0">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-river-700">Destino</span>
          <select value={destino} onChange={(e) => setDestino(e.target.value)} className={campo}>
            <option value="">Para onde você vai?</option>
            {destinos.map((d) => (
              <option key={d.nome} value={d.nome}>{d.nome} ({d.sigla})</option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <label className="block min-w-0">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-river-700">Ida</span>
          <input
            type="date"
            min={hoje}
            value={dataIda}
            onChange={(e) => {
              setDataIda(e.target.value);
              if (dataVolta && dataVolta < e.target.value) setDataVolta(e.target.value);
            }}
            className={campo}
          />
        </label>

        <label className="block min-w-0">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-river-700">Volta</span>
          <input
            type="date"
            min={dataIda || hoje}
            value={dataVolta}
            onChange={(e) => setDataVolta(e.target.value)}
            disabled={!idaEVolta}
            className={`${campo} disabled:cursor-not-allowed disabled:bg-river-50 disabled:text-river-300`}
          />
        </label>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <label className="block min-w-0">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-river-700">Classe</span>
          <select value={classe} onChange={(e) => setClasse(e.target.value)} className={campo}>
            {CLASSES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>

        <label className="block min-w-0">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-river-700">Passageiros</span>
          <input
            type="number"
            min={1}
            max={10}
            value={passageiros}
            onChange={(e) => setPassageiros(Number(e.target.value))}
            className={campo}
          />
        </label>
      </div>

      {erro && (
        <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">{erro}</p>
      )}

      <button
        type="submit"
        className="mt-4 w-full rounded-xl bg-river-600 px-8 py-3.5 font-semibold text-white shadow-lg transition hover:bg-river-500 hover:shadow-xl active:scale-[0.98] cursor-pointer sm:ml-auto sm:block sm:w-auto"
      >
        Buscar passagens 🔍
      </button>
    </form>
  );
}
