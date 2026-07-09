import { openDb } from '../configDB.js';

export async function createTableCompanhias() {
  try {
    const db = await openDb();
    await db.exec('CREATE TABLE IF NOT EXISTS Companhias ( id INTEGER PRIMARY KEY, empresa TEXT NOT NULL)');
  } catch (error) {
    console.error('Erro ao criar tabela Companhias:', error);
  }
}

export async function selectCompanhias(req, res) {
  try {
    const db = await openDb();
    const companhias = await db.all('SELECT * FROM Companhias');
    res.json(companhias);
  } catch (error) {
    console.error('Erro ao selecionar companhias:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export async function selectCompanhia(req, res) {
  try {
    const { id } = req.params;
    const db = await openDb();
    const companhia = await db.get('SELECT * FROM Companhias WHERE id = ?', [id]);

    if (companhia) {
      res.json(companhia);
    } else {
      res.status(404).json({ error: 'Companhia não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao selecionar companhia:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export async function insertCompanhia(req, res) {
  try {
    const { empresa } = req.body;

    if (!empresa) {
      return res.status(400).json({ error: 'Campo "empresa" é obrigatório' });
    }

    const db = await openDb();
    await db.run('INSERT INTO Companhias (empresa) VALUES (?)', [empresa]);
    res.status(201).json({ statusCode: 201 });
  } catch (error) {
    console.error('Erro ao inserir companhia:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export async function updateCompanhia(req, res) {
  try {
    const { id } = req.params;
    const { empresa } = req.body;
    const db = await openDb();
    await db.run('UPDATE Companhias SET empresa = ? WHERE id = ?', [empresa, id]);
    res.json({ statusCode: 200 });
  } catch (error) {
    console.error('Erro ao atualizar companhia:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export async function deleteCompanhia(req, res) {
  try {
    const { id } = req.params;
    const db = await openDb();
    await db.run('DELETE FROM Companhias WHERE id = ?', [id]);
    res.json({ statusCode: 200 });
  } catch (error) {
    console.error('Erro ao excluir companhia:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
