import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Steps from "@/components/Steps";
import FormPassageiros from "./FormPassageiros";

export const metadata = { title: "Dados dos passageiros" };

export default async function PassageirosPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const pax = Math.max(1, Number(params.pax) || 1);
  const query = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== undefined) as [string, string][]
  ).toString();

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-20 pt-8">
        <Steps atual={2} />
        <h1 className="mt-10 text-2xl font-bold text-river-950">Quem vai viajar?</h1>
        <p className="mt-1 text-sm text-river-700">
          Preencha os dados de cada passageiro exatamente como no documento de identidade.
        </p>
        <FormPassageiros quantidade={pax} query={query} />
      </main>
      <Footer />
    </>
  );
}
