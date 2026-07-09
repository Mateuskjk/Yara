<div align="center">

# 🛶 Projeto Yara

**Plataforma web de venda de passagens fluviais para a Região Norte do Brasil**

*Trabalho de Conclusão de Curso — Análise e Desenvolvimento de Sistemas (Fametro)*

**Integrantes:** Mateus Silva e Tarcisio Sousa

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![Jasmine](https://img.shields.io/badge/Jasmine-8A4182?style=for-the-badge&logo=jasmine&logoColor=white)

</div>

---

## 📖 Sobre o Projeto

A **Yara** é uma resposta às lacunas existentes na venda de passagens fluviais na Região Norte do Brasil, onde o transporte por barco é essencial para milhões de pessoas, mas o processo de compra de passagens ainda é majoritariamente manual e presencial.

A plataforma digitaliza toda a jornada de compra — busca de destinos, seleção de embarcação e horário, cadastro de passageiros, pagamento e emissão da passagem digital — com três objetivos centrais:

1. **Acessibilidade** — aproximar as viagens fluviais das classes menos privilegiadas, com preços justos e um processo de compra simples;
2. **Segurança e modernidade** — substituir bilhetes de papel por passagens digitais enviadas por e-mail;
3. **Gestão** — apoiar a organização financeira das companhias de navegação da região.

Além do aspecto comercial, o projeto enxerga o potencial transformador do setor: impulsionar o turismo regional e contribuir para o desenvolvimento econômico, social e ambiental das comunidades do interior da Amazônia.

> 🏷️ **Sobre o nome:** Yara (Iara) é a "mãe das águas" no folclore amazônico — uma referência direta aos rios que são as estradas da região.

---

## 🏗️ Arquitetura

O sistema segue o modelo **cliente-servidor** em duas camadas independentes:

```
Yara/
├── Client/                     # Front-end (site estático)
│   └── src/
│       ├── html/               # Páginas da jornada de compra
│       ├── css/                # Um arquivo de estilo por página
│       ├── scripts/            # Lógica de cada página (JS puro, fetch API)
│       └── images/             # Logos, banners e fotos dos destinos
│
└── Server/                     # Back-end (API REST)
    ├── assets/
    │   ├── app.js              # Bootstrap do Express (HTTP + HTTPS opcional)
    │   ├── routes.js           # Definição de todas as rotas da API
    │   ├── configDB.js         # Conexão com o SQLite
    │   └── controllers/        # Controllers (um por entidade)
    │       ├── Usuarios.js     # Cadastro, login (bcrypt) e recuperação de senha
    │       ├── Destinos.js
    │       ├── Companhias.js
    │       ├── HoraViagem.js
    │       ├── Sigla.js
    │       ├── Passageiros.js
    │       └── Email.js        # Envio da passagem digital (Nodemailer)
    ├── spec/                   # Configuração de testes (Jasmine)
    ├── .env.example            # Modelo das variáveis de ambiente
    └── package.json
```

- **Front-end:** HTML5, CSS3 e JavaScript puro (sem frameworks), consumindo a API via `fetch`.
- **Back-end:** API REST em **Node.js + Express** (ES Modules), com persistência em **SQLite** — o arquivo do banco é criado automaticamente na primeira execução e **não é versionado**.
- **Segurança:** senhas armazenadas com **hash bcrypt**, autenticação feita **no servidor** (rota `/login`), credenciais e segredos em **variáveis de ambiente** (`.env`), e a API nunca expõe o campo de senha.
- **E-mail:** envio da passagem digital via **Nodemailer** (SMTP configurável pelo `.env`).

---

## 🧭 Jornada do Usuário

| # | Página | Função |
|---|--------|--------|
| 1 | `index.html` | Busca de viagem (origem, destino, datas, passageiros) e vitrine de destinos |
| 2 | `register.html` | Cadastro de novo usuário |
| 3 | `login.html` | Autenticação (validada no servidor com bcrypt) |
| 4 | `forget.html` / `forget-password.html` | Recuperação e redefinição de senha |
| 5 | `index-with-icon.html` | Página inicial do usuário logado |
| 6 | `ticket.html` | Escolha da passagem: companhia, horário e valor |
| 7 | `infoPassenger.html` | Dados do(s) passageiro(s) |
| 8 | `payment.html` | Pagamento por cartão de crédito ou PIX (simulado) |
| 9 | `loading.html` | Processamento e envio da passagem por e-mail |
| 10 | `congratulations.html` | Confirmação da compra |
| 11 | `pass.html` | Passagem digital — basta apresentá-la com documento com foto no embarque |

---

## 🔌 API REST

Base: `http://localhost:3000`

Todas as entidades seguem o mesmo padrão REST:

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/{entidade}` | Lista todos os registros |
| GET | `/{entidade}/:id` | Busca um registro por ID |
| POST | `/{entidade}` | Cria um registro |
| PUT | `/{entidade}/:id` | Atualiza um registro |
| DELETE | `/{entidade}/:id` | Remove um registro |

Entidades disponíveis: **`/usuarios`** · **`/destinos`** · **`/passageiros`** · **`/horarios`** · **`/siglas`** · **`/companhias`**

Rotas especiais:

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/login` | Autentica com `{ email, senha }` e retorna os dados públicos do usuário |
| GET | `/usuarios?email=` | Busca usuário por e-mail (sem expor a senha) |
| GET | `/passageiros/ultimo` | Último passageiro cadastrado (emissão da passagem) |
| POST | `/passagens/email` | Envia a passagem digital por e-mail: `{ para, nome }` |

---

## 🗄️ Banco de Dados (SQLite)

As tabelas são criadas automaticamente na inicialização do servidor:

| Tabela | Colunas |
|--------|---------|
| `Usuarios` | id, nome, sobrenome, email *(único)*, senha *(hash bcrypt)* |
| `Destinos` | id, destino |
| `InformationPassenger` | id, nome, sobrenome, cpf, rg, idade, email |
| `HoraViagens` | id, Time |
| `Sigla` | id, local, sigla |
| `Companhias` | id, empresa |

> 🔒 O arquivo do banco (`*.db`) está no `.gitignore` e nunca deve ser commitado, pois contém dados pessoais de usuários e passageiros.

---

## 🚀 Como Executar

### Pré-requisitos
- [Node.js](https://nodejs.org/) 18 ou superior

```bash
git clone https://github.com/Mateuskjk/Yara.git
cd Yara/Server
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# edite o .env com suas credenciais de e-mail (opcional — necessário só para envio de e-mail)

npm run dev      # desenvolvimento (nodemon) — ou: npm start
```

Pronto: o Express serve **o site e a API juntos** em `http://localhost:3000` (a raiz redireciona para a página inicial). O banco e as tabelas são criados automaticamente.

### Testes
```bash
cd Server
npm test         # jasmine-browser-runner runSpecs
```

---

## ☁️ Deploy no Render

O repositório inclui um [`render.yaml`](render.yaml) (Blueprint) com tudo configurado:

1. Crie uma conta gratuita em [render.com](https://render.com) usando sua conta do GitHub;
2. No painel: **New + → Blueprint** → selecione o repositório `Yara`;
3. Preencha as variáveis `EMAIL_USER` e `EMAIL_PASS` quando solicitado (necessárias só para o envio de e-mail — pode deixar em branco e configurar depois em *Environment*);
4. Clique em **Apply**. Em ~2 minutos o site inteiro (front + API) estará no ar em `https://yara-XXXX.onrender.com`, com HTTPS e deploy automático a cada `git push`.

> ⚠️ **Limitações do plano free:** o serviço hiberna após 15 min sem acesso (a primeira visita seguinte demora ~50 s para acordar) e o disco é efêmero — o banco SQLite é recriado a cada deploy/reinício, então os dados não persistem. Para dados permanentes, o próximo passo natural é migrar para PostgreSQL gerenciado (ex.: [Neon](https://neon.tech), gratuito).

---

## 🔐 Segurança

Medidas aplicadas neste projeto:

- **Hash de senhas** com bcrypt — nenhuma senha é armazenada em texto puro;
- **Login no servidor** — a comparação de credenciais acontece na rota `/login`, nunca no navegador;
- **API sem vazamento de dados sensíveis** — o campo `senha` jamais é retornado nas respostas;
- **Segredos fora do código** — credenciais SMTP e configurações ficam no `.env` (não versionado); use o `.env.example` como modelo;
- **Banco e chaves fora do repositório** — `*.db`, `.env` e certificados SSL estão no `.gitignore`.

### Trabalhos futuros
- Sessões/JWT para proteger as rotas da API;
- Integração com gateway de pagamento real (o checkout atual é simulado);
- Validações adicionais no servidor (formato de CPF, e-mail etc.);
- Testes unitários e de integração cobrindo os controllers.

---

## 🛠️ Tecnologias e Dependências

| Camada | Tecnologia | Papel |
|--------|-----------|-------|
| Front-end | HTML5 / CSS3 / JavaScript (vanilla) | Interface e lógica das páginas |
| Back-end | Node.js + Express 4 | Servidor e API REST |
| Back-end | SQLite (`sqlite` + `sqlite3`) | Persistência de dados |
| Back-end | bcryptjs | Hash de senhas |
| Back-end | dotenv | Variáveis de ambiente |
| Back-end | CORS | Liberação de acesso do front-end à API |
| Back-end | Nodemailer | Envio da passagem digital por e-mail |
| Dev | Nodemon | Hot-reload em desenvolvimento |
| Testes | Jasmine + jasmine-browser-runner | Testes unitários |

---

<div align="center">

Feito com 💙 por **Mateus Silva** e **Tarcisio Sousa** — Manaus/AM 🇧🇷

</div>
