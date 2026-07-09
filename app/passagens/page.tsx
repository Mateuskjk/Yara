import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Steps from "@/components/Steps";
import { gerarOpcoes, getSigla } from "@/lib/pricing";
import { formatarPreco, formatarData, CLASSES, type Classe } from "@/lib/constants";

export const metadata = { title: "Escolha sua passagem" };

export default async function PassagensPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const origem = params.origem ?? "";
  const destino = params.destino ?? "";
  const ida = params.ida ?? "";
  const volta = params.volta;
  const pax = Math.max(1, Number(params.pax) || 1);
  const classe: Classe = CLASSES.includes(params.classe as Classe)
    ? (params.classe as Classe)
    : "Econômica";

  if (!origem || !destino) {
    return (
      <>
        <Navbar />
        <main className="mx-auto max-w-3xl px-4 py-24 text-center">
          <p className="text-5xl">🧭</p>
          <h1 className="mt-4 text-2xl font-bold text-river-950">Busca incompleta</h1>
          <p className="mt-2 text-river-700">
            Volte para a página inicial e escolha a origem e o destino da sua viagem.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-full bg-river-600 px-8 py-3 font-semibold text-white hover:bg-river-500"
          >
            Fazer nova busca
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const [opcoes, siglaOrigem, siglaDestino] = await Promise.all([
    gerarOpcoes({ destino, classe, idaEVolta: Boolean(volta) }),
    getSigla(origem),
    getSigla(destino),
  ]);

  const baseParams = new URLSearchParams({
    origem,
    destino,
    ida,
    classe,
    pax: String(pax),
  });
  if (volta) baseParams.set("volta", volta);

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 pb-20 pt-8">
        <Steps atual={1} />

        {/* Resumo da rota */}
        <div className="mt-8 rounded-3xl bg-river-900 p-6 text-white shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-3xl font-extrabold tracking-wide">{siglaOrigem}</p>
                <p className="text-xs text-river-300">{origem}</p>
              </div>
              <span className="text-2xl text-sunset-400">⇀</span>
              <div className="text-center">
                <p className="text-3xl font-extrabold tracking-wide">{siglaDestino}</p>
                <p className="text-xs text-river-300">{destino}</p>
              </div>
            </div>
            <div className="text-sm text-river-200">
              <p>🗓️ Ida: <strong className="text-white">{ida ? formatarData(ida) : "—"}</strong></p>
              <p>
                {volta ? (
                  <>🗓️ Volta: <strong className="text-white">{formatarData(volta)}</strong></>
                ) : (
                  <>Somente ida</>
                )}
              </p>
            </div>
            <div className="text-sm text-river-200">
              <p>👤 {pax} passageiro{pax > 1 ? "s" : ""}</p>
              <p>💺 {classe}</p>
            </div>
          </div>
        </div>

        {/* Opções */}
        <h1 className="mt-10 text-2xl font-bold text-river-950">
          Embarcações disponíveis
        </h1>
        <p className="mt-1 text-sm text-river-700">
          Valores por passageiro{volta ? ", ida e volta inclusas" : ""}.
        </p>

        <div className="mt-6 space-y-4">
          {opcoes.map((opcao) => {
            const linkParams = new URLSearchParams(baseParams);
            linkParams.set("companhia", opcao.companhia);
            linkParams.set("horario", opcao.horario);
            linkParams.set("valor", String(opcao.valorUnitario));

            return (
              <div
                key={opcao.companhia + opcao.horario}
                className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-river-100 bg-white p-6 shadow-md transition hover:border-river-300 hover:shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-river-50 text-2xl">
                    🛳️
                  </span>
                  <div>
                    <p className="font-bold text-river-950">{opcao.companhia}</p>
                    <p className="text-sm text-river-600">
                      Saída às <strong>{opcao.horario}</strong> · {opcao.classe}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-2xl font-extrabold text-river-800">
                      {formatarPreco(opcao.valorUnitario)}
                    </p>
                    <p className="text-xs text-river-500">por passageiro</p>
                  </div>
                  <Link
                    href={`/passageiros?${linkParams.toString()}`}
                    className="rounded-xl bg-sunset-400 px-6 py-3 font-bold text-river-950 shadow transition hover:bg-sunset-300 hover:shadow-lg active:scale-95"
                  >
                    Selecionar
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
