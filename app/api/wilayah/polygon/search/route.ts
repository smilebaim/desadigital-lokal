import { NextResponse } from "next/server";
import { getPolygonItems } from "@/lib/polygon-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").toLowerCase();
  const limit = Math.max(1, Math.min(100, parseInt(searchParams.get("limit") || "20")));

  const merged = [
    ...getPolygonItems(2, "11"),
    ...getPolygonItems(3, "11"),
    ...getPolygonItems(4, "11"),
  ];

  const results = merged
    .filter((w) => w.nama.toLowerCase().includes(q))
    .slice(0, limit)
    .map((w) => ({
      kode: w.kode,
      nama: w.nama,
      level: w.level,
      parent: w.parent,
    }));

  return NextResponse.json({ data: results, total: results.length });
}
