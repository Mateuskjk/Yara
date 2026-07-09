import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import https from 'https';
import cors from 'cors';
import router from './routes.js';
import { createTableUsuarios } from './controllers/Usuarios.js';
import { createTableDestinos } from './controllers/Destinos.js';
import { createTablePassageiros } from './controllers/Passageiros.js';
import { createTableHoraViagem } from './controllers/HoraViagem.js';
import { createTableSigla } from './controllers/Sigla.js';
import { createTableCompanhias } from './controllers/Companhias.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(router);

// Garante que as tabelas existem antes de aceitar requisições
await createTableUsuarios();
await createTableDestinos();
await createTablePassageiros();
await createTableHoraViagem();
await createTableSigla();
await createTableCompanhias();

app.listen(port, () => console.log(`API rodando em http://localhost:${port}`));

// HTTPS opcional: defina SSL_KEY_PATH e SSL_CERT_PATH no .env para habilitar
if (process.env.SSL_KEY_PATH && process.env.SSL_CERT_PATH) {
  const httpsPort = process.env.HTTPS_PORT || 3001;
  https.createServer({
    key: fs.readFileSync(process.env.SSL_KEY_PATH),
    cert: fs.readFileSync(process.env.SSL_CERT_PATH)
  }, app).listen(httpsPort, () => console.log(`HTTPS rodando em https://localhost:${httpsPort}`));
}
