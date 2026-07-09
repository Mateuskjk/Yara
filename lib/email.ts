import nodemailer from "nodemailer";

type DadosPassagem = {
  para: string;
  nome: string;
  codigo: string;
  origem: string;
  destino: string;
};

// Envia a passagem digital por e-mail. Credenciais SMTP vêm do ambiente;
// sem configuração, o envio é silenciosamente ignorado (útil em dev).
export async function enviarEmailPassagem(dados: DadosPassagem): Promise<void> {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("EMAIL_USER/EMAIL_PASS não configurados — e-mail não enviado.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false, // STARTTLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `Yara Passagens <${process.env.EMAIL_USER}>`,
    to: dados.para,
    subject: `Sua passagem ${dados.codigo} — ${dados.origem} → ${dados.destino}`,
    text: `Olá ${dados.nome}, sua passagem digital está confirmada! Código: ${dados.codigo}. Na hora do embarque, apresente este código junto com um documento com foto.`,
    html: `<p>Olá <strong>${dados.nome}</strong>,</p>
           <p>Sua viagem de <strong>${dados.origem}</strong> para <strong>${dados.destino}</strong> está confirmada! 🛶</p>
           <p>Código da passagem: <strong style="font-size:1.2em">${dados.codigo}</strong></p>
           <p>Na hora do embarque, apresente este código junto com um documento com foto.</p>
           <p>Boa viagem!<br/>Equipe Yara</p>`,
  });
}
