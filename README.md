# Dashboard Monitoring Bencana Aceh

Dashboard monitoring bencana hidrometeorologi Aceh berbasis Next.js 16 (App Router), dimigrasi dari aplikasi static HTML dengan mempertahankan tampilan dan fungsionalitas asli.

## Fitur Utama

- **4 Tab Utama**: Dampak, Peta Operasi, Pengungsi, Bantuan Logistik
- **Peta Interaktif** menggunakan Leaflet + MarkerCluster (4 peta: Dampak, Operasi, Pengungsi, Bantuan)
- **Grafik Real-time** dengan Chart.js (Pie, Bar, Doughnut)
- **17 API Routes** dengan dummy data realistis (siap diganti backend Supabase)
- **Data Dummy** mencakup 23 kabupaten/kota Aceh
- **Responsive** untuk desktop dan mobile

## Stack Teknologi

| Layer | Teknologi |
|---|---|
| Framework | Next.js 16.2.4 (App Router, Turbopack) |
| Frontend | React 19, TypeScript 5 |
| Styling | CSS Kustom + Tailwind CSS (CDN) |
| Peta | Leaflet 1.9.4 + LeafletMarkerCluster |
| Grafik | Chart.js 4.4 + chartjs-plugin-datalabels |
| Icons | Font Awesome 6.4 |
| Deployment | Vercel / VPS (Node.js) |

## Struktur Proyek

```
app/
├── page.tsx              → Entry point (client-only mounting)
├── DashboardClient.tsx   → Komponen utama dashboard + script loader
├── layout.tsx            → Root layout + CSS dependencies
├── dashboard.css         → Styling kustom dashboard
├── api/
│   ├── supabase/         → 8 endpoint Supabase (dummy → siap diganti real)
│   └── wilayah/polygon/  → 3 endpoint GeoJSON wilayah Aceh
└── realtime/             → 6 endpoint realtime bencana

lib/
└── dummy.ts              → Data master (kabupaten, sektor, helper)

public/js/
├── dashboard-main.js     → Logic utama dashboard (fetch, map, chart)
├── dashboard-data.js     → Fungsi data utilities
└── mobile-utils.js       → Mobile menu + onclick stubs
```

## Cara Menjalankan

```bash
# Clone repository
git clone https://github.com/smilebaim/desadigital-lokal
cd dashboard-bencana

# Install dependencies
npm install

# Jalankan development server
npm run dev
# Buka http://localhost:3000

# Build production
npm run build
npm run start
```

## API Endpoints

### Realtime (dipanggil otomatis oleh dashboard-main.js)

| Endpoint | Deskripsi |
|---|---|
| `GET /realtime/bencana` | Data titik bencana (40+ records) |
| `GET /realtime/jaringan` | Status jaringan telekomunikasi |
| `GET /realtime/puskesmas` | Lokasi puskesmas |
| `GET /realtime/rsud` | Lokasi RSUD |
| `GET /realtime/v2` | Fasyankes lainnya (klinik, apotek) |
| `GET /realtime/bantuan-logistik` | Data distribusi bantuan |

### Supabase API

| Endpoint | Deskripsi |
|---|---|
| `GET /api/supabase/penduduk` | Data penduduk per kabupaten |
| `GET /api/supabase/cluster` | Data kerusakan per sektor |
| `GET /api/supabase/pertanian` | Data kerusakan pertanian |
| `GET /api/supabase/posko` | Lokasi posko pengungsian |
| `GET /api/supabase/orang-hilang` | Data orang hilang/ditemukan |
| `GET /api/supabase/lokasi-tenda` | Lokasi tenda pengungsian |
| `GET /api/supabase/fasilitas-publik` | Fasilitas publik rusak |
| `GET /api/supabase/village-distribution` | Distribusi desa per kabupaten |

### Wilayah

| Endpoint | Deskripsi |
|---|---|
| `GET /api/wilayah/polygon/geojson` | GeoJSON batas wilayah Aceh |
| `GET /api/wilayah/polygon/search` | Pencarian wilayah |
| `GET /api/wilayah/polygon/levels` | Level admin (kab/kec/desa) |

## Migrasi ke Backend Real

Untuk mengganti dummy data dengan backend Supabase yang sesungguhnya, edit file di `app/api/`:

```typescript
// Contoh: app/api/supabase/penduduk/route.ts
// Ganti return NextResponse.json(dummyData)
// dengan fetch ke Supabase:

import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)
const { data } = await supabase.from('penduduk').select('*')
return NextResponse.json({ data })
```

## Environment Variables (untuk produksi)

Buat file `.env.local` (tidak di-commit):

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

## Catatan Pengembangan

- **Dummy Data**: Semua data adalah contoh realistis Aceh. Ubah di `lib/dummy.ts` dan masing-masing `route.ts`
- **Script Loading**: Library (Leaflet, Chart.js) diload secara async via `useEffect` di `DashboardClient.tsx`
- **Hydration**: Komponen dirender client-only untuk menghindari SSR mismatch dengan HTML asli
- **Tailwind CDN**: Digunakan untuk mempertahankan kompatibilitas styling. Untuk produksi, pertimbangkan migrasi ke Tailwind PostCSS

## Dikembangkan oleh

TIM SIAT DISKOMINFOSA — Dinas Komunikasi, Informatika dan Persandian Aceh  
© 2026 Pemerintah Aceh
