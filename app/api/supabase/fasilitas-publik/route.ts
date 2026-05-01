import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { KABUPATEN, rand, pick } from "@/lib/dummy";

export async function GET() {
  const { data, error } = await supabase
    .from("fasilitas_publik")
    .select("*")
    .order("kabupaten");

  if (!error && data && data.length > 0) {
    return NextResponse.json({ data, total: data.length, source: "supabase" });
  }

  const jenis = ["jembatan","jalan","sekolah","masjid","kantor","pasar"];
  const kondisi = ["rusak_berat","rusak_sedang","rusak_ringan"];
  const dummy = Array.from({ length: 10 }, (_, i) => {
    const kab = pick(KABUPATEN);
    return {
      nama: `${pick(jenis)} ${kab.nama} ${i + 1}`,
      jenis: pick(jenis),
      kabupaten: kab.nama,
      kecamatan: "Kecamatan " + (i + 1),
      desa: "Desa " + (i + 1),
      kondisi: pick(kondisi),
      estimasi_kerugian: rand(200000000, 8000000000),
      lat: kab.lat + (Math.random() - 0.5) * 0.1,
      lng: kab.lng + (Math.random() - 0.5) * 0.1,
    };
  });
  return NextResponse.json({ data: dummy, total: dummy.length, source: "dummy" });
}
