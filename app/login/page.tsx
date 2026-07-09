"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthShell from "@/components/AuthShell";
import { inputClass, labelClass, botaoPrimario, erroClass } from "@/components/campos";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function entrar(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    setCarregando(false);

    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      const data = await res.json().catch(() => null);
      setErro(data?.error ?? "Não foi possível entrar. Tente novamente.");
    }
  }

  return (
    <AuthShell titulo="Bem-vindo de volta" subtitulo="Entre para acompanhar suas viagens.">
      <form onSubmit={entrar} className="space-y-4">
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

        <label className="block">
          <span className={labelClass}>Senha</span>
          <div className="relative">
            <input
              type={mostrarSenha ? "text" : "password"}
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-river-500 hover:text-river-700 cursor-pointer"
              aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
            >
              {mostrarSenha ? "🙈" : "👁️"}
            </button>
          </div>
        </label>

        {erro && <p className={erroClass}>{erro}</p>}

        <button type="submit" disabled={carregando} className={botaoPrimario}>
          {carregando ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <div className="mt-5 flex items-center justify-between text-sm">
        <Link href="/recuperar-senha" className="font-medium text-river-600 hover:text-river-800">
          Esqueci minha senha
        </Link>
        <Link href="/cadastro" className="font-semibold text-river-600 hover:text-river-800">
          Criar conta →
        </Link>
      </div>
    </AuthShell>
  );
}
