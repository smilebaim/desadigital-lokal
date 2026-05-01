import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { KABUPATEN, rand, pick } from "@/lib/dummy";

export async function GET() {
  const { data, error } = await supabase
    .from("orang_hilang")
    .select("*")
    .order("created_at", { ascending: false });

  if (!error && data && data.length > 0) {
    const ongoing = data.filter((d) => d.status === "dicari").length;
    const found = data.filter((d) => d.status === "ditemukan").length;
    return NextResponse.json({ data, total: data.length, ongoing, found, source: "supabase" });
  }

  // Fallback dummy
  const namaL = ["Mukhtar","Ridwan","Ibrahim","Ahmad","Hasan"];
  const namaP = ["Fatimah","Nurhasanah","Aisyah","Khadijah","Zainab"];
  const dummy = Array.from({ length: 6 }, (_, i) => {
    const kab = pick(KABUPATEN);
    const jk = i % 2 === 0 ? "L" : "P";
    const status = pick(["dicari","ditemukan","dicari"]);
    return {
      nama: jk === "L" ? pick(namaL) + " bin " + pick(namaL) : pick(namaP) + " binti " + pick(namaL),
      usia: rand(15, 65),
      jenis_kelamin: jk,
      kabupaten: kab.nama,
      kecamatan: "Kecamatan " + (i + 1),
      desa: "Desa " + (i + 1),
      status,
      keterangan: status === "dicari" ? "Terakhir terlihat saat bencana" : "Ditemukan selamat",
    };
  });
  return NextResponse.json({
    data: dummy, total: dummy.length,
    ongoing: dummy.filter((d) => d.status === "dicari").length,
    found: dummy.filter((d) => d.status === "ditemukan").length,
    source: "dummy",
  });
}
