import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { KABUPATEN, rand } from "@/lib/dummy";

export async function GET() {
  const { data, error } = await supabase
    .from("bantuan_logistik")
    .select("*")
    .order("kabupaten");

  if (!error && data && data.length > 0) {
    // Hitung distribusi per kabupaten
    const byKabupaten: Record<string, number> = {};
    data.forEach((d) => {
      byKabupaten[d.kabupaten] = (byKabupaten[d.kabupaten] || 0) + 1;
    });
    const kabDistrib = Object.entries(byKabupaten).map(([nama, count]) => ({ nama, count }));
    return NextResponse.json({ data, total: data.length, kabDistrib, source: "supabase" });
  }

  // Fallback: village-distribution dummy
  const dummy = KABUPATEN.map((kab) => ({
    kabupaten: kab.nama,
    total_desa: rand(20, 300),
    kuning: rand(5, 100),
    biru: rand(5, 80),
    biru_keabuan: rand(2, 40),
    putih: rand(5, 100),
    lat: kab.lat, lng: kab.lng,
  }));
  return NextResponse.json({ data: dummy, total: dummy.length, source: "dummy" });
}
