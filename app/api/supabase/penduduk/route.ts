import { NextResponse } from "next/server";
import { KABUPATEN, rand } from "@/lib/dummy";
export async function GET() {
  const data = KABUPATEN.map(kab=>({
    kabupaten_kota: kab.nama,
    total_penduduk: rand(50000,400000),
    total_kk: rand(12000,100000),
    laki_laki: rand(25000,200000),
    perempuan: rand(25000,200000),
    disabilitas: rand(100,2000),
    jumlah_pengungsi: rand(0,5000),
    lat: kab.lat, lng: kab.lng,
  }));
  const summary = {
    total_penduduk: data.reduce((a,b)=>a+b.total_penduduk,0),
    total_kk: data.reduce((a,b)=>a+b.total_kk,0),
    total_disabilitas: data.reduce((a,b)=>a+b.disabilitas,0),
    total_pengungsi: data.reduce((a,b)=>a+b.jumlah_pengungsi,0),
  };
  return NextResponse.json({ data, summary, total: data.length });
}
