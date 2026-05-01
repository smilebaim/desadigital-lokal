-- ============================================================
-- SCHEMA DATABASE - Dashboard Monitoring Bencana Aceh
-- Jalankan di Supabase SQL Editor:
-- https://supabase.com/dashboard/project/xntltvftkboiyqsfpqoi/sql/new
-- ============================================================

-- =====================
-- 1. TABEL BENCANA / TITIK LOKASI KERUSAKAN
-- =====================
CREATE TABLE IF NOT EXISTS bencana (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  jenis VARCHAR(100) DEFAULT 'banjir', -- banjir, longsor, gempa, dll
  kabupaten VARCHAR(100),
  kecamatan VARCHAR(100),
  desa VARCHAR(100),
  lat DECIMAL(10, 6),
  lng DECIMAL(10, 6),
  status VARCHAR(50) DEFAULT 'aktif', -- aktif, teratasi
  jumlah_korban INTEGER DEFAULT 0,
  jumlah_pengungsi INTEGER DEFAULT 0,
  luas_sawah DECIMAL(10, 2) DEFAULT 0,
  luas_kebun DECIMAL(10, 2) DEFAULT 0,
  luas_tambak DECIMAL(10, 2) DEFAULT 0,
  rumah_rusak INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- 2. TABEL PENDUDUK
-- =====================
CREATE TABLE IF NOT EXISTS penduduk (
  id SERIAL PRIMARY KEY,
  kabupaten VARCHAR(100) NOT NULL,
  kabupaten_id VARCHAR(10),
  total_penduduk INTEGER DEFAULT 0,
  total_kk INTEGER DEFAULT 0,
  jumlah_pengungsi INTEGER DEFAULT 0,
  disabilitas INTEGER DEFAULT 0,
  lat DECIMAL(10, 6),
  lng DECIMAL(10, 6),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- 3. TABEL POSKO PENGUNGSIAN
-- =====================
CREATE TABLE IF NOT EXISTS posko (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  kabupaten VARCHAR(100),
  kecamatan VARCHAR(100),
  desa VARCHAR(100),
  lat DECIMAL(10, 6),
  lng DECIMAL(10, 6),
  kapasitas INTEGER DEFAULT 0,
  jumlah_pengungsi INTEGER DEFAULT 0,
  jumlah_kk INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'aktif',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- 4. TABEL BANTUAN LOGISTIK
-- =====================
CREATE TABLE IF NOT EXISTS bantuan_logistik (
  id SERIAL PRIMARY KEY,
  desa VARCHAR(255) NOT NULL,
  kecamatan VARCHAR(100),
  kabupaten VARCHAR(100),
  satuan VARCHAR(100),
  jumlah INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'putih', -- kuning, biru, biru_keabuan, putih
  lat DECIMAL(10, 6),
  lng DECIMAL(10, 6),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- 5. TABEL PERTANIAN (KERUSAKAN)
-- =====================
CREATE TABLE IF NOT EXISTS pertanian (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  kabupaten VARCHAR(100),
  kecamatan VARCHAR(100),
  desa VARCHAR(100),
  jenis VARCHAR(100) DEFAULT 'sawah', -- sawah, kebun, tambak, kolam
  volume DECIMAL(10, 2) DEFAULT 0, -- luas dalam Ha
  satuan VARCHAR(20) DEFAULT 'Ha',
  kondisi VARCHAR(50) DEFAULT 'ringan', -- berat, sedang, ringan
  estimasi_kerugian BIGINT DEFAULT 0,
  lat DECIMAL(10, 6),
  lng DECIMAL(10, 6),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- 6. TABEL ORANG HILANG
-- =====================
CREATE TABLE IF NOT EXISTS orang_hilang (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  usia INTEGER,
  jenis_kelamin VARCHAR(20) DEFAULT 'L',
  kabupaten VARCHAR(100),
  kecamatan VARCHAR(100),
  desa VARCHAR(100),
  status VARCHAR(50) DEFAULT 'dicari', -- dicari, ditemukan, meninggal
  keterangan TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- 7. TABEL FASILITAS PUBLIK (RUSAK)
-- =====================
CREATE TABLE IF NOT EXISTS fasilitas_publik (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  jenis VARCHAR(100) DEFAULT 'jembatan', -- jembatan, jalan, sekolah, masjid, dll
  kabupaten VARCHAR(100),
  kecamatan VARCHAR(100),
  desa VARCHAR(100),
  kondisi VARCHAR(50) DEFAULT 'rusak_ringan', -- rusak_berat, rusak_sedang, rusak_ringan
  estimasi_kerugian BIGINT DEFAULT 0,
  lat DECIMAL(10, 6),
  lng DECIMAL(10, 6),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- 8. TABEL LOKASI TENDA (PENGUNGSIAN)
-- =====================
CREATE TABLE IF NOT EXISTS lokasi_tenda (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  kabupaten VARCHAR(100),
  kecamatan VARCHAR(100),
  desa VARCHAR(100),
  lat DECIMAL(10, 6),
  lng DECIMAL(10, 6),
  jumlah_tenda INTEGER DEFAULT 0,
  kapasitas INTEGER DEFAULT 0,
  jumlah_pengungsi INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'aktif',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- 9. TABEL CLUSTER / REHAB & REKON
-- =====================
CREATE TABLE IF NOT EXISTS cluster_data (
  id SERIAL PRIMARY KEY,
  kabupaten VARCHAR(100),
  sektor VARCHAR(100), -- Perumahan, Kesehatan, Pendidikan, dll
  sub_sektor VARCHAR(100),
  total_kerusakan BIGINT DEFAULT 0,
  total_kerugian BIGINT DEFAULT 0,
  lat DECIMAL(10, 6),
  lng DECIMAL(10, 6),
  status VARCHAR(50) DEFAULT 'assessment',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- 10. TABEL JARINGAN TELEKOMUNIKASI
-- =====================
CREATE TABLE IF NOT EXISTS jaringan (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  kabupaten VARCHAR(100),
  kecamatan VARCHAR(100),
  jenis VARCHAR(100) DEFAULT 'BTS', -- BTS, Fiber, Satelit
  status VARCHAR(50) DEFAULT 'normal', -- critical, warning, normal
  provider VARCHAR(100),
  lat DECIMAL(10, 6),
  lng DECIMAL(10, 6),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- 11. TABEL PUSKESMAS
-- =====================
CREATE TABLE IF NOT EXISTS puskesmas (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  kabupaten VARCHAR(100),
  kecamatan VARCHAR(100),
  lat DECIMAL(10, 6),
  lng DECIMAL(10, 6),
  status VARCHAR(50) DEFAULT 'normal', -- normal, terdampak, darurat
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- 12. TABEL RSUD
-- =====================
CREATE TABLE IF NOT EXISTS rsud (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  kabupaten VARCHAR(100),
  kecamatan VARCHAR(100),
  lat DECIMAL(10, 6),
  lng DECIMAL(10, 6),
  kelas VARCHAR(10) DEFAULT 'C', -- A, B, C, D
  status VARCHAR(50) DEFAULT 'normal',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- 13. TABEL FASYANKES V2 (Klinik, Apotek, dll)
-- =====================
CREATE TABLE IF NOT EXISTS fasyankes (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  jenis VARCHAR(100) DEFAULT 'klinik', -- klinik, apotek, bidan, pustu
  kabupaten VARCHAR(100),
  kecamatan VARCHAR(100),
  lat DECIMAL(10, 6),
  lng DECIMAL(10, 6),
  status VARCHAR(50) DEFAULT 'normal',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- ENABLE ROW LEVEL SECURITY (RLS) - Agar bisa diakses publik
-- =====================
ALTER TABLE bencana ENABLE ROW LEVEL SECURITY;
ALTER TABLE penduduk ENABLE ROW LEVEL SECURITY;
ALTER TABLE posko ENABLE ROW LEVEL SECURITY;
ALTER TABLE bantuan_logistik ENABLE ROW LEVEL SECURITY;
ALTER TABLE pertanian ENABLE ROW LEVEL SECURITY;
ALTER TABLE orang_hilang ENABLE ROW LEVEL SECURITY;
ALTER TABLE fasilitas_publik ENABLE ROW LEVEL SECURITY;
ALTER TABLE lokasi_tenda ENABLE ROW LEVEL SECURITY;
ALTER TABLE cluster_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE jaringan ENABLE ROW LEVEL SECURITY;
ALTER TABLE puskesmas ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsud ENABLE ROW LEVEL SECURITY;
ALTER TABLE fasyankes ENABLE ROW LEVEL SECURITY;

-- =====================
-- POLICIES: Allow public read access
-- =====================
CREATE POLICY "Public read bencana" ON bencana FOR SELECT USING (true);
CREATE POLICY "Public read penduduk" ON penduduk FOR SELECT USING (true);
CREATE POLICY "Public read posko" ON posko FOR SELECT USING (true);
CREATE POLICY "Public read bantuan_logistik" ON bantuan_logistik FOR SELECT USING (true);
CREATE POLICY "Public read pertanian" ON pertanian FOR SELECT USING (true);
CREATE POLICY "Public read orang_hilang" ON orang_hilang FOR SELECT USING (true);
CREATE POLICY "Public read fasilitas_publik" ON fasilitas_publik FOR SELECT USING (true);
CREATE POLICY "Public read lokasi_tenda" ON lokasi_tenda FOR SELECT USING (true);
CREATE POLICY "Public read cluster_data" ON cluster_data FOR SELECT USING (true);
CREATE POLICY "Public read jaringan" ON jaringan FOR SELECT USING (true);
CREATE POLICY "Public read puskesmas" ON puskesmas FOR SELECT USING (true);
CREATE POLICY "Public read rsud" ON rsud FOR SELECT USING (true);
CREATE POLICY "Public read fasyankes" ON fasyankes FOR SELECT USING (true);
