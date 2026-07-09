"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { formatarPreco, formatarData } from "@/lib/constants";
import { inputClass, labelClass, botaoPrimario, erroClass } from "@/components/campos";

type Props = {
  origem: string;
  destino: string;
  ida: string;
  volta: string;
  classe: string;
  companhia: string;
  horario: string;
  valorUnitario: number;
  pax: number;
};

type Passageiro = { nome: string; email: string };

// Validação de número de cartão (Visa, Mastercard, Amex, Discover) — compra simulada
const REGEX_CARTAO =
  /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13})$/;

function gerarChavePix(): string {
  let chave = "";
  for (let i = 0; i < 32; i++) {
    chave += Math.floor(Math.random() * 16).toString(16);
  }
  return `00020126yara${chave}5204br.gov.bcb.pix`;
}

export default function FormPagamento(props: Props) {
  const router = useRouter();
  const [metodo, setMetodo] = useState<"cartao" | "pix">("cartao");
  const [numeroCartao, setNumeroCartao] = useState("");
  const [nomeCartao, setNomeCartao] = useState("");
  const [validade, setValidade] = useState("");
  const [cvv, setCvv] = useState("");
  const [parcelas, setParcelas] = useState(1);
  const [erro, setErro] = useState("");
  const [pagando, setPagando] = useState(false);
  const [pixCopiado, setPixCopiado] = useState(false);
  const [passageiros, setPassageiros] = useState<Passageiro[]>([]);

  const chavePix = useMemo(gerarChavePix, []);
  const valorTotal = props.valorUnitario * props.pax;

  useEffect(() => {
    const salvos = sessionStorage.getItem("yara_passageiros");
    if (salvos) setPassageiros(JSON.parse(salvos));
  }, []);

  async function confirmarReserva() {
    const salvos = sessionStorage.getItem("yara_passageiros");
    const listaPassageiros = salvos ? JSON.parse(salvos) : [];

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        origem: props.origem,
        destino: props.destino,
        dataIda: props.ida,
        dataVolta: props.volta || null,
        classe: props.classe,
        companhia: props.companhia,
        horario: props.horario,
        valorTotal,
        passageiros: listaPassageiros,
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      throw new Error(data?.error ?? "Não foi possível concluir a reserva.");
    }

    const { codigo } = await res.json();
    sessionStorage.removeItem("yara_passageiros");
    router.push(`/confirmacao/${codigo}`);
  }

  async function pagarCartao(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    const numeroLimpo = numeroCartao.replace(/[\s-]/g, "");
    if (!REGEX_CARTAO.test(numeroLimpo)) {
      setErro("Número de cartão inválido. Confira os dígitos.");
      return;
    }
    if (!nomeCartao.trim() || !validade || cvv.length < 3) {
      setErro("Preencha todos os dados do cartão.");
      return;
    }

    setPagando(true);
    try {
      await confirmarReserva();
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro no pagamento.");
      setPagando(false);
    }
  }

  async function pagarPix() {
    setErro("");
    setPagando(true);
    try {
      await confirmarReserva();
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro no pagamento.");
      setPagando(false);
    }
  }

  function copiarPix() {
    navigator.clipboard.writeText(chavePix);
    setPixCopiado(true);
    setTimeout(() => setPixCopiado(false), 4000);
  }

  const abaClass = (ativa: boolean) =>
    `flex-1 rounded-xl px-4 py-3 text-sm font-bold transition cursor-pointer ${
      ativa
        ? "bg-river-600 text-white shadow"
        : "bg-white text-river-600 hover:bg-river-50"
    }`;

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
      {/* Formulário de pagamento */}
      <section>
        <h1 className="text-2xl font-bold text-river-950">Pagamento</h1>
        <p className="mt-1 text-sm text-river-700">
          Compra simulada para fins acadêmicos — nenhum valor será cobrado.
        </p>

        <div className="mt-6 flex gap-2 rounded-2xl border border-river-100 bg-river-50 p-2">
          <button type="button" onClick={() => setMetodo("cartao")} className={abaClass(metodo === "cartao")}>
            💳 Cartão de crédito
          </button>
          <button type="button" onClick={() => setMetodo("pix")} className={abaClass(metodo === "pix")}>
            ⚡ PIX
          </button>
        </div>

        {metodo === "cartao" ? (
          <form onSubmit={pagarCartao} className="mt-6 space-y-4 rounded-3xl border border-river-100 bg-white p-6 shadow-md">
            <label className="block">
              <span className={labelClass}>Número do cartão</span>
              <input
                required
                inputMode="numeric"
                placeholder="0000 0000 0000 0000"
                value={numeroCartao}
                onChange={(e) => setNumeroCartao(e.target.value)}
                className={inputClass}
              />
            </label>

            <label className="block">
              <span className={labelClass}>Nome impresso no cartão</span>
              <input
                required
                value={nomeCartao}
                onChange={(e) => setNomeCartao(e.target.value.toUpperCase())}
                className={inputClass}
              />
            </label>

            <div className="grid grid-cols-3 gap-4">
              <label className="block">
                <span className={labelClass}>Validade</span>
                <input
                  required
                  type="month"
                  min={new Date().toISOString().slice(0, 7)}
                  value={validade}
                  onChange={(e) => setValidade(e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className="block">
                <span className={labelClass}>CVV</span>
                <input
                  required
                  inputMode="numeric"
                  maxLength={4}
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                  className={inputClass}
                />
              </label>
              <label className="block">
                <span className={labelClass}>Parcelas</span>
                <select
                  value={parcelas}
                  onChange={(e) => setParcelas(Number(e.target.value))}
                  className={inputClass}
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n}x de {formatarPreco(Math.round(valorTotal / n))}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {erro && <p className={erroClass}>{erro}</p>}

            <button type="submit" disabled={pagando} className={botaoPrimario}>
              {pagando ? "Processando..." : `Pagar ${formatarPreco(valorTotal)}`}
            </button>
          </form>
        ) : (
          <div className="mt-6 space-y-4 rounded-3xl border border-river-100 bg-white p-6 text-center shadow-md">
            {/* "QR Code" decorativo — pagamento simulado */}
            <div className="mx-auto grid h-44 w-44 grid-cols-8 gap-1 rounded-2xl border-4 border-river-900 p-2">
              {Array.from({ length: 64 }, (_, i) => (
                <span
                  key={i}
                  className={`rounded-[2px] ${
                    (i * 7 + 3) % 5 < 2 || i < 8 || i % 8 === 0 ? "bg-river-950" : "bg-white"
                  }`}
                />
              ))}
            </div>

            <p className="text-sm text-river-700">
              Escaneie o código ou copie a chave abaixo no app do seu banco:
            </p>

            <div className="flex items-center gap-2">
              <input readOnly value={chavePix} className={`${inputClass} text-xs`} />
              <button
                type="button"
                onClick={copiarPix}
                className="shrink-0 rounded-xl bg-river-100 px-4 py-2.5 text-sm font-bold text-river-800 transition hover:bg-river-200 cursor-pointer"
              >
                {pixCopiado ? "Copiado ✓" : "Copiar"}
              </button>
            </div>

            {erro && <p className={erroClass}>{erro}</p>}

            <button type="button" onClick={pagarPix} disabled={pagando} className={botaoPrimario}>
              {pagando ? "Confirmando..." : "Já paguei — confirmar reserva"}
            </button>
          </div>
        )}
      </section>

      {/* Resumo do pedido */}
      <aside className="h-fit rounded-3xl bg-river-900 p-6 text-white shadow-xl lg:sticky lg:top-24">
        <h2 className="text-lg font-bold">Resumo da viagem</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-river-300">Rota</dt>
            <dd className="text-right font-semibold">{props.origem} → {props.destino}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-river-300">Ida</dt>
            <dd className="font-semibold">{props.ida ? formatarData(props.ida) : "—"}</dd>
          </div>
          {props.volta && (
            <div className="flex justify-between gap-4">
              <dt className="text-river-300">Volta</dt>
              <dd className="font-semibold">{formatarData(props.volta)}</dd>
            </div>
          )}
          <div className="flex justify-between gap-4">
            <dt className="text-river-300">Embarcação</dt>
            <dd className="text-right font-semibold">{props.companhia}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-river-300">Saída</dt>
            <dd className="font-semibold">{props.horario}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-river-300">Classe</dt>
            <dd className="font-semibold">{props.classe}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-river-300">Passageiros</dt>
            <dd className="font-semibold">
              {passageiros.length > 0
                ? passageiros.map((p) => p.nome.split(" ")[0]).join(", ")
                : props.pax}
            </dd>
          </div>
        </dl>

        <div className="mt-5 border-t border-river-700 pt-4">
          <div className="flex justify-between text-sm text-river-300">
            <span>{formatarPreco(props.valorUnitario)} × {props.pax}</span>
          </div>
          <div className="mt-1 flex items-end justify-between">
            <span className="font-semibold">Total</span>
            <span className="text-2xl font-extrabold text-sunset-400">
              {formatarPreco(valorTotal)}
            </span>
          </div>
        </div>
      </aside>
    </div>
  );
}
