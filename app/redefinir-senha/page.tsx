import AuthShell from "@/components/AuthShell";
import FormRedefinir from "./FormRedefinir";

export default async function RedefinirSenhaPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  return (
    <AuthShell titulo="Nova senha" subtitulo="Escolha sua nova senha de acesso.">
      <FormRedefinir token={token ?? ""} />
    </AuthShell>
  );
}
