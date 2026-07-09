"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthShell from "@/components/AuthShell";
import { inputClass, labelClass, botaoPrimario, erroClass } from "@/components/campos";

export default function CadastroPage() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function cadastrar(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    if (senha !== confSenha) {
      setErro("As senhas informadas não coincidem.");
      return;
    }

    setCarregando(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, sobrenome, email, senha }),
    });
    setCarregando(false);

    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      const data = await res.json().catch(() => null);
      setErro(data?.error ?? "Não foi possível criar a conta.");
    }
  }

  return (
    <AuthShell titulo="Crie sua conta" subtitulo="Leva menos de um minuto — e a próxima viagem agradece.">
      <form onSubmit={cadastrar} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className={labelClass}>Nome</span>
            <input required value={nome} onChange={(e) => setNome(e.target.value)} className={inputClass} />
          </label>
          <label className="block">
            <span className={labelClass}>Sobrenome</span>
            <input value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} className={inputClass} />
          </label>
        </div>

        <label className="block">
          <span className={labelClass}>E-mail</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="voce@exemplo.com"
            className={inputClass}
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className={labelClass}>Senha</span>
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
            <span className={labelClass}>Confirmar senha</span>
            <input
              type="password"
              required
              value={confSenha}
              onChange={(e) => setConfSenha(e.target.value)}
              className={inputClass}
            />
          </label>
        </div>

        {erro && <p className={erroClass}>{erro}</p>}

        <button type="submit" disabled={carregando} className={botaoPrimario}>
          {carregando ? "Criando conta..." : "Criar conta"}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-river-700">
        Já tem conta?{" "}
        <Link href="/login" className="font-semibold text-river-600 hover:text-river-800">
          Entrar
        </Link>
      </p>
    </AuthShell>
  );
}
