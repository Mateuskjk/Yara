import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Steps from "@/components/Steps";
import FormPagamento from "./FormPagamento";

export const metadata = { title: "Pagamento" };

export default async function PagamentoPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 pb-20 pt-8">
        <Steps atual={3} />
        <FormPagamento
          origem={params.origem ?? ""}
          destino={params.destino ?? ""}
          ida={params.ida ?? ""}
          volta={params.volta ?? ""}
          classe={params.classe ?? "Econômica"}
          companhia={params.companhia ?? ""}
          horario={params.horario ?? ""}
          valorUnitario={Number(params.valor) || 0}
          pax={Math.max(1, Number(params.pax) || 1)}
        />
      </main>
      <Footer />
    </>
  );
}
