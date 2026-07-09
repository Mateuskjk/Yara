import { formatarPreco, formatarData } from "@/lib/constants";

type Passageiro = {
  id: number;
  nome: string;
  sobrenome: string | null;
};

type Props = {
  codigo: string;
  origem: string;
  destino: string;
  siglaOrigem: string;
  siglaDestino: string;
  dataIda: Date | string;
  dataVolta: Date | string | null;
  horario: string;
  classe: string;
  companhia: string;
  valorTotal: number;
  passageiros: Passageiro[];
};

export default function TicketDigital(ticket: Props) {
  return (
    <article className="overflow-hidden rounded-3xl bg-white shadow-2xl">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between bg-river-900 px-6 py-4 text-white">
        <span className="font-extrabold tracking-widest">YARA ✦ PASSAGEM DIGITAL</span>
        <span className="rounded-full bg-sunset-400 px-4 py-1 font-mono text-sm font-bold text-river-950">
          {ticket.codigo}
        </span>
      </div>

      {/* Rota */}
      <div className="flex items-center justify-between gap-4 px-6 py-6">
        <div>
          <p className="text-4xl font-extrabold tracking-wide text-river-950">{ticket.siglaOrigem}</p>
          <p className="text-sm text-river-600">{ticket.origem}</p>
        </div>
        <div className="flex flex-1 items-center gap-2 px-2">
          <span className="h-px flex-1 border-t-2 border-dashed border-river-300" />
          <span className="text-2xl">🛳️</span>
          <span className="h-px flex-1 border-t-2 border-dashed border-river-300" />
        </div>
        <div className="text-right">
          <p className="text-4xl font-extrabold tracking-wide text-river-950">{ticket.siglaDestino}</p>
          <p className="text-sm text-river-600">{ticket.destino}</p>
        </div>
      </div>

      {/* Detalhes */}
      <dl className="grid grid-cols-2 gap-4 border-t border-dashed border-river-200 px-6 py-5 text-sm sm:grid-cols-4">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-river-400">Ida</dt>
          <dd className="font-bold text-river-950">{formatarData(ticket.dataIda)}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-river-400">Volta</dt>
          <dd className="font-bold text-river-950">
            {ticket.dataVolta ? formatarData(ticket.dataVolta) : "Somente ida"}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-river-400">Embarque</dt>
          <dd className="font-bold text-river-950">{ticket.horario}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-river-400">Classe</dt>
          <dd className="font-bold text-river-950">{ticket.classe}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-xs font-semibold uppercase tracking-wide text-river-400">Embarcação</dt>
          <dd className="font-bold text-river-950">{ticket.companhia}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-xs font-semibold uppercase tracking-wide text-river-400">
            Passageiro{ticket.passageiros.length > 1 ? "s" : ""}
          </dt>
          <dd className="font-bold text-river-950">
            {ticket.passageiros.map((p) => `${p.nome}${p.sobrenome ? ` ${p.sobrenome}` : ""}`).join(", ")}
          </dd>
        </div>
      </dl>

      {/* Rodapé com "código de barras" decorativo */}
      <div className="flex items-center justify-between gap-6 border-t border-dashed border-river-200 bg-river-50 px-6 py-4">
        <div
          aria-hidden
          className="flex h-12 flex-1 items-stretch gap-[3px] overflow-hidden opacity-80"
        >
          {ticket.codigo
            .repeat(4)
            .split("")
            .map((char, i) => (
              <span
                key={i}
                className="bg-river-950"
                style={{ width: (char.charCodeAt(0) % 3) + 1 }}
              />
            ))}
        </div>
        <div className="text-right">
          <p className="text-xs text-river-500">Total pago</p>
          <p className="text-xl font-extrabold text-river-800">{formatarPreco(ticket.valorTotal)}</p>
        </div>
      </div>
    </article>
  );
}
