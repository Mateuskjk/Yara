import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import router from './routes.js';
import { createTableUsuarios } from './controllers/Usuarios.js';
import { createTableDestinos } from './controllers/Destinos.js';
import { createTablePassageiros } from './controllers/Passageiros.js';
import { createTableHoraViagem } from './controllers/HoraViagem.js';
import { createTableSigla } from './controllers/Sigla.js';
import { createTableCompanhias } from './controllers/Companhias.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDir = path.join(__dirname, '..', '..', 'Client');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Front-end: a pasta Client é servida em /Client, o mesmo caminho absoluto
// que os HTMLs usam para CSS/imagens/scripts — front e API na mesma origem.
app.use('/Client', express.static(clientDir));
app.get('/', (req, res) => res.redirect('/Client/src/html/index.html'));

app.use(router);

// Garante que as tabelas existem antes de aceitar requisições
await createTableUsuarios();
await createTableDestinos();
await createTablePassageiros();
await createTableHoraViagem();
await createTableSigla();
await createTableCompanhias();

app.listen(port, () => console.log(`Yara rodando em http://localhost:${port}`));

// HTTPS opcional: defina SSL_KEY_PATH e SSL_CERT_PATH no .env para habilitar
// (em produção no Render o HTTPS já é fornecido pela plataforma)
if (process.env.SSL_KEY_PATH && process.env.SSL_CERT_PATH) {
  const httpsPort = process.env.HTTPS_PORT || 3001;
  https.createServer({
    key: fs.readFileSync(process.env.SSL_KEY_PATH),
    cert: fs.readFileSync(process.env.SSL_CERT_PATH)
  }, app).listen(httpsPort, () => console.log(`HTTPS rodando em https://localhost:${httpsPort}`));
}
