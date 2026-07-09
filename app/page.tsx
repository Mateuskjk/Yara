import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchForm from "@/components/SearchForm";
import { prisma } from "@/lib/prisma";
import { DESTINOS_FALLBACK, formatarPreco } from "@/lib/constants";

async function getDestinos() {
  try {
    const destinos = await prisma.destination.findMany({ orderBy: { precoBase: "asc" } });
    return destinos.length > 0 ? destinos : DESTINOS_FALLBACK;
  } catch {
    return DESTINOS_FALLBACK;
  }
}

const PASSOS = [
  {
    emoji: "🔍",
    titulo: "Busque sua rota",
    texto: "Escolha origem, destino e datas. Mostramos as embarcações disponíveis com preços em tempo real.",
  },
  {
    emoji: "🎫",
    titulo: "Reserve em minutos",
    texto: "Informe os passageiros e pague com cartão ou PIX. Tudo digital, sem filas no porto.",
  },
  {
    emoji: "🛶",
    titulo: "Embarque só com o código",
    texto: "Sua passagem chega por e-mail. No embarque, apresente o código e um documento com foto.",
  },
];

export default async function Home() {
  const destinos = await getDestinos();

  return (
    <>
      <Navbar transparente />

      {/* Hero */}
      <section className="relative flex min-h-[560px] items-center justify-center overflow-hidden px-4 pb-16 pt-28">
        <Image
          src="/destinos/hero.jpg"
          alt="Rio Amazonas ao entardecer"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-river-950/80 via-river-950/60 to-river-50" />

        <div className="relative z-10 w-full max-w-5xl text-center">
          <p className="mb-3 font-semibold uppercase tracking-[0.3em] text-sunset-300">
            Os rios são as nossas estradas
          </p>
          <h1 className="text-4xl font-extrabold leading-tight text-white drop-shadow md:text-6xl">
            Descubra sua próxima
            <span className="text-sunset-400"> viagem</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-river-100 md:text-lg">
            Passagens de barco para as principais cidades da Região Norte —
            digitais, seguras e com preço justo.
          </p>

          <div className="mt-10">
            <SearchForm />
          </div>
        </div>
      </section>

      {/* Destinos */}
      <section id="destinos" className="mx-auto w-full max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-river-950">Destinos populares</h2>
            <p className="mt-1 text-river-700">Preços de partida saindo de Manaus</p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinos
            .filter((d) => d.nome !== "Manaus")
            .slice(0, 9)
            .map((destino) => (
              <Link
                key={destino.nome}
                href={`/passagens?origem=Manaus&destino=${encodeURIComponent(destino.nome)}&classe=Econômica&pax=1`}
                className="group relative h-64 overflow-hidden rounded-3xl shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <Image
                  src={destino.imagem}
                  alt={destino.nome}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-river-950/90 via-river-950/20 to-transparent" />
                <div className="absolute bottom-0 flex w-full items-end justify-between p-5">
                  <div>
                    <h3 className="text-xl font-bold text-white">{destino.nome}</h3>
                    <p className="text-sm text-river-200">{destino.sigla}</p>
                  </div>
                  <span className="rounded-full bg-sunset-400 px-3 py-1 text-sm font-bold text-river-950 shadow">
                    a partir de {formatarPreco(destino.precoBase)}
                  </span>
                </div>
              </Link>
            ))}
        </div>
      </section>

      {/* Como funciona */}
      <section id="como-funciona" className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-bold text-river-950">Como funciona</h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-river-700">
            Do sofá de casa ao convés do barco em três passos.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {PASSOS.map((passo, i) => (
              <div
                key={passo.titulo}
                className="rounded-3xl border border-river-100 bg-river-50 p-7 transition hover:border-river-300 hover:shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-river-600 text-2xl shadow">
                    {passo.emoji}
                  </span>
                  <span className="text-sm font-bold uppercase tracking-wide text-river-400">
                    Passo {i + 1}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-river-950">{passo.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-river-700">{passo.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chamada final */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16">
        <div className="relative overflow-hidden rounded-3xl bg-river-900 px-8 py-12 text-center shadow-2xl md:px-16">
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-river-700/50 blur-2xl" />
          <div className="absolute -bottom-12 -left-12 h-56 w-56 rounded-full bg-sunset-500/20 blur-2xl" />
          <h2 className="relative text-3xl font-bold text-white md:text-4xl">
            Pronto para navegar?
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-river-200">
            Crie sua conta e acompanhe todas as suas viagens em um só lugar.
          </p>
          <Link
            href="/cadastro"
            className="relative mt-8 inline-block rounded-full bg-sunset-400 px-10 py-3.5 font-bold text-river-950 shadow-lg transition hover:bg-sunset-300 hover:shadow-xl"
          >
            Começar agora
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
