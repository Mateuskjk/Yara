import { openDb } from '../configDB.js';

export async function createTablePassageiros() {
  try {
    const db = await openDb();
    await db.exec('CREATE TABLE IF NOT EXISTS InformationPassenger ( id INTEGER PRIMARY KEY, nome TEXT NOT NULL, sobrenome TEXT, cpf TEXT, rg TEXT, idade TEXT, email TEXT)');
  } catch (error) {
    console.error('Erro ao criar tabela InformationPassenger:', error);
  }
}

export async function selectPassageiros(req, res) {
  try {
    const db = await openDb();
    const passageiros = await db.all('SELECT * FROM InformationPassenger');
    res.json(passageiros);
  } catch (error) {
    console.error('Erro ao selecionar passageiros:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export async function selectPassageiro(req, res) {
  try {
    const { id } = req.params;
    const db = await openDb();
    const passageiro = await db.get('SELECT * FROM InformationPassenger WHERE id = ?', [id]);

    if (passageiro) {
      res.json(passageiro);
    } else {
      res.status(404).json({ error: 'Passageiro não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao selecionar passageiro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

// Último passageiro cadastrado — usado na emissão da passagem digital
export async function selectUltimoPassageiro(req, res) {
  try {
    const db = await openDb();
    const passageiro = await db.get('SELECT * FROM InformationPassenger ORDER BY id DESC LIMIT 1');

    if (passageiro) {
      res.json(passageiro);
    } else {
      res.status(404).json({ error: 'Nenhum passageiro cadastrado' });
    }
  } catch (error) {
    console.error('Erro ao selecionar último passageiro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export async function insertPassageiros(req, res) {
  try {
    // Aceita um passageiro único ou um array de passageiros
    const passageiros = Array.isArray(req.body) ? req.body : [req.body];

    if (passageiros.length === 0 || passageiros.some(p => !p.nome)) {
      return res.status(400).json({ error: 'Cada passageiro precisa de ao menos o campo "nome"' });
    }

    const db = await openDb();
    for (const p of passageiros) {
      await db.run('INSERT INTO InformationPassenger (nome, sobrenome, cpf, rg, idade, email) VALUES (?, ?, ?, ?, ?, ?)', [p.nome, p.sobrenome, p.cpf, p.rg, p.idade, p.email]);
    }

    res.status(201).json({ statusCode: 201 });
  } catch (error) {
    console.error('Erro ao inserir passageiros:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export async function updatePassageiro(req, res) {
  try {
    const { id } = req.params;
    const p = req.body;
    const db = await openDb();
    await db.run('UPDATE InformationPassenger SET nome = ?, sobrenome = ?, cpf = ?, rg = ?, idade = ?, email = ? WHERE id = ?', [p.nome, p.sobrenome, p.cpf, p.rg, p.idade, p.email, id]);
    res.json({ statusCode: 200 });
  } catch (error) {
    console.error('Erro ao atualizar passageiro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export async function deletePassageiro(req, res) {
  try {
    const { id } = req.params;
    const db = await openDb();
    await db.run('DELETE FROM InformationPassenger WHERE id = ?', [id]);
    res.json({ statusCode: 200 });
  } catch (error) {
    console.error('Erro ao excluir passageiro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
