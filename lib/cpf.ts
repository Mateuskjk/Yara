import { prisma } from "./prisma";

// Normaliza um CPF para somente dígitos; retorna null se não tiver 11 dígitos
export function normalizarCpf(cpf: unknown): string | null {
  if (typeof cpf !== "string") return null;
  const digitos = cpf.replace(/\D/g, "");
  return digitos.length === 11 ? digitos : null;
}

// Vincula ao usuário as reservas feitas sem login cujo CPF de algum
// passageiro seja o CPF da conta. Chamado no cadastro e no login.
export async function vincularReservasPorCpf(userId: number, cpf: string | null): Promise<number> {
  if (!cpf) return 0;
  const resultado = await prisma.booking.updateMany({
    where: {
      userId: null,
      passageiros: { some: { cpf } },
    },
    data: { userId },
  });
  return resultado.count;
}
