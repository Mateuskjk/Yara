import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto bg-river-950 text-river-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <Image
            src="/brand/logo.png"
            alt="Yara"
            width={120}
            height={44}
            className="h-10 w-auto brightness-0 invert"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-river-300">
            Conectando as cidades da Amazônia pelos seus rios. Passagens
            fluviais digitais, seguras e com preço justo.
          </p>
        </div>

        <div>
          <h3 className="mb-3 font-semibold text-white">Navegação</h3>
          <ul className="space-y-2 text-sm text-river-300">
            <li><Link href="/" className="hover:text-sunset-300">Início</Link></li>
            <li><Link href="/#destinos" className="hover:text-sunset-300">Destinos</Link></li>
            <li><Link href="/#como-funciona" className="hover:text-sunset-300">Como funciona</Link></li>
            <li><Link href="/minhas-viagens" className="hover:text-sunset-300">Minhas viagens</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-semibold text-white">Projeto</h3>
          <p className="text-sm leading-relaxed text-river-300">
            Yara nasceu como Trabalho de Conclusão de Curso em Análise e
            Desenvolvimento de Sistemas, por Mateus Silva e Tarcisio Sousa —
            Manaus/AM 🇧🇷
          </p>
          <a
            href="https://github.com/Mateuskjk/Yara"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-semibold text-sunset-300 hover:text-sunset-400"
          >
            Ver no GitHub →
          </a>
        </div>
      </div>
      <div className="border-t border-river-900 py-4 text-center text-xs text-river-400">
        © {new Date().getFullYear()} Yara Passagens — projeto acadêmico, compras são simuladas.
      </div>
    </footer>
  );
}
