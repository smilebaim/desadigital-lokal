import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { KABUPATEN, rand, pick } from "@/lib/dummy";

export async function GET() {
  const { data, error } = await supabase
    .from("pertanian")
    .select("*")
    .order("kabupaten");

  if (!error && data && data.length > 0) {
    const berat = data.filter((d) => d.kondisi === "berat").length;
    const sedang = data.filter((d) => d.kondisi === "sedang").length;
    const ringan = data.filter((d) => d.kondisi === "ringan").length;
    return NextResponse.json({ data, total: data.length, berat, sedang, ringan, source: "supabase" });
  }

  // Fallback dummy
  const dummy = Array.from({ length: 12 }, (_, i) => {
    const kab = pick(KABUPATEN);
    const kondisi = pick(["berat", "sedang", "ringan"] as const);
    return {
      nama: `Lahan Pertanian ${i + 1}`,
      kabupaten: kab.nama,
      kecamatan: "Kecamatan " + (i + 1),
      desa: "Desa " + (i + 1),
      jenis: pick(["sawah", "kebun", "tambak"]),
      volume: rand(10, 200),
      satuan: "Ha",
      kondisi,
      estimasi_kerugian: rand(100000000, 3000000000),
      lat: kab.lat + (Math.random() - 0.5) * 0.1,
      lng: kab.lng + (Math.random() - 0.5) * 0.1,
    };
  });
  return NextResponse.json({
    data: dummy, total: dummy.length,
    berat: dummy.filter((d) => d.kondisi === "berat").length,
    sedang: dummy.filter((d) => d.kondisi === "sedang").length,
    ringan: dummy.filter((d) => d.kondisi === "ringan").length,
    source: "dummy",
  });
}
