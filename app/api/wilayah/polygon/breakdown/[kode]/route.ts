import { NextResponse } from "next/server";
import { findPolygonByKode, getPolygonItems } from "@/lib/polygon-data";

const pseudo = (text: string, min: number, max: number) => {
  const seed = text.split("").reduce((s, c) => s + c.charCodeAt(0), 0);
  return min + (seed % (max - min + 1));
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ kode: string }> }
) {
  const { kode } = await params;
  const decodedKode = decodeURIComponent(kode);
  const wilayah = findPolygonByKode(decodedKode);

  if (!wilayah) {
    return NextResponse.json({ error: "Wilayah tidak ditemukan" }, { status: 404 });
  }

  const childLevel = wilayah.level >= 4 ? 4 : wilayah.level + 1;
  const children = getPolygonItems(childLevel, wilayah.kode).map((c) => ({
    kode: c.kode,
    nama: c.nama,
    level: c.level,
    affected_population: pseudo(`${c.kode}-affected`, 50, 2500),
    posko_count: pseudo(`${c.kode}-posko`, 0, 8),
    total_desa: c.level === 3 ? pseudo(`${c.kode}-desa`, 8, 28) : undefined,
  }));

  const summary = {
    total_terdampak: children.reduce((sum, c) => sum + (c.affected_population || 0), 0),
    total_posko: children.reduce((sum, c) => sum + (c.posko_count || 0), 0),
  };

  return NextResponse.json({
    wilayah: { kode: wilayah.kode, nama: wilayah.nama, level: wilayah.level },
    children,
    summary,
  });
}
