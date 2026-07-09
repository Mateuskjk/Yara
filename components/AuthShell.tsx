import Image from "next/image";
import Link from "next/link";

// Moldura compartilhada das telas de autenticação: foto do rio + cartão do formulário
export default function AuthShell({
  titulo,
  subtitulo,
  children,
}: {
  titulo: string;
  subtitulo: string;
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <Image
        src="/destinos/hero.jpg"
        alt=""
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-river-950/70 backdrop-blur-[2px]" />

      <div className="relative z-10 w-full max-w-md">
        <Link href="/" className="mb-6 flex justify-center">
          <Image
            src="/brand/logo.png"
            alt="Yara"
            width={130}
            height={48}
            className="h-11 w-auto brightness-0 invert"
          />
        </Link>

        <div className="rounded-3xl bg-white p-8 shadow-2xl">
          <h1 className="text-2xl font-bold text-river-950">{titulo}</h1>
          <p className="mt-1 text-sm text-river-700">{subtitulo}</p>
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </main>
  );
}
