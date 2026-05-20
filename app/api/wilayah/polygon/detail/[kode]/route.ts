import { NextResponse } from "next/server";
import { buildFeature, findPolygonByKode } from "@/lib/polygon-data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ kode: string }> }
) {
  const { kode } = await params;
  const wilayah = findPolygonByKode(decodeURIComponent(kode));

  if (!wilayah) {
    return NextResponse.json({ error: "Wilayah tidak ditemukan" }, { status: 404 });
  }

  return NextResponse.json({ data: buildFeature(wilayah) });
}
