import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Steps from "@/components/Steps";
import TicketDigital from "@/components/TicketDigital";
import { prisma } from "@/lib/prisma";
import { getSigla } from "@/lib/pricing";

export const metadata = { title: "Viagem confirmada" };

export default async function ConfirmacaoPage({
  params,
}: {
  params: Promise<{ codigo: string }>;
}) {
  const { codigo } = await params;

  const booking = await prisma.booking
    .findUnique({
      where: { codigo: decodeURIComponent(codigo) },
      include: { passageiros: true },
    })
    .catch(() => null);

  if (!booking) notFound();

  const [siglaOrigem, siglaDestino] = await Promise.all([
    getSigla(booking.origem),
    getSigla(booking.destino),
  ]);

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-20 pt-8">
        <Steps atual={4} />

        <div className="mt-10 text-center">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-river-600 text-3xl shadow-lg">
            ✅
          </span>
          <h1 className="mt-4 text-3xl font-extrabold text-river-950">Boa viagem! 🎉</h1>
          <p className="mx-auto mt-2 max-w-md text-river-700">
            Sua reserva está confirmada. Enviamos a passagem digital por e-mail —
            no embarque, apresente o código junto com um documento com foto.
          </p>
        </div>

        <div className="mt-8">
          <TicketDigital
            codigo={booking.codigo}
            origem={booking.origem}
            destino={booking.destino}
            siglaOrigem={siglaOrigem}
            siglaDestino={siglaDestino}
            dataIda={booking.dataIda}
            dataVolta={booking.dataVolta}
            horario={booking.horario}
            classe={booking.classe}
            companhia={booking.companhia}
            valorTotal={booking.valorTotal}
            passageiros={booking.passageiros}
          />
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/minhas-viagens"
            className="rounded-full bg-river-600 px-8 py-3 font-semibold text-white shadow transition hover:bg-river-500"
          >
            Ver minhas viagens
          </Link>
          <Link
            href="/"
            className="rounded-full border-2 border-river-200 px-8 py-3 font-semibold text-river-700 transition hover:border-river-400 hover:bg-white"
          >
            Nova busca
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
