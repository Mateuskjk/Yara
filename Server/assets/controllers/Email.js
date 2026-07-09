import nodemailer from 'nodemailer';

// Envia a passagem digital por e-mail.
// As credenciais SMTP vêm de variáveis de ambiente (.env) — nunca do código.
export async function enviarPassagemEmail(req, res) {
  const { para, nome } = req.body;

  if (!para) {
    return res.status(400).json({ error: 'Campo "para" (e-mail do passageiro) é obrigatório' });
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('EMAIL_USER/EMAIL_PASS não configurados no .env — e-mail não enviado.');
    return res.status(503).json({ error: 'Serviço de e-mail não configurado no servidor' });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false, // TLS via STARTTLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: `Yara Passagens <${process.env.EMAIL_USER}>`,
      to: para,
      subject: 'Sua Viagem com suas passagens',
      text: `Olá ${nome || 'passageiro(a)'}, estamos enviando sua passagem digital. Na hora do embarque, basta apresentá-la junto com seu RG ou outro documento com foto.`,
      html: `<p>Olá <strong>${nome || 'passageiro(a)'}</strong>,</p>
             <p>Aqui está sua passagem. A equipe da <strong>YARA</strong> espera que você tenha uma excelente viagem conosco.</p>
             <p>Na hora do embarque, basta apresentar a passagem com seu RG ou outro documento com foto.</p>
             <p>Qualquer dúvida, responda este e-mail ou fale conosco em uma das nossas redes sociais.</p>`
    });

    res.json({ statusCode: 200 });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    res.status(500).json({ error: 'Falha ao enviar o e-mail da passagem' });
  }
}
