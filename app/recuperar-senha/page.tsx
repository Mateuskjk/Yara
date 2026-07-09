"use client";

import { useState } from "react";
import Link from "next/link";
import AuthShell from "@/components/AuthShell";
import { inputClass, labelClass, botaoPrimario } from "@/components/campos";

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setCarregando(true);
    await fetch("/api/auth/forgot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setCarregando(false);
    setEnviado(true);
  }

  return (
    <AuthShell
      titulo="Recuperar senha"
      subtitulo="Informe seu e-mail e enviaremos um link para criar uma senha nova."
    >
      {enviado ? (
        <div className="rounded-2xl bg-river-50 p-5 text-center">
          <p className="text-3xl">📬</p>
          <p className="mt-2 font-semibold text-river-900">Verifique seu e-mail</p>
          <p className="mt-1 text-sm text-river-700">
            Se <strong>{email}</strong> estiver cadastrado, você receberá um link de
            redefinição válido por 30 minutos.
          </p>
        </div>
      ) : (
        <form onSubmit={enviar} className="space-y-4">
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
          <button type="submit" disabled={carregando} className={botaoPrimario}>
            {carregando ? "Enviando..." : "Enviar link"}
          </button>
        </form>
      )}

      <p className="mt-5 text-center text-sm text-river-700">
        Lembrou a senha?{" "}
        <Link href="/login" className="font-semibold text-river-600 hover:text-river-800">
          Entrar
        </Link>
      </p>
    </AuthShell>
  );
}
