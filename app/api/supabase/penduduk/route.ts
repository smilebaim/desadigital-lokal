import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { KABUPATEN, rand } from "@/lib/dummy";

export async function GET() {
  // Coba ambil dari Supabase
  const { data, error } = await supabase
    .from("penduduk")
    .select("*")
    .order("kabupaten");

  if (!error && data && data.length > 0) {
    const mapped = data.map((r) => ({
      kabupaten_kota: r.kabupaten,
      total_penduduk: r.total_penduduk,
      total_kk: r.total_kk,
      disabilitas: r.disabilitas,
      jumlah_pengungsi: r.jumlah_pengungsi,
      lat: r.lat,
      lng: r.lng,
    }));
    const summary = {
      total_penduduk: mapped.reduce((a, b) => a + b.total_penduduk, 0),
      total_kk: mapped.reduce((a, b) => a + b.total_kk, 0),
      total_disabilitas: mapped.reduce((a, b) => a + b.disabilitas, 0),
      total_pengungsi: mapped.reduce((a, b) => a + b.jumlah_pengungsi, 0),
    };
    return NextResponse.json({ data: mapped, summary, total: mapped.length, source: "supabase" });
  }

  // Fallback dummy
  const dummy = KABUPATEN.map((kab) => ({
    kabupaten_kota: kab.nama,
    total_penduduk: rand(50000, 400000),
    total_kk: rand(12000, 100000),
    disabilitas: rand(100, 2000),
    jumlah_pengungsi: rand(0, 5000),
    lat: kab.lat, lng: kab.lng,
  }));
  const summary = {
    total_penduduk: dummy.reduce((a, b) => a + b.total_penduduk, 0),
    total_kk: dummy.reduce((a, b) => a + b.total_kk, 0),
    total_disabilitas: dummy.reduce((a, b) => a + b.disabilitas, 0),
    total_pengungsi: dummy.reduce((a, b) => a + b.jumlah_pengungsi, 0),
  };
  return NextResponse.json({ data: dummy, summary, total: dummy.length, source: "dummy" });
}
