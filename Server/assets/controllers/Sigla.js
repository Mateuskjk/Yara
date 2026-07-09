import { openDb } from '../configDB.js';

export async function createTableSigla() {
  try {
    const db = await openDb();
    await db.exec('CREATE TABLE IF NOT EXISTS Sigla ( id INTEGER PRIMARY KEY, local TEXT NOT NULL, sigla TEXT NOT NULL)');
  } catch (error) {
    console.error('Erro ao criar tabela Sigla:', error);
  }
}

export async function selectSiglas(req, res) {
  try {
    const db = await openDb();
    const siglas = await db.all('SELECT * FROM Sigla');
    res.json(siglas);
  } catch (error) {
    console.error('Erro ao selecionar siglas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export async function selectSigla(req, res) {
  try {
    const { id } = req.params;
    const db = await openDb();
    const sigla = await db.get('SELECT * FROM Sigla WHERE id = ?', [id]);

    if (sigla) {
      res.json(sigla);
    } else {
      res.status(404).json({ error: 'Sigla não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao selecionar sigla:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export async function insertSigla(req, res) {
  try {
    const { local, sigla } = req.body;

    if (!local || !sigla) {
      return res.status(400).json({ error: 'Campos "local" e "sigla" são obrigatórios' });
    }

    const db = await openDb();
    await db.run('INSERT INTO Sigla (local, sigla) VALUES (?, ?)', [local, sigla]);
    res.status(201).json({ statusCode: 201 });
  } catch (error) {
    console.error('Erro ao inserir sigla:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export async function updateSigla(req, res) {
  try {
    const { id } = req.params;
    const { local, sigla } = req.body;
    const db = await openDb();
    await db.run('UPDATE Sigla SET local = ?, sigla = ? WHERE id = ?', [local, sigla, id]);
    res.json({ statusCode: 200 });
  } catch (error) {
    console.error('Erro ao atualizar sigla:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export async function deleteSigla(req, res) {
  try {
    const { id } = req.params;
    const db = await openDb();
    await db.run('DELETE FROM Sigla WHERE id = ?', [id]);
    res.json({ statusCode: 200 });
  } catch (error) {
    console.error('Erro ao excluir sigla:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
