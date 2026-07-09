const ETAPAS = ["Passagens", "Passageiros", "Pagamento", "Confirmação"];

export default function Steps({ atual }: { atual: number }) {
  return (
    <ol className="mx-auto flex max-w-2xl items-center justify-between gap-2 px-4">
      {ETAPAS.map((etapa, i) => {
        const numero = i + 1;
        const ativo = numero === atual;
        const feito = numero < atual;
        return (
          <li key={etapa} className="flex flex-1 items-center gap-2">
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition ${
                feito
                  ? "bg-river-600 text-white"
                  : ativo
                    ? "bg-sunset-400 text-river-950 shadow-md"
                    : "bg-river-100 text-river-400"
              }`}
            >
              {feito ? "✓" : numero}
            </span>
            <span
              className={`hidden text-xs font-semibold sm:block ${
                ativo ? "text-river-950" : "text-river-400"
              }`}
            >
              {etapa}
            </span>
            {numero < ETAPAS.length && (
              <span className={`h-0.5 flex-1 rounded ${feito ? "bg-river-600" : "bg-river-100"}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
