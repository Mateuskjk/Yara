import bcrypt from 'bcryptjs';
import { openDb } from '../configDB.js';

const SALT_ROUNDS = 10;

// Campos retornados pela API — a senha (hash) nunca sai do servidor
const CAMPOS_PUBLICOS = 'id, nome, sobrenome, email';

export async function createTableUsuarios() {
  try {
    const db = await openDb();
    await db.exec('CREATE TABLE IF NOT EXISTS Usuarios ( id INTEGER PRIMARY KEY, nome TEXT NOT NULL, sobrenome TEXT, email TEXT NOT NULL UNIQUE, senha TEXT NOT NULL)');
  } catch (error) {
    console.error('Erro ao criar tabela Usuarios:', error);
  }
}

export async function selectUsuarios(req, res) {
  try {
    const { email } = req.query;
    const db = await openDb();

    if (email) {
      const usuarios = await db.all(`SELECT ${CAMPOS_PUBLICOS} FROM Usuarios WHERE email = ?`, [email]);
      res.json(usuarios);
    } else {
      const usuarios = await db.all(`SELECT ${CAMPOS_PUBLICOS} FROM Usuarios`);
      res.json(usuarios);
    }
  } catch (error) {
    console.error('Erro ao selecionar usuários:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export async function selectUsuario(req, res) {
  try {
    const { id } = req.params;
    const db = await openDb();
    const usuario = await db.get(`SELECT ${CAMPOS_PUBLICOS} FROM Usuarios WHERE id = ?`, [id]);

    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao selecionar usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export async function insertUsuario(req, res) {
  try {
    const { nome, sobrenome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ error: 'Nome, e-mail e senha são obrigatórios' });
    }

    const db = await openDb();
    const jaExiste = await db.get('SELECT id FROM Usuarios WHERE email = ?', [email]);
    if (jaExiste) {
      return res.status(409).json({ error: 'E-mail já cadastrado' });
    }

    const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS);
    await db.run('INSERT INTO Usuarios (nome, sobrenome, email, senha) VALUES (?, ?, ?, ?)', [nome, sobrenome, email, senhaHash]);
    res.status(201).json({ statusCode: 201 });
  } catch (error) {
    console.error('Erro ao inserir usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

// Redefinição de senha (fluxo "esqueci minha senha")
export async function updateSenhaUsuario(req, res) {
  try {
    const { id } = req.params;
    const { senha } = req.body;

    if (!senha) {
      return res.status(400).json({ error: 'Nova senha é obrigatória' });
    }

    const db = await openDb();
    const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS);
    await db.run('UPDATE Usuarios SET senha = ? WHERE id = ?', [senhaHash, id]);
    res.json({ statusCode: 200 });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export async function deleteUsuario(req, res) {
  try {
    const { id } = req.params;
    const db = await openDb();
    await db.run('DELETE FROM Usuarios WHERE id = ?', [id]);
    res.json({ statusCode: 200 });
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

// Autenticação: a comparação de senha acontece só no servidor, via bcrypt
export async function loginUsuario(req, res) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: 'E-mail e senha são obrigatórios' });
    }

    const db = await openDb();
    const usuario = await db.get('SELECT * FROM Usuarios WHERE email = ?', [email]);

    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
      return res.status(401).json({ error: 'E-mail ou senha incorretos' });
    }

    res.json({ id: usuario.id, nome: usuario.nome, sobrenome: usuario.sobrenome, email: usuario.email });
  } catch (error) {
    console.error('Erro ao autenticar usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
