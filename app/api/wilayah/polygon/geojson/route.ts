import { NextResponse } from "next/server";
import { buildFeature, getPolygonItems } from "@/lib/polygon-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const level = parseInt(searchParams.get("level") || "2");
  const parent = searchParams.get("parent") || "11";

  const items = getPolygonItems(level, parent);
  const features = items.map((item) => buildFeature(item));

  return NextResponse.json({
    polygons: { type: "FeatureCollection", features },
    summary: { level, parent, total: features.length },
    total: features.length,
  });
}
