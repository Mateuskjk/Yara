"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { inputClass, labelClass, botaoPrimario, erroClass } from "@/components/campos";

export default function FormRedefinir({ token }: { token: string }) {
  const router = useRouter();
  const [senha, setSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  if (!token) {
    return (
      <div className="rounded-2xl bg-red-50 p-5 text-center text-sm text-red-600">
        Link inválido.{" "}
        <Link href="/recuperar-senha" className="font-semibold underline">
          Peça um novo link aqui.
        </Link>
      </div>
    );
  }

  async function redefinir(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    if (senha !== confSenha) {
      setErro("As senhas informadas não coincidem.");
      return;
    }

    setCarregando(true);
    const res = await fetch("/api/auth/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, senha }),
    });
    setCarregando(false);

    if (res.ok) {
      router.push("/login");
    } else {
      const data = await res.json().catch(() => null);
      setErro(data?.error ?? "Não foi possível redefinir a senha.");
    }
  }

  return (
    <form onSubmit={redefinir} className="space-y-4">
      <label className="block">
        <span className={labelClass}>Nova senha</span>
        <input
          type="password"
          required
          minLength={8}
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="mín. 8 caracteres"
          className={inputClass}
        />
      </label>
      <label className="block">
        <span className={labelClass}>Confirmar nova senha</span>
        <input
          type="password"
          required
          value={confSenha}
          onChange={(e) => setConfSenha(e.target.value)}
          className={inputClass}
        />
      </label>

      {erro && <p className={erroClass}>{erro}</p>}

      <button type="submit" disabled={carregando} className={botaoPrimario}>
        {carregando ? "Salvando..." : "Salvar nova senha"}
      </button>
    </form>
  );
}
