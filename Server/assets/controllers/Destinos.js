import { openDb } from '../configDB.js';

export async function createTableDestinos() {
  try {
    const db = await openDb();
    await db.exec('CREATE TABLE IF NOT EXISTS Destinos ( id INTEGER PRIMARY KEY, destino TEXT NOT NULL)');
  } catch (error) {
    console.error('Erro ao criar tabela Destinos:', error);
  }
}

export async function selectDestinos(req, res) {
  try {
    const db = await openDb();
    const destinos = await db.all('SELECT * FROM Destinos');
    res.json(destinos);
  } catch (error) {
    console.error('Erro ao selecionar destinos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export async function selectDestino(req, res) {
  try {
    const { id } = req.params;
    const db = await openDb();
    const destino = await db.get('SELECT * FROM Destinos WHERE id = ?', [id]);

    if (destino) {
      res.json(destino);
    } else {
      res.status(404).json({ error: 'Destino não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao selecionar destino:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export async function insertDestino(req, res) {
  try {
    const { destino } = req.body;

    if (!destino) {
      return res.status(400).json({ error: 'Campo "destino" é obrigatório' });
    }

    const db = await openDb();
    await db.run('INSERT INTO Destinos (destino) VALUES (?)', [destino]);
    res.status(201).json({ statusCode: 201 });
  } catch (error) {
    console.error('Erro ao inserir destino:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export async function updateDestino(req, res) {
  try {
    const { id } = req.params;
    const { destino } = req.body;
    const db = await openDb();
    await db.run('UPDATE Destinos SET destino = ? WHERE id = ?', [destino, id]);
    res.json({ statusCode: 200 });
  } catch (error) {
    console.error('Erro ao atualizar destino:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export async function deleteDestino(req, res) {
  try {
    const { id } = req.params;
    const db = await openDb();
    await db.run('DELETE FROM Destinos WHERE id = ?', [id]);
    res.json({ statusCode: 200 });
  } catch (error) {
    console.error('Erro ao excluir destino:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
