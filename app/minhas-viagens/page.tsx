import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatarPreco, formatarData } from "@/lib/constants";

export const metadata = { title: "Minhas viagens" };

export default async function MinhasViagensPage() {
  const session = await getSession();

  if (!session) {
    return (
      <>
        <Navbar />
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-24 text-center">
          <p className="text-5xl">🔒</p>
          <h1 className="mt-4 text-2xl font-bold text-river-950">Entre para ver suas viagens</h1>
          <p className="mt-2 text-river-700">
            Faça login para acompanhar todas as passagens compradas na sua conta.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-block rounded-full bg-river-600 px-8 py-3 font-semibold text-white hover:bg-river-500"
          >
            Fazer login
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const bookings = await prisma.booking
    .findMany({
      where: { userId: session.id },
      include: { passageiros: true },
      orderBy: { createdAt: "desc" },
    })
    .catch(() => []);

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 pb-20 pt-10">
        <h1 className="text-3xl font-bold text-river-950">Minhas viagens</h1>
        <p className="mt-1 text-river-700">Todas as passagens compradas com sua conta.</p>

        {bookings.length === 0 ? (
          <div className="mt-12 rounded-3xl border-2 border-dashed border-river-200 bg-white p-12 text-center">
            <p className="text-5xl">🛶</p>
            <p className="mt-4 font-semibold text-river-900">Nenhuma viagem por aqui ainda</p>
            <p className="mt-1 text-sm text-river-600">
              Que tal planejar a primeira? O rio está esperando.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-full bg-sunset-400 px-8 py-3 font-bold text-river-950 hover:bg-sunset-300"
            >
              Buscar passagens
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {bookings.map((booking) => (
              <Link
                key={booking.codigo}
                href={`/confirmacao/${booking.codigo}`}
                className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-river-100 bg-white p-6 shadow-md transition hover:border-river-300 hover:shadow-xl"
              >
                <div>
                  <p className="font-mono text-xs font-bold text-river-400">{booking.codigo}</p>
                  <p className="mt-1 text-lg font-bold text-river-950">
                    {booking.origem} → {booking.destino}
                  </p>
                  <p className="text-sm text-river-600">
                    {formatarData(booking.dataIda)} às {booking.horario} · {booking.companhia} ·{" "}
                    {booking.passageiros.length} passageiro{booking.passageiros.length > 1 ? "s" : ""}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-extrabold text-river-800">
                    {formatarPreco(booking.valorTotal)}
                  </p>
                  <span className="text-sm font-semibold text-river-500">Ver passagem →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
