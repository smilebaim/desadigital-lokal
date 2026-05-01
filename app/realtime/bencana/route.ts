import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { KABUPATEN, rand } from "@/lib/dummy";

export async function GET() {
  const { data, error } = await supabase
    .from("bencana")
    .select("*")
    .order("updated_at", { ascending: false });

  if (!error && data && data.length > 0) {
    const mapped = data.map((d) => ({
      id: `BNC-${d.id}`,
      kabupaten_kota: d.kabupaten,
      kabkota: d.kabupaten,
      kecamatan: d.kecamatan,
      desa: d.desa,
      jenis_bencana: d.jenis || "Banjir",
      status: d.status || "aktif",
      lat: d.lat,
      lng: d.lng,
      korban_meninggal: d.jumlah_korban || 0,
      korban_luka: 0,
      korban_hilang: 0,
      pengungsi: d.jumlah_pengungsi || 0,
      rumah_rusak_berat: Math.round((d.rumah_rusak || 0) * 0.3),
      rumah_rusak_sedang: Math.round((d.rumah_rusak || 0) * 0.4),
      rumah_rusak_ringan: Math.round((d.rumah_rusak || 0) * 0.3),
      sawah_ha: d.luas_sawah || 0,
      kebun_ha: d.luas_kebun || 0,
      tambak_ha: d.luas_tambak || 0,
      fasum_rusak: 0,
      tanggal: d.created_at?.split("T")[0] || "2026-04-28",
      updated_at: d.updated_at,
    }));
    return NextResponse.json({ data: mapped, total: mapped.length, updated_at: new Date().toISOString(), source: "supabase" });
  }

  // Fallback dummy
  const affected = KABUPATEN.filter((_, i) => i < 12);
  const dummy = affected.flatMap((kab) => {
    const count = rand(1, 3);
    return Array.from({ length: count }, (_, j) => ({
      id: `BNC-${kab.id}-${j + 1}`,
      kabupaten_kota: kab.nama, kabkota: kab.nama,
      kecamatan: `Kec. ${["Mutiara","Johan Pahlawan","Bebesen","Kuta Makmur","Peusangan"][j % 5]}`,
      desa: `Desa ${["Paya","Blang","Meureudu","Langkak","Pasie"][j % 5]} ${j + 1}`,
      jenis_bencana: "Banjir", status: ["critical","warning","normal"][j % 3],
      lat: kab.lat + (Math.random() - 0.5) * 0.3,
      lng: kab.lng + (Math.random() - 0.5) * 0.3,
      korban_meninggal: rand(0, 5), korban_luka: rand(0, 20), korban_hilang: rand(0, 3),
      pengungsi: rand(50, 800), rumah_rusak_berat: rand(0, 50),
      rumah_rusak_sedang: rand(0, 80), rumah_rusak_ringan: rand(0, 120),
      sawah_ha: parseFloat((Math.random() * 50).toFixed(1)),
      kebun_ha: parseFloat((Math.random() * 30).toFixed(1)),
      tambak_ha: parseFloat((Math.random() * 20).toFixed(1)),
      fasum_rusak: rand(0, 10), tanggal: "2026-04-28",
      updated_at: new Date().toISOString(),
    }));
  });
  return NextResponse.json({ data: dummy, total: dummy.length, updated_at: new Date().toISOString(), source: "dummy" });
}
