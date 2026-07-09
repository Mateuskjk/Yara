import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

// Gera um link de redefinição com token de 30 minutos.
// A resposta é sempre a mesma, exista o e-mail ou não (evita enumeração de contas).
export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: "Informe o e-mail" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      const secret = new TextEncoder().encode(
        process.env.AUTH_SECRET ?? "yara-dev-secret-nao-usar-em-producao"
      );
      const token = await new SignJWT({ purpose: "reset" })
        .setProtectedHeader({ alg: "HS256" })
        .setSubject(String(user.id))
        .setExpirationTime("30m")
        .sign(secret);

      const baseUrl = process.env.APP_URL ?? "http://localhost:3000";
      const link = `${baseUrl}/redefinir-senha?token=${token}`;

      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST || "smtp.gmail.com",
          port: Number(process.env.EMAIL_PORT) || 587,
          secure: false,
          auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        });
        await transporter.sendMail({
          from: `Yara Passagens <${process.env.EMAIL_USER}>`,
          to: email,
          subject: "Redefinição de senha — Yara",
          html: `<p>Olá ${user.nome},</p>
                 <p>Recebemos um pedido para redefinir sua senha. O link vale por 30 minutos:</p>
                 <p><a href="${link}">Redefinir minha senha</a></p>
                 <p>Se não foi você, ignore este e-mail.</p>`,
        });
      } else {
        // Sem SMTP configurado (ambiente de desenvolvimento): o link sai no log do servidor
        console.log(`[DEV] Link de redefinição de senha para ${email}: ${link}`);
      }
    }

    return NextResponse.json({
      msg: "Se o e-mail estiver cadastrado, você receberá um link de redefinição.",
    });
  } catch (error) {
    console.error("Erro no forgot:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
