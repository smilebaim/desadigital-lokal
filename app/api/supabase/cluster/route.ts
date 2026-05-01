import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { KABUPATEN, SEKTOR, rand, pick } from "@/lib/dummy";

export async function GET() {
  const { data, error } = await supabase
    .from("cluster_data")
    .select("*")
    .order("sektor");

  if (!error && data && data.length > 0) {
    const totalKerusakan = data.reduce((a, b) => a + (b.total_kerusakan || 0), 0);
    const totalKerugian = data.reduce((a, b) => a + (b.total_kerugian || 0), 0);
    const sektorBreakdown = SEKTOR.map((s) => {
      const items = data.filter((d) => d.sektor === s);
      return {
        sektor: s,
        total_kerusakan: items.reduce((a, b) => a + (b.total_kerusakan || 0), 0),
        total_kerugian: items.reduce((a, b) => a + (b.total_kerugian || 0), 0),
        count: items.length,
      };
    }).filter((s) => s.count > 0);

    return NextResponse.json({
      data, totalKerusakan, totalKerugian,
      totalKerusakanKerugian: totalKerusakan + totalKerugian,
      sektorBreakdown, source: "supabase",
    });
  }

  // Fallback dummy
  const dummy = SEKTOR.map((s) => ({
    sektor: s,
    total_kerusakan: rand(500000000, 10000000000),
    total_kerugian: rand(100000000, 3000000000),
    count: rand(1, 5),
    kabupaten: pick(KABUPATEN).nama,
  }));
  const totalKerusakan = dummy.reduce((a, b) => a + b.total_kerusakan, 0);
  const totalKerugian = dummy.reduce((a, b) => a + b.total_kerugian, 0);
  return NextResponse.json({
    data: dummy, totalKerusakan, totalKerugian,
    totalKerusakanKerugian: totalKerusakan + totalKerugian,
    sektorBreakdown: dummy, source: "dummy",
  });
}
