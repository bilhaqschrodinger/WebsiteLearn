import type { Lesson } from "./types"

const lesson: Lesson = {
  slug: "seo-performa",
  num: "08",
  title: "SEO & Performa",
  short: "SEO & Performa",
  desc: "Judul, deskripsi, struktur, Open Graph, dan cara membuat halaman cepat.",
  group: "kualitas",
  lead:
    "Website yang bagus tapi tidak ditemukan sama saja dengan tidak ada. SEO dasar bukan trik rahasia — ia soal membuat halaman mudah dipahami mesin pencari dan cepat dibuka manusia.",
  goals: [
    "Menulis judul dan deskripsi halaman yang baik.",
    "Memahami struktur heading dan URL.",
    "Menyiapkan tag berbagi sosial (Open Graph).",
    "Mengukur dan memperbaiki kecepatan halaman.",
  ],
  components: [
    { name: "Metadata halaman", note: "`title`, `description`, `canonical`, dan favicon." },
    { name: "Kartu pratinjau sosial", note: "`og:title`, `og:description`, `og:image` 1200×630." },
    { name: "Breadcrumb", note: "Jalur navigasi yang juga dibaca mesin pencari." },
    { name: "Gambar responsif", note: "`srcset`, `sizes`, `width`/`height`, `loading=\"lazy\"`." },
  ],
  sections: [
    {
      heading: "1. Bagian `<head>` yang penting",
      blocks: [
        {
          type: "code",
          label: "HTML",
          code: `<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>Kopi Rumahan: Panduan Menyeduh untuk Pemula — Toko Kopi</title>
  <meta name="description"
        content="Panduan langkah demi langkah menyeduh kopi enak di rumah, dari memilih biji sampai rasio air yang tepat.">

  <link rel="canonical" href="https://tokokopi.id/panduan-seduh">

  <!-- Berbagi di media sosial -->
  <meta property="og:title" content="Panduan Menyeduh Kopi untuk Pemula">
  <meta property="og:description" content="Dari memilih biji sampai rasio air yang tepat.">
  <meta property="og:image" content="https://tokokopi.id/img/og-seduh.jpg">
  <meta property="og:type" content="article">
  <meta name="twitter:card" content="summary_large_image">

  <link rel="icon" href="/favicon.ico">
</head>`,
        },
        {
          type: "table",
          head: ["Tag", "Aturan praktis"],
          rows: [
            ["`<title>`", "50–60 karakter, topik utama di depan, unik per halaman"],
            ["`description`", "140–160 karakter, menjelaskan isi dan alasan mengklik"],
            ["`canonical`", "Alamat resmi halaman, mencegah konten duplikat"],
            ["`og:image`", "1200×630px, agar tampil rapi saat dibagikan"],
            ["`favicon`", "Ikon kecil di tab browser"],
          ],
        },
      ],
    },
    {
      heading: "2. Struktur yang dibaca mesin pencari",
      blocks: [
        {
          type: "list",
          items: [
            "Satu `h1` yang menjelaskan topik halaman.",
            "Subjudul `h2`/`h3` membentuk kerangka isi.",
            "Teks yang benar-benar menjawab pertanyaan pengguna.",
            "Tautan internal ke halaman lain di situsmu, dengan teks yang deskriptif.",
            "URL pendek dan bermakna: `/panduan-seduh-kopi`, bukan `/?p=1234`.",
          ],
        },
        {
          type: "callout",
          tone: "warn",
          title: "Yang tidak membantu",
          text:
            "Menjejalkan kata kunci berulang, menyembunyikan teks putih di latar putih, atau membeli backlink murah. Mesin pencari modern menghukum praktik seperti ini.",
        },
      ],
    },
    {
      heading: "3. Data terstruktur dan berbagi sosial",
      blocks: [
        {
          type: "p",
          text: "Memberi tahu mesin pencari jenis kontenmu dalam format JSON-LD:",
        },
        {
          type: "code",
          label: "HTML",
          code: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Panduan Menyeduh Kopi untuk Pemula",
  "author": { "@type": "Person", "name": "Sari" },
  "datePublished": "2026-01-15",
  "image": "https://tokokopi.id/img/seduh.jpg"
}
</script>`,
        },
        {
          type: "p",
          text: "Sitemap dan robots.txt memberi tahu mesin pencari halaman mana yang perlu dirayapi:",
        },
        {
          type: "code",
          label: "robots.txt",
          code: `User-agent: *
Allow: /
Sitemap: https://tokokopi.id/sitemap.xml`,
        },
        {
          type: "code",
          label: "sitemap.xml",
          code: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://tokokopi.id/</loc>
    <lastmod>2026-01-15</lastmod>
  </url>
</urlset>`,
        },
      ],
    },
    {
      heading: "4. Performa: kenapa terasa lambat",
      blocks: [
        {
          type: "table",
          head: ["Penyebab", "Dampak", "Perbaikan"],
          rows: [
            ["Gambar besar", "Sering 80% dari total unduhan", "Kompres, ubah ke WebP, pakai `srcset`"],
            ["Font eksternal banyak", "Menunda teks tampil", "Maksimal 2 keluarga, `font-display: swap`"],
            ["Skrip pihak ketiga", "Memblokir render", "Hapus yang tidak perlu, muat dengan `defer`"],
          ],
        },
        {
          type: "code",
          label: "HTML",
          code: `<img src="foto-800.webp"
     srcset="foto-400.webp 400w, foto-800.webp 800w, foto-1600.webp 1600w"
     sizes="(max-width: 600px) 100vw, 50vw"
     width="800" height="533"
     loading="lazy"
     decoding="async"
     alt="Secangkir kopi di meja kayu">`,
        },
        {
          type: "code",
          label: "HTML + CSS",
          code: `<!-- CSS kritis di <head>, sisanya ditunda -->
<link rel="stylesheet" href="style.css">

<!-- JS tidak menghalangi render -->
<script src="app.js" defer></script>

@font-face {
  font-family: "Inter";
  src: url("/fonts/inter.woff2") format("woff2");
  font-display: swap;        /* teks langsung tampil dengan font cadangan */
  font-weight: 400 700;
}`,
        },
        {
          type: "callout",
          tone: "tip",
          title: "Cara termudah mempercepat: pakai font sistem",
          code: `body {
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
}`,
          text: "Nol unduhan, nol pergeseran layout, dan terlihat \"asli\" di setiap perangkat.",
        },
      ],
    },
    {
      heading: "5. Mengukur",
      blocks: [
        {
          type: "list",
          items: [
            "**Lighthouse** (DevTools → Lighthouse) — skor Performance, Accessibility, Best Practices, SEO.",
            "**PageSpeed Insights** — mengukur dari server Google, termasuk data pengguna nyata.",
            "**Tab Network** — lihat ukuran total dan file terbesar.",
          ],
        },
        {
          type: "table",
          head: ["Metrik", "Arti", "Target"],
          rows: [
            ["LCP", "Elemen terbesar muncul", "< 2.5 detik"],
            ["CLS", "Seberapa banyak layout bergeser", "< 0.1"],
            ["INP", "Respons terhadap interaksi", "< 200 ms"],
            ["Total halaman", "Ukuran semua berkas", "Idealnya < 1 MB"],
          ],
        },
        {
          type: "p",
          text: "Kalau memakai hosting sendiri, aktifkan kompresi gzip/brotli, `Cache-Control` panjang untuk berkas statis, dan CDN bila pengunjung tersebar luas. Hosting statis modern (Netlify, Vercel, Cloudflare Pages) melakukan ini otomatis.",
        },
      ],
    },
  ],
  exercise: [
    "Untuk halaman profilmu, tulis `title` (≤ 60 karakter) dan `description` (≤ 160 karakter).",
    "Tambahkan Open Graph dan uji tampilannya di validator pratinjau sosial.",
    "Kompres satu gambar besar dan bandingkan ukurannya.",
    "Jalankan Lighthouse dan catat skor awalmu. Perbaiki satu hal, ukur lagi.",
  ],
  checklist: [
    "Setiap halaman punya `title` unik.",
    "Setiap halaman punya `description` yang menjelaskan isi.",
    "Ada tepat satu `h1` per halaman.",
    "Semua gambar dikompres dan punya `width`/`height`.",
    "Skor Lighthouse Performance ≥ 90.",
  ],
}

export default lesson
