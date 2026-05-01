import { NextResponse } from "next/server";
import { KABUPATEN, rand } from "@/lib/dummy";
export async function GET() {
  const types = ["Jembatan","Jalan","Gedung Sekolah","Kantor Desa","Mesjid","Pasar"];
  const data = KABUPATEN.flatMap((kab)=>
    Array.from({length:rand(2,5)},(_,j)=>({
      id: `FP-${kab.id}-${j}`,
      nama: `${types[j%types.length]} ${kab.nama} ${j+1}`,
      tipe: types[j%types.length],
      kabupaten_kota: kab.nama,
      kecamatan: `Kec. ${j+1}`,
      lat: kab.lat+(Math.random()-0.5)*0.3,
      lng: kab.lng+(Math.random()-0.5)*0.3,
      kondisi: ["rusak_berat","rusak_sedang","rusak_ringan"][j%3],
      nilai_kerusakan: rand(10000000,2000000000),
    }))
  );
  return NextResponse.json({ data, total: data.length });
}
