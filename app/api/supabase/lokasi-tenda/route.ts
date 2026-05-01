import { NextResponse } from "next/server";
import { KABUPATEN, rand } from "@/lib/dummy";
export async function GET() {
  const data = KABUPATEN.slice(0,12).flatMap((kab,i)=>
    Array.from({length:rand(1,3)},(_,j)=>({
      id: `TND-${kab.id}-${j}`,
      nama: `Tenda Pengungsian ${kab.nama} ${j+1}`,
      kabupaten_kota: kab.nama,
      kecamatan: `Kec. ${j+1}`,
      lat: kab.lat+(Math.random()-0.5)*0.2,
      lng: kab.lng+(Math.random()-0.5)*0.2,
      kapasitas: rand(50,200),
      terisi: rand(20,150),
      kondisi: ["baik","rusak_ringan"][j%2],
      sumber: ["BNPB","PMI","TNI","Swadaya"][j%4],
    }))
  );
  return NextResponse.json({ data, total: data.length });
}
