type KondisiSummary = Record<string, number>;

export type PolygonItem = {
  kode: string;
  nama: string;
  level: number;
  parent: string;
  lat: number;
  lng: number;
};

const KABUPATEN = [
  { kode: "1101", nama: "Simeulue", lat: 2.69, lng: 96.05 },
  { kode: "1102", nama: "Aceh Singkil", lat: 2.38, lng: 97.79 },
  { kode: "1103", nama: "Aceh Selatan", lat: 3.17, lng: 97.43 },
  { kode: "1104", nama: "Aceh Tenggara", lat: 3.55, lng: 97.83 },
  { kode: "1105", nama: "Aceh Timur", lat: 4.62, lng: 97.81 },
  { kode: "1106", nama: "Aceh Tengah", lat: 4.63, lng: 96.85 },
  { kode: "1107", nama: "Aceh Barat", lat: 4.09, lng: 96.22 },
  { kode: "1108", nama: "Aceh Besar", lat: 5.44, lng: 95.63 },
  { kode: "1109", nama: "Pidie", lat: 5.23, lng: 96.13 },
  { kode: "1110", nama: "Bireuen", lat: 5.21, lng: 96.69 },
  { kode: "1111", nama: "Aceh Utara", lat: 5.01, lng: 97.12 },
  { kode: "1112", nama: "Aceh Barat Daya", lat: 3.79, lng: 96.83 },
  { kode: "1113", nama: "Gayo Lues", lat: 3.92, lng: 97.22 },
  { kode: "1114", nama: "Aceh Tamiang", lat: 4.29, lng: 98.1 },
  { kode: "1115", nama: "Nagan Raya", lat: 4.0, lng: 96.42 },
  { kode: "1116", nama: "Aceh Jaya", lat: 4.71, lng: 95.62 },
  { kode: "1117", nama: "Bener Meriah", lat: 4.72, lng: 96.83 },
  { kode: "1118", nama: "Pidie Jaya", lat: 5.28, lng: 96.3 },
  { kode: "1171", nama: "Kota Banda Aceh", lat: 5.55, lng: 95.32 },
  { kode: "1172", nama: "Kota Sabang", lat: 5.89, lng: 95.33 },
  { kode: "1173", nama: "Kota Langsa", lat: 4.47, lng: 97.97 },
  { kode: "1174", nama: "Kota Lhokseumawe", lat: 5.18, lng: 97.15 },
  { kode: "1175", nama: "Kota Subulussalam", lat: 2.65, lng: 98.0 },
];

const KECAMATAN_SUFFIX = ["Utara", "Tengah", "Selatan"];
const DESA_SUFFIX = ["Satu", "Dua"];

const hashCode = (text: string) =>
  text.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0);

const seeded = (text: string, min: number, max: number) => {
  const seed = hashCode(text);
  return min + (seed % (max - min + 1));
};

export function makeBox(lat: number, lng: number, size = 0.18) {
  return [[
    [lng - size, lat - size],
    [lng + size, lat - size],
    [lng + size, lat + size],
    [lng - size, lat + size],
    [lng - size, lat - size],
  ]];
}

function kondisiSummary(kode: string): KondisiSummary {
  return {
    "Terdampak berat": seeded(`${kode}-berat`, 1, 8),
    "Terdampak sedang": seeded(`${kode}-sedang`, 2, 12),
    "Terdampak ringan": seeded(`${kode}-ringan`, 3, 16),
    "Tidak terdampak": seeded(`${kode}-aman`, 10, 30),
  };
}

export function buildFeature(item: PolygonItem) {
  const totalPenduduk = seeded(`${item.kode}-penduduk`, 1800, 250000);
  const laki = Math.floor(totalPenduduk * 0.49);
  const perempuan = totalPenduduk - laki;
  const jumlahPosko = seeded(`${item.kode}-posko`, 1, 10);
  const affected = seeded(`${item.kode}-affected`, 100, 6000);
  const displaced = Math.floor(affected * 0.35);

  return {
    type: "Feature",
    properties: {
      kode: item.kode,
      nama: item.nama,
      level: item.level,
      parent: item.parent,
      penduduk_total: totalPenduduk,
      penduduk_laki: laki,
      penduduk_perempuan: perempuan,
      jumlah_posko: jumlahPosko,
      jumlah_pengungsi: displaced,
      affected_population: affected,
      displaced_population: displaced,
      condition_summary: kondisiSummary(item.kode),
    },
    geometry: { type: "Polygon", coordinates: makeBox(item.lat, item.lng) },
  };
}

export function getPolygonItems(level = 2, parent = "11"): PolygonItem[] {
  if (level <= 2) {
    return KABUPATEN.filter((k) => k.kode.startsWith(parent)).map((k) => ({
      ...k,
      level: 2,
      parent: "11",
    }));
  }

  const kecamatan = KABUPATEN.flatMap((k) =>
    KECAMATAN_SUFFIX.map((suffix, idx) => ({
      kode: `${k.kode}.${idx + 1}`,
      nama: `Kec. ${suffix} ${k.nama}`,
      level: 3,
      parent: k.kode,
      lat: k.lat + (idx - 1) * 0.1,
      lng: k.lng + (idx - 1) * 0.1,
    }))
  );

  if (level === 3) {
    return kecamatan.filter((k) => k.kode.startsWith(parent));
  }

  const desa = kecamatan.flatMap((k) =>
    DESA_SUFFIX.map((suffix, idx) => ({
      kode: `${k.kode}.${idx + 1}`,
      nama: `Desa ${suffix} ${k.nama.replace("Kec. ", "")}`,
      level: 4,
      parent: k.kode,
      lat: k.lat + (idx === 0 ? -0.03 : 0.03),
      lng: k.lng + (idx === 0 ? 0.03 : -0.03),
    }))
  );

  return desa.filter((k) => k.kode.startsWith(parent));
}

export function findPolygonByKode(kode: string) {
  return (
    getPolygonItems(4, "11").find((i) => i.kode === kode) ||
    getPolygonItems(3, "11").find((i) => i.kode === kode) ||
    getPolygonItems(2, "11").find((i) => i.kode === kode)
  );
}
