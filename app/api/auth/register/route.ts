import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";
import { normalizarCpf, vincularReservasPorCpf } from "@/lib/cpf";

export async function POST(request: Request) {
  try {
    const { nome, sobrenome, email, senha, cpf } = await request.json();

    if (!nome || !email || !senha) {
      return NextResponse.json(
        { error: "Nome, e-mail e senha são obrigatórios" },
        { status: 400 }
      );
    }

    if (senha.length < 8) {
      return NextResponse.json(
        { error: "A senha precisa de pelo menos 8 caracteres" },
        { status: 400 }
      );
    }

    const jaExiste = await prisma.user.findUnique({ where: { email } });
    if (jaExiste) {
      return NextResponse.json({ error: "E-mail já cadastrado" }, { status: 409 });
    }

    const cpfNormalizado = normalizarCpf(cpf);
    if (cpf && !cpfNormalizado) {
      return NextResponse.json({ error: "CPF inválido — confira os 11 dígitos" }, { status: 400 });
    }
    if (cpfNormalizado) {
      const cpfEmUso = await prisma.user.findUnique({ where: { cpf: cpfNormalizado } });
      if (cpfEmUso) {
        return NextResponse.json({ error: "CPF já cadastrado em outra conta" }, { status: 409 });
      }
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const user = await prisma.user.create({
      data: { nome, sobrenome, email, cpf: cpfNormalizado, senhaHash },
    });

    // Vincula compras feitas sem login que tenham passageiro com este CPF
    await vincularReservasPorCpf(user.id, cpfNormalizado);

    // Já entra logado após o cadastro
    await createSession({ id: user.id, nome: user.nome, email: user.email });

    return NextResponse.json(
      { id: user.id, nome: user.nome, email: user.email },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro no cadastro:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
