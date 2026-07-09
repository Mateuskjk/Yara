import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { token, senha } = await request.json();

    if (!token || !senha) {
      return NextResponse.json({ error: "Token e nova senha são obrigatórios" }, { status: 400 });
    }
    if (senha.length < 8) {
      return NextResponse.json(
        { error: "A senha precisa de pelo menos 8 caracteres" },
        { status: 400 }
      );
    }

    const secret = new TextEncoder().encode(
      process.env.AUTH_SECRET ?? "yara-dev-secret-nao-usar-em-producao"
    );

    let userId: number;
    try {
      const { payload } = await jwtVerify(token, secret);
      if (payload.purpose !== "reset" || !payload.sub) throw new Error();
      userId = Number(payload.sub);
    } catch {
      return NextResponse.json(
        { error: "Link inválido ou expirado. Peça um novo." },
        { status: 401 }
      );
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    await prisma.user.update({ where: { id: userId }, data: { senhaHash } });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erro no reset:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
