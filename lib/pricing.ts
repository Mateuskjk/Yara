import {
  DESTINOS_FALLBACK,
  COMPANHIAS_FALLBACK,
  HORARIOS,
  MULTIPLICADOR_CLASSE,
  MULTIPLICADOR_IDA_E_VOLTA,
  type Classe,
} from "./constants";
import { prisma } from "./prisma";

export type OpcaoPassagem = {
  companhia: string;
  horario: string;
  classe: Classe;
  // valor por passageiro, em centavos
  valorUnitario: number;
};

async function getPrecoBase(destino: string): Promise<number> {
  try {
    const d = await prisma.destination.findUnique({ where: { nome: destino } });
    if (d) return d.precoBase;
  } catch {
    // banco indisponível — cai no fallback
  }
  return DESTINOS_FALLBACK.find((d) => d.nome === destino)?.precoBase ?? 15000;
}

async function getCompanhias(): Promise<string[]> {
  try {
    const companhias = await prisma.company.findMany();
    if (companhias.length > 0) return companhias.map((c) => c.nome);
  } catch {
    // banco indisponível — cai no fallback
  }
  return COMPANHIAS_FALLBACK;
}

export async function getSigla(nome: string): Promise<string> {
  try {
    const d = await prisma.destination.findUnique({ where: { nome } });
    if (d) return d.sigla;
  } catch {
    // banco indisponível — cai no fallback
  }
  return DESTINOS_FALLBACK.find((d) => d.nome === nome)?.sigla ?? nome.slice(0, 3).toUpperCase();
}

// Gera as opções de embarcação para uma busca. Cada companhia sai em um
// horário com uma pequena variação de preço sobre o preço-base do destino.
export async function gerarOpcoes(params: {
  destino: string;
  classe: Classe;
  idaEVolta: boolean;
}): Promise<OpcaoPassagem[]> {
  const [precoBase, companhias] = await Promise.all([
    getPrecoBase(params.destino),
    getCompanhias(),
  ]);

  const variacoes = [0.92, 1, 1.18];
  const multiplicador =
    (MULTIPLICADOR_CLASSE[params.classe] ?? 1) *
    (params.idaEVolta ? MULTIPLICADOR_IDA_E_VOLTA : 1);

  return variacoes.map((variacao, i) => ({
    companhia: companhias[i % companhias.length],
    horario: HORARIOS[i % HORARIOS.length],
    classe: params.classe,
    valorUnitario: Math.round(precoBase * multiplicador * variacao),
  }));
}
