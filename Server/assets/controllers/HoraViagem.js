import { openDb } from '../configDB.js';

export async function createTableHoraViagem() {
  try {
    const db = await openDb();
    await db.exec('CREATE TABLE IF NOT EXISTS HoraViagens ( id INTEGER PRIMARY KEY, Time TEXT NOT NULL)');
  } catch (error) {
    console.error('Erro ao criar tabela HoraViagens:', error);
  }
}

export async function selectHoraViagens(req, res) {
  try {
    const db = await openDb();
    const horarios = await db.all('SELECT * FROM HoraViagens');
    res.json(horarios);
  } catch (error) {
    console.error('Erro ao selecionar horários:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export async function selectHoraViagem(req, res) {
  try {
    const { id } = req.params;
    const db = await openDb();
    const horario = await db.get('SELECT * FROM HoraViagens WHERE id = ?', [id]);

    if (horario) {
      res.json(horario);
    } else {
      res.status(404).json({ error: 'Horário não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao selecionar horário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export async function insertHoraViagem(req, res) {
  try {
    const { Time } = req.body;

    if (!Time) {
      return res.status(400).json({ error: 'Campo "Time" é obrigatório' });
    }

    const db = await openDb();
    await db.run('INSERT INTO HoraViagens (Time) VALUES (?)', [Time]);
    res.status(201).json({ statusCode: 201 });
  } catch (error) {
    console.error('Erro ao inserir horário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export async function updateHoraViagem(req, res) {
  try {
    const { id } = req.params;
    const { Time } = req.body;
    const db = await openDb();
    await db.run('UPDATE HoraViagens SET Time = ? WHERE id = ?', [Time, id]);
    res.json({ statusCode: 200 });
  } catch (error) {
    console.error('Erro ao atualizar horário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export async function deleteHoraViagem(req, res) {
  try {
    const { id } = req.params;
    const db = await openDb();
    await db.run('DELETE FROM HoraViagens WHERE id = ?', [id]);
    res.json({ statusCode: 200 });
  } catch (error) {
    console.error('Erro ao excluir horário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
