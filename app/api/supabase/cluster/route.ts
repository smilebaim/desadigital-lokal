import { NextResponse } from "next/server";
import { KABUPATEN, SEKTOR, rand, pick } from "@/lib/dummy";
export async function GET() {
  const cluster6 = KABUPATEN.flatMap((kab,i)=>
    Array.from({length: rand(3,8)},(_,j)=>{
      const ker = rand(50000000,5000000000);
      const keru = rand(10000000,2000000000);
      return {
        id: `C6-${kab.id}-${j}`,
        sektor: pick(SEKTOR),
        sub_sektor: `Sub ${pick(SEKTOR)}`,
        kabupaten_kota: kab.nama,
        kecamatan: `Kec.${j+1}`,
        desa: `Desa ${j+1}`,
        lat: kab.lat+(Math.random()-0.5)*0.3,
        lng: kab.lng+(Math.random()-0.5)*0.3,
        nilai_kerusakan: ker,
        nilai_kerugian: keru,
        total_kerusakan_kerugian: ker+keru,
        status: ["kuning","biru","biru_keabuan","putih"][j%4],
        satuan: "Unit",
        volume: rand(1,50),
      };
    })
  );
  const cluster1 = KABUPATEN.map(kab=>({
    id: `C1-${kab.id}`, kabupaten_kota: kab.nama,
    lat: kab.lat, lng: kab.lng,
    korban_meninggal: rand(0,8), korban_luka: rand(0,30),
    pengungsi: rand(0,1000), rumah_rb: rand(0,60),
    rumah_rs: rand(0,100), rumah_rr: rand(0,150),
  }));
  return NextResponse.json({ cluster6, cluster1, cluster6Icons: cluster6, total: cluster6.length });
}
