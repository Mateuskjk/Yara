import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { DESTINOS_FALLBACK } from "@/lib/constants";

export async function GET() {
  try {
    const destinos = await prisma.destination.findMany({ orderBy: { nome: "asc" } });
    if (destinos.length > 0) {
      return NextResponse.json(destinos);
    }
    return NextResponse.json(DESTINOS_FALLBACK);
  } catch {
    // Banco indisponível ou ainda não migrado — usa a lista estática
    return NextResponse.json(DESTINOS_FALLBACK);
  }
}
