"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { inputClass, labelClass, botaoPrimario, erroClass } from "@/components/campos";

type Passageiro = {
  nome: string;
  sobrenome: string;
  cpf: string;
  idade: string;
  email: string;
};

const vazio = (): Passageiro => ({ nome: "", sobrenome: "", cpf: "", idade: "", email: "" });

export default function FormPassageiros({
  quantidade,
  query,
}: {
  quantidade: number;
  query: string;
}) {
  const router = useRouter();
  const [passageiros, setPassageiros] = useState<Passageiro[]>(
    Array.from({ length: quantidade }, vazio)
  );
  const [erro, setErro] = useState("");

  function atualizar(indice: number, campo: keyof Passageiro, valor: string) {
    setPassageiros((atual) =>
      atual.map((p, i) => (i === indice ? { ...p, [campo]: valor } : p))
    );
  }

  function continuar(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    if (passageiros.some((p) => !p.nome.trim())) {
      setErro("Informe pelo menos o nome de cada passageiro.");
      return;
    }
    if (!passageiros.some((p) => p.email.trim())) {
      setErro("Informe o e-mail de ao menos um passageiro para receber a passagem digital.");
      return;
    }

    // Os dados seguem para o pagamento via sessionStorage (evita URLs gigantes)
    sessionStorage.setItem("yara_passageiros", JSON.stringify(passageiros));
    router.push(`/pagamento?${query}`);
  }

  return (
    <form onSubmit={continuar} className="mt-8 space-y-6">
      {passageiros.map((passageiro, i) => (
        <fieldset
          key={i}
          className="rounded-3xl border border-river-100 bg-white p-6 shadow-md"
        >
          <legend className="rounded-full bg-river-600 px-4 py-1 text-sm font-bold text-white">
            Passageiro {i + 1}
          </legend>

          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className={labelClass}>Nome *</span>
              <input
                required
                value={passageiro.nome}
                onChange={(e) => atualizar(i, "nome", e.target.value)}
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className={labelClass}>Sobrenome</span>
              <input
                value={passageiro.sobrenome}
                onChange={(e) => atualizar(i, "sobrenome", e.target.value)}
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className={labelClass}>CPF</span>
              <input
                inputMode="numeric"
                placeholder="000.000.000-00"
                value={passageiro.cpf}
                onChange={(e) => atualizar(i, "cpf", e.target.value)}
                className={inputClass}
              />
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className={labelClass}>Idade</span>
                <input
                  type="number"
                  min={0}
                  max={120}
                  value={passageiro.idade}
                  onChange={(e) => atualizar(i, "idade", e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className="block">
                <span className={labelClass}>E-mail</span>
                <input
                  type="email"
                  placeholder="para a passagem"
                  value={passageiro.email}
                  onChange={(e) => atualizar(i, "email", e.target.value)}
                  className={inputClass}
                />
              </label>
            </div>
          </div>
        </fieldset>
      ))}

      {erro && <p className={erroClass}>{erro}</p>}

      <button type="submit" className={botaoPrimario}>
        Continuar para o pagamento →
      </button>
    </form>
  );
}
