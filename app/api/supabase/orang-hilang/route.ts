import { NextResponse } from "next/server";
import { KABUPATEN, rand } from "@/lib/dummy";
export async function GET() {
  const data = Array.from({length:15},(_,i)=>({
    id: `OH-${i+1}`,
    nama: ["Ahmad","Budi","Siti","Rina","Hasan","Fatimah","Rizky","Nurul","Dedi","Amir","Sara","Yusuf","Lina","Fajar","Dewi"][i],
    usia: rand(5,70),
    jenis_kelamin: i%2===0?"Laki-laki":"Perempuan",
    kabupaten_kota: KABUPATEN[i%KABUPATEN.length].nama,
    kecamatan: `Kec. ${i+1}`,
    status: i<5?"dicari":"ditemukan",
    tanggal_hilang: `2026-04-${String(rand(20,28)).padStart(2,"0")}`,
    keterangan: i<5?"Masih dalam pencarian Tim SAR":"Berhasil ditemukan dalam kondisi selamat",
    lat: KABUPATEN[i%KABUPATEN.length].lat+(Math.random()-0.5)*0.2,
    lng: KABUPATEN[i%KABUPATEN.length].lng+(Math.random()-0.5)*0.2,
  }));
  const summary = { total: data.length, dicari: data.filter(d=>d.status==="dicari").length, ditemukan: data.filter(d=>d.status==="ditemukan").length };
  return NextResponse.json({ data, summary });
}
