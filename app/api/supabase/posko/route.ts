import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { KABUPATEN, SEKTOR, rand, pick } from "@/lib/dummy";

export async function GET() {
  const { data, error } = await supabase
    .from("posko")
    .select("*")
    .order("kabupaten");

  if (!error && data && data.length > 0) {
    const totalPosko = data.length;
    const totalPengungsi = data.reduce((a, b) => a + (b.jumlah_pengungsi || 0), 0);
    const titikPengungsian = data.reduce((a, b) => a + (b.jumlah_kk || 0), 0);
    return NextResponse.json({ data, totalPosko, totalPengungsi, titikPengungsian, source: "supabase" });
  }

  // Fallback dummy
  const dummy = KABUPATEN.slice(0, 10).map((kab) => ({
    nama: `Posko ${kab.nama}`,
    kabupaten: kab.nama,
    jumlah_pengungsi: rand(50, 500),
    jumlah_kk: rand(15, 120),
    kapasitas: rand(100, 600),
    lat: kab.lat + (Math.random() - 0.5) * 0.05,
    lng: kab.lng + (Math.random() - 0.5) * 0.05,
    status: "aktif",
  }));
  return NextResponse.json({
    data: dummy,
    totalPosko: dummy.length,
    totalPengungsi: dummy.reduce((a, b) => a + b.jumlah_pengungsi, 0),
    titikPengungsian: dummy.reduce((a, b) => a + b.jumlah_kk, 0),
    source: "dummy",
  });
}
