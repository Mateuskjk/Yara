import { Router } from 'express';
import { selectUsuarios, selectUsuario, insertUsuario, updateSenhaUsuario, deleteUsuario, loginUsuario } from './controllers/Usuarios.js';
import { selectDestinos, selectDestino, insertDestino, updateDestino, deleteDestino } from './controllers/Destinos.js';
import { selectPassageiros, selectPassageiro, selectUltimoPassageiro, insertPassageiros, updatePassageiro, deletePassageiro } from './controllers/Passageiros.js';
import { selectHoraViagens, selectHoraViagem, insertHoraViagem, updateHoraViagem, deleteHoraViagem } from './controllers/HoraViagem.js';
import { selectSiglas, selectSigla, insertSigla, updateSigla, deleteSigla } from './controllers/Sigla.js';
import { selectCompanhias, selectCompanhia, insertCompanhia, updateCompanhia, deleteCompanhia } from './controllers/Companhias.js';
import { enviarPassagemEmail } from './controllers/Email.js';

const router = Router();

// Health check (usado pelo Render para saber se o serviço está no ar)
router.get('/api/status', (req, res) => {
  res.json({ statusCode: 200, msg: 'API rodando' });
});

// Autenticação
router.post('/login', loginUsuario);

// Usuários
router.get('/usuarios', selectUsuarios);
router.get('/usuarios/:id', selectUsuario);
router.post('/usuarios', insertUsuario);
router.put('/usuarios/:id', updateSenhaUsuario);
router.delete('/usuarios/:id', deleteUsuario);

// Destinos
router.get('/destinos', selectDestinos);
router.get('/destinos/:id', selectDestino);
router.post('/destinos', insertDestino);
router.put('/destinos/:id', updateDestino);
router.delete('/destinos/:id', deleteDestino);

// Passageiros ("/ultimo" precisa vir antes de "/:id")
router.get('/passageiros', selectPassageiros);
router.get('/passageiros/ultimo', selectUltimoPassageiro);
router.get('/passageiros/:id', selectPassageiro);
router.post('/passageiros', insertPassageiros);
router.put('/passageiros/:id', updatePassageiro);
router.delete('/passageiros/:id', deletePassageiro);

// Horários de viagem
router.get('/horarios', selectHoraViagens);
router.get('/horarios/:id', selectHoraViagem);
router.post('/horarios', insertHoraViagem);
router.put('/horarios/:id', updateHoraViagem);
router.delete('/horarios/:id', deleteHoraViagem);

// Siglas dos portos/localidades
router.get('/siglas', selectSiglas);
router.get('/siglas/:id', selectSigla);
router.post('/siglas', insertSigla);
router.put('/siglas/:id', updateSigla);
router.delete('/siglas/:id', deleteSigla);

// Companhias de navegação
router.get('/companhias', selectCompanhias);
router.get('/companhias/:id', selectCompanhia);
router.post('/companhias', insertCompanhia);
router.put('/companhias/:id', updateCompanhia);
router.delete('/companhias/:id', deleteCompanhia);

// Envio da passagem digital por e-mail
router.post('/passagens/email', enviarPassagemEmail);

export default router;
