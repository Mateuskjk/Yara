// Horários de saída das embarcações (fixos por enquanto)
export const HORARIOS = ["06:00", "11:30", "18:00"] as const;

export const CLASSES = ["Econômica", "Executiva"] as const;
export type Classe = (typeof CLASSES)[number];

// Multiplicadores de preço sobre o preço-base do destino (em centavos)
export const MULTIPLICADOR_CLASSE: Record<Classe, number> = {
  Econômica: 1,
  Executiva: 1.5,
};

// Ida e volta custa menos que duas passagens avulsas
export const MULTIPLICADOR_IDA_E_VOLTA = 1.9;

// Fallback usado quando o banco ainda não foi populado (mesmos dados do seed)
export const DESTINOS_FALLBACK = [
  { nome: "Manaus", sigla: "MAO", precoBase: 10000, imagem: "/destinos/manaus.jpeg" },
  { nome: "Belém", sigla: "BEL", precoBase: 15000, imagem: "/destinos/belem.jpg" },
  { nome: "Santarém", sigla: "STM", precoBase: 18000, imagem: "/destinos/santarem.jpg" },
  { nome: "Parintins", sigla: "PIN", precoBase: 30000, imagem: "/destinos/parintins.jpg" },
  { nome: "Coari", sigla: "CIZ", precoBase: 22000, imagem: "/destinos/coari.jpeg" },
  { nome: "Manacapuru", sigla: "MCP", precoBase: 13000, imagem: "/destinos/manacapuru.jpg" },
  { nome: "Itacoatiara", sigla: "ITA", precoBase: 9000, imagem: "/destinos/itacoatiara.jpg" },
  { nome: "Porto Velho", sigla: "PVH", precoBase: 20000, imagem: "/destinos/porto-velho.jpg" },
  { nome: "Rio Branco", sigla: "RBR", precoBase: 15000, imagem: "/destinos/rio-branco.jpg" },
  { nome: "Macapá", sigla: "MCZ", precoBase: 15000, imagem: "/destinos/macapa.jpeg" },
];

export const COMPANHIAS_FALLBACK = [
  "Navegação Rio Negro",
  "Expresso Solimões",
  "Amazon Star",
  "F/B Estrela do Norte",
];

export function formatarPreco(centavos: number): string {
  return (centavos / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatarData(data: Date | string): string {
  return new Date(data).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
