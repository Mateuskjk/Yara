import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { enviarEmailPassagem } from "@/lib/email";

type PassageiroInput = {
  nome?: string;
  sobrenome?: string;
  cpf?: string;
  idade?: number | string;
  email?: string;
};

function gerarCodigo(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let codigo = "YR-";
  for (let i = 0; i < 6; i++) {
    codigo += chars[Math.floor(Math.random() * chars.length)];
  }
  return codigo;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { origem, destino, dataIda, dataVolta, classe, companhia, horario, valorTotal, passageiros } = body;

    if (!origem || !destino || !dataIda || !classe || !companhia || !horario) {
      return NextResponse.json({ error: "Dados da viagem incompletos" }, { status: 400 });
    }

    const listaPassageiros: PassageiroInput[] = Array.isArray(passageiros) ? passageiros : [];
    if (listaPassageiros.length === 0 || listaPassageiros.some((p) => !p.nome)) {
      return NextResponse.json(
        { error: "Informe ao menos um passageiro com nome" },
        { status: 400 }
      );
    }

    const session = await getSession();

    const booking = await prisma.booking.create({
      data: {
        codigo: gerarCodigo(),
        userId: session?.id ?? null,
        origem,
        destino,
        dataIda: new Date(dataIda),
        dataVolta: dataVolta ? new Date(dataVolta) : null,
        classe,
        companhia,
        horario,
        valorTotal: Math.max(0, Math.round(Number(valorTotal) || 0)),
        passageiros: {
          create: listaPassageiros.map((p) => ({
            nome: String(p.nome),
            sobrenome: p.sobrenome ? String(p.sobrenome) : null,
            cpf: p.cpf ? String(p.cpf) : null,
            idade: p.idade ? Number(p.idade) : null,
            email: p.email ? String(p.email) : null,
          })),
        },
      },
      include: { passageiros: true },
    });

    // Envio da passagem por e-mail em segundo plano — não bloqueia a resposta
    const primeiroComEmail = booking.passageiros.find((p) => p.email);
    if (primeiroComEmail?.email) {
      enviarEmailPassagem({
        para: primeiroComEmail.email,
        nome: primeiroComEmail.nome,
        codigo: booking.codigo,
        origem: booking.origem,
        destino: booking.destino,
      }).catch((e) => console.error("Falha ao enviar e-mail da passagem:", e));
    }

    return NextResponse.json({ codigo: booking.codigo }, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar reserva:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: session.id },
      include: { passageiros: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Erro ao listar reservas:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
