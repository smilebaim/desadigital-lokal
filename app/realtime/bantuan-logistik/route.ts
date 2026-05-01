import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { KABUPATEN, rand, pick } from "@/lib/dummy";

export async function GET() {
  const { data, error } = await supabase
    .from("bantuan_logistik")
    .select("*")
    .order("kabupaten");

  if (!error && data && data.length > 0) {
    const kuning = data.filter((d) => d.status === "kuning").length;
    const biru = data.filter((d) => d.status === "biru").length;
    const abu = data.filter((d) => d.status === "biru_keabuan").length;
    const putih = data.filter((d) => d.status === "putih").length;
    return NextResponse.json({ data, total: data.length, kuning, biru, abu, putih, source: "supabase" });
  }

  const satuan = ["Paket Sembako","Selimut","Tenda","Air Bersih","Obat-obatan"];
  const status = ["kuning","biru","biru_keabuan","putih"];
  const dummy = Array.from({ length: 20 }, (_, i) => {
    const kab = pick(KABUPATEN);
    return {
      desa: `Desa ${i + 1}`, kecamatan: `Kecamatan ${i + 1}`,
      kabupaten: kab.nama, satuan: pick(satuan),
      jumlah: rand(50, 500), status: pick(status),
      lat: kab.lat + (Math.random() - 0.5) * 0.2,
      lng: kab.lng + (Math.random() - 0.5) * 0.2,
    };
  });
  return NextResponse.json({
    data: dummy, total: dummy.length,
    kuning: dummy.filter((d) => d.status === "kuning").length,
    biru: dummy.filter((d) => d.status === "biru").length,
    abu: dummy.filter((d) => d.status === "biru_keabuan").length,
    putih: dummy.filter((d) => d.status === "putih").length,
    source: "dummy",
  });
}
