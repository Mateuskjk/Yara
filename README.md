<div align="center">

# 🛶 Yara

**Plataforma de venda de passagens fluviais para a Região Norte do Brasil**

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma_7-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

*Nascido como TCC de Análise e Desenvolvimento de Sistemas (Fametro), por
**Mateus Silva** e **Tarcisio Sousa** — reconstruído do zero com stack moderna.*

</div>

---

## 📖 Sobre

Na Amazônia, **os rios são as estradas**: milhões de pessoas dependem de barcos
para viajar entre as cidades, mas a compra de passagens ainda é presencial e
manual. A Yara digitaliza essa jornada de ponta a ponta — busca de rotas,
escolha de embarcação, cadastro de passageiros, pagamento (simulado) e
**passagem digital** enviada por e-mail.

> 🏷️ Yara (Iara) é a "mãe das águas" no folclore amazônico.

## ✨ Funcionalidades

- 🔍 **Busca de viagens** por origem, destino, datas, classe e passageiros
- 🛳️ **Comparação de embarcações** com horários e preços calculados por rota
- 👤 **Contas de usuário** com senha criptografada (bcrypt) e sessão em cookie httpOnly (JWT)
- 🔁 **Recuperação de senha** com token de uso único válido por 30 minutos
- 🎫 **Passagem digital** com código de reserva, enviada por e-mail (Nodemailer)
- 📋 **Minhas viagens** — histórico de reservas do usuário logado
- 💳 Checkout com **cartão** (validação de bandeira) ou **PIX** — simulado, sem cobrança real
- 📱 Design responsivo com tema visual amazônico

## 🏗️ Stack e Arquitetura

| Camada | Tecnologia |
|--------|-----------|
| Framework | **Next.js 16** (App Router, Turbopack, Server Components) |
| Linguagem | **TypeScript** |
| Estilo | **Tailwind CSS v4** com design tokens próprios |
| Banco | **PostgreSQL** ([Neon](https://neon.tech) em produção) via **Prisma 7** |
| Auth | bcryptjs + JWT ([jose](https://github.com/panva/jose)) em cookie httpOnly |
| E-mail | Nodemailer (SMTP) |

```
app/
├── page.tsx                  # Home: hero, busca e vitrine de destinos
├── login/ · cadastro/        # Autenticação
├── recuperar-senha/ · redefinir-senha/
├── passagens/                # Etapa 1 — escolha da embarcação
├── passageiros/              # Etapa 2 — dados dos passageiros
├── pagamento/                # Etapa 3 — cartão ou PIX (simulado)
├── confirmacao/[codigo]/     # Etapa 4 — passagem digital
├── minhas-viagens/           # Histórico do usuário
└── api/                      # Route Handlers (REST)
    ├── auth/ (register, login, logout, me, forgot, reset)
    ├── destinations/
    └── bookings/ (+ [codigo])

lib/        # prisma, auth (sessão JWT), pricing, email, constants
prisma/     # schema + seed (destinos e companhias)
components/ # Navbar, Footer, SearchForm, Steps, TicketDigital...
```

## 🚀 Rodando localmente

Pré-requisito: [Node.js](https://nodejs.org) 20.9+

```bash
git clone https://github.com/Mateuskjk/Yara.git
cd Yara
npm install

# 1. Configure o ambiente
cp .env.example .env        # e preencha (veja abaixo)

# 2. Banco de dados local (PostgreSQL embutido do Prisma — sem instalar nada)
npm run db:local            # deixe rodando em um terminal
# copie a DATABASE_URL exibida para o .env, depois em outro terminal:
npm run db:push             # cria as tabelas
npm run db:seed             # popula destinos e companhias

# 3. Suba a aplicação
npm run dev                 # http://localhost:3000
```

### Variáveis de ambiente (`.env`)

| Variável | Obrigatória | Descrição |
|----------|-------------|-----------|
| `DATABASE_URL` | ✅ | Connection string do PostgreSQL |
| `AUTH_SECRET` | ✅ em produção | Segredo dos tokens de sessão (`openssl rand -base64 32`) |
| `APP_URL` | — | URL pública (usada nos links de e-mail) |
| `EMAIL_USER` / `EMAIL_PASS` | — | Credenciais SMTP ([senha de app do Gmail](https://myaccount.google.com/apppasswords)); sem elas o envio de e-mail é ignorado |

## ☁️ Deploy (Vercel + Neon)

1. **Banco:** crie um projeto gratuito no [Neon](https://neon.tech) e copie a connection string;
2. **App:** importe o repositório na [Vercel](https://vercel.com/new) e configure as variáveis `DATABASE_URL`, `AUTH_SECRET`, `APP_URL` (e as de e-mail, se quiser);
3. Rode `npm run db:push && npm run db:seed` uma vez apontando para o Neon (localmente, com a `DATABASE_URL` do Neon no `.env`);
4. Pronto — cada `git push` faz deploy automático.

> Também funciona no **Render** (runtime Node): build `npm install && npm run build`, start `npm start`, com as mesmas variáveis de ambiente.

## 🔐 Segurança

- Senhas com **hash bcrypt** — nunca em texto puro
- Sessão em **cookie httpOnly** assinado (JWT), inacessível a JavaScript do cliente
- API **nunca expõe** hash de senha; redefinição exige token assinado com expiração
- Segredos só em **variáveis de ambiente** (`.env` fora do Git)
- Resposta idêntica no "esqueci minha senha" exista ou não o e-mail (evita enumeração de contas)

## 📜 Histórico

A primeira versão deste projeto (TCC, 2023) foi construída com HTML/CSS/JS puro +
Express + SQLite e está preservada no
[histórico do Git](https://github.com/Mateuskjk/Yara/commits/main). Esta versão
é a reescrita completa em Next.js.

---

<div align="center">

Feito com 💙 em Manaus/AM 🇧🇷 — projeto acadêmico; compras são simuladas.

</div>
