import { NextResponse } from "next/server";
import { KABUPATEN, rand } from "@/lib/dummy";
export async function GET() {
  const data = KABUPATEN.flatMap((kab,i)=>
    Array.from({length:rand(1,3)},(_,j)=>({
      id: `PSK-${kab.id}-${j}`,
      nama: `Posko ${kab.nama} ${j+1}`,
      kabupaten_kota: kab.nama,
      kecamatan: `Kec. ${j+1}`,
      alamat: `Jl. Banda Aceh No.${rand(1,99)}, ${kab.nama}`,
      lat: kab.lat+(Math.random()-0.5)*0.25,
      lng: kab.lng+(Math.random()-0.5)*0.25,
      jumlah_pengungsi: rand(50,600),
      jumlah_kk: rand(15,180),
      kapasitas: rand(100,800),
      status: "aktif",
      titik_pengungsian: rand(1,5),
    }))
  );
  const summary = {
    total: data.length,
    total_pengungsi: data.reduce((a,b)=>a+b.jumlah_pengungsi,0),
    titik_pengungsian: data.reduce((a,b)=>a+b.titik_pengungsian,0),
  };
  return NextResponse.json({ data, summary, total: data.length });
}
