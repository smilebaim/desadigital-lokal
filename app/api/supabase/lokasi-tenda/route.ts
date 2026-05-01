import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { KABUPATEN, rand, pick } from "@/lib/dummy";

export async function GET() {
  const { data, error } = await supabase
    .from("lokasi_tenda")
    .select("*")
    .order("kabupaten");

  if (!error && data && data.length > 0) {
    return NextResponse.json({ data, total: data.length, source: "supabase" });
  }

  const dummy = KABUPATEN.slice(0, 8).map((kab, i) => ({
    nama: `Tenda Pengungsian ${kab.nama}`,
    kabupaten: kab.nama,
    kecamatan: "Kecamatan " + (i + 1),
    desa: "Desa " + (i + 1),
    lat: kab.lat + (Math.random() - 0.5) * 0.05,
    lng: kab.lng + (Math.random() - 0.5) * 0.05,
    jumlah_tenda: rand(5, 50),
    kapasitas: rand(50, 500),
    jumlah_pengungsi: rand(30, 400),
    status: "aktif",
  }));
  return NextResponse.json({ data: dummy, total: dummy.length, source: "dummy" });
}
