"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Usuario = { id: number; nome: string; email: string };

export default function Navbar({ transparente = false }: { transparente?: boolean }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [menuAberto, setMenuAberto] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then(setUsuario)
      .catch(() => setUsuario(null));
  }, []);

  async function sair() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUsuario(null);
    router.push("/");
    router.refresh();
  }

  return (
    <header
      className={
        transparente
          ? "absolute inset-x-0 top-0 z-40"
          : "sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-river-100"
      }
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          {/* logo.png é branca (fundos escuros); logo-cor.png é verde-água (fundos claros) */}
          <Image
            src={transparente ? "/brand/logo.png" : "/brand/logo-cor.png"}
            alt="Yara"
            width={110}
            height={40}
            className="h-9 w-auto"
            priority
          />
        </Link>

        {/* Menu desktop */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/#destinos"
            className={`text-sm font-medium transition hover:opacity-75 ${
              transparente ? "text-white" : "text-river-900"
            }`}
          >
            Destinos
          </Link>
          <Link
            href="/#como-funciona"
            className={`text-sm font-medium transition hover:opacity-75 ${
              transparente ? "text-white" : "text-river-900"
            }`}
          >
            Como funciona
          </Link>

          {usuario ? (
            <div className="flex items-center gap-3">
              <Link
                href="/minhas-viagens"
                className={`text-sm font-medium transition hover:opacity-75 ${
                  transparente ? "text-white" : "text-river-900"
                }`}
              >
                Minhas viagens
              </Link>
              <span
                className={`text-sm font-semibold ${
                  transparente ? "text-sunset-300" : "text-river-700"
                }`}
              >
                Olá, {usuario.nome.split(" ")[0]}
              </span>
              <button
                onClick={sair}
                className="rounded-full border border-current px-4 py-1.5 text-sm font-semibold text-red-400 transition hover:bg-red-50 hover:text-red-600 cursor-pointer"
              >
                Sair
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className={`text-sm font-semibold transition hover:opacity-75 ${
                  transparente ? "text-white" : "text-river-900"
                }`}
              >
                Entrar
              </Link>
              <Link
                href="/cadastro"
                className="rounded-full bg-sunset-400 px-5 py-2 text-sm font-semibold text-river-950 shadow-md transition hover:bg-sunset-300 hover:shadow-lg"
              >
                Criar conta
              </Link>
            </div>
          )}
        </div>

        {/* Botão hamburger mobile */}
        <button
          onClick={() => setMenuAberto(!menuAberto)}
          aria-label="Abrir menu"
          className={`md:hidden ${transparente ? "text-white" : "text-river-900"}`}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuAberto ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {/* Menu mobile */}
      {menuAberto && (
        <div className="mx-4 mb-3 rounded-2xl bg-white p-4 shadow-xl md:hidden">
          <div className="flex flex-col gap-3">
            <Link href="/#destinos" className="font-medium text-river-900">Destinos</Link>
            <Link href="/#como-funciona" className="font-medium text-river-900">Como funciona</Link>
            {usuario ? (
              <>
                <Link href="/minhas-viagens" className="font-medium text-river-900">Minhas viagens</Link>
                <button onClick={sair} className="text-left font-semibold text-red-500">Sair</button>
              </>
            ) : (
              <>
                <Link href="/login" className="font-medium text-river-900">Entrar</Link>
                <Link
                  href="/cadastro"
                  className="rounded-full bg-sunset-400 px-5 py-2 text-center font-semibold text-river-950"
                >
                  Criar conta
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
