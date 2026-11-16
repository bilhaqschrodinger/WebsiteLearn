import type { Lesson } from "./types"

const lesson: Lesson = {
  slug: "html-struktur",
  num: "01",
  title: "HTML: Struktur",
  short: "HTML: Struktur",
  desc: "Kerangka halaman, elemen semantik, teks, tautan, gambar, dan daftar.",
  group: "fondasi",
  lead:
    "HTML adalah bahasa penanda. Ia tidak mengatur warna atau ukuran — tugasnya memberi arti pada setiap bagian halaman: ini judul, ini paragraf, ini tautan, ini navigasi. Struktur yang benar adalah fondasi semua komponen website.",
  goals: [
    "Menulis dokumen HTML yang valid dari nol.",
    "Memahami perbedaan `head` dan `body`.",
    "Memilih elemen yang tepat, bukan hanya `div` untuk semuanya.",
    "Membuat tautan, gambar, dan daftar yang benar.",
  ],
  components: [
    { name: "Header & nav", note: "Logo dan menu utama, ditulis dengan `<header>` dan `<nav>`." },
    { name: "Hero", note: "Satu `h1` + paragraf pembuka + tautan aksi." },
    { name: "Kartu artikel", note: "`<article>` berisi judul, gambar, dan ringkasan." },
    { name: "Daftar isi", note: "`<ul>` berisi tautan ke bagian halaman." },
    { name: "Footer", note: "`<footer>` berisi kontak dan hak cipta." },
  ],
  sections: [
    {
      heading: "1. Anatomi sebuah elemen",
      blocks: [
        { type: "p", text: "Hampir semua HTML terdiri dari pola yang sama:" },
        {
          type: "code",
          label: "HTML",
          code: `<p class="catatan">Halo, dunia!</p>
 │   │             │            │   │
 │   │             │            │   └── tag penutup
 │   │             │            └────── isi (konten)
 │   │             └─────────────────── atribut + nilainya
 │   └───────────────────────────────── nama atribut
 └───────────────────────────────────── tag pembuka`,
        },
        { type: "p", text: "Beberapa elemen tidak punya isi, jadi tidak perlu tag penutup:" },
        {
          type: "code",
          label: "HTML",
          code: `<img src="foto.jpg" alt="Kucing oranye">
<br>
<hr>
<input type="email">
<meta charset="utf-8">`,
        },
      ],
    },
    {
      heading: "2. Kerangka dokumen",
      blocks: [
        { type: "p", text: "Setiap file HTML dimulai dengan struktur yang sama. Hafalkan pola ini:" },
        {
          type: "code",
          label: "index.html",
          code: `<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Judul yang muncul di tab browser</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- semua yang terlihat ada di sini -->
</body>
</html>`,
        },
        {
          type: "table",
          head: ["Bagian", "Fungsi", "Terlihat?"],
          rows: [
            ["`<!doctype html>`", "Memberi tahu browser ini HTML modern (HTML5)", "Tidak"],
            ['`<html lang="id">`', "Akar dokumen; `lang` membantu screen reader dan penerjemah", "Tidak"],
            ["`<head>`", "Informasi tentang halaman: judul, encoding, CSS, meta", "Tidak"],
            ["`<body>`", "Semua konten yang tampil di layar", "Ya"],
          ],
        },
        {
          type: "callout",
          tone: "warn",
          title: "Dua baris yang sering dilupakan",
          text:
            '`<meta charset="utf-8">` mencegah huruf aneh seperti `Ã©`. `<meta name="viewport" ...>` membuat halaman tidak mengecil di HP. Tanpa keduanya, website terlihat rusak meskipun kodenya "benar".',
        },
      ],
    },
    {
      heading: "3. Heading: hierarki, bukan ukuran",
      blocks: [
        {
          type: "p",
          text: 'Ada `h1` sampai `h6`. Gunakan sesuai tingkatan isi, bukan karena "ukurannya pas". Ukuran bisa diubah CSS; makna tidak bisa.',
        },
        {
          type: "code",
          label: "HTML",
          code: `<h1>Toko Kopi</h1>
  <h2>Menu</h2>
    <h3>Kopi Panas</h3>
    <h3>Kopi Dingin</h3>
  <h2>Lokasi</h2>`,
        },
        {
          type: "list",
          items: [
            "Satu `h1` per halaman, menjelaskan topik utama.",
            "Jangan melompat dari `h2` ke `h4`.",
            "Jangan pakai heading hanya untuk membuat teks tebal — itu tugas CSS.",
          ],
        },
        {
          type: "p",
          text: "Hierarki ini juga yang dibaca mesin pencari dan screen reader untuk menyusun daftar isi halaman. Satu `h1` yang jelas + `h2` per bagian adalah struktur komponen paling dasar.",
        },
      ],
    },
    {
      heading: "4. Elemen teks dan tautan",
      blocks: [
        {
          type: "code",
          label: "HTML",
          code: `<p>Paragraf biasa.</p>
<strong>penting</strong>        <!-- tebal, punya makna -->
<em>ditekankan</em>           <!-- miring, punya makna -->
<b>tebal visual</b>          <!-- hanya tampilan -->
<mark>disorot</mark>
<small>catatan kecil</small>
<code>console.log()</code>
<blockquote>Kutipan panjang</blockquote>
<abbr title="HyperText Markup Language">HTML</abbr>`,
        },
        {
          type: "p",
          text: "Tautan menghubungkan komponen satu dengan lainnya. Ada empat bentuk yang paling sering dipakai:",
        },
        {
          type: "code",
          label: "HTML",
          code: `<!-- ke halaman lain di situs yang sama -->
<a href="tentang.html">Tentang kami</a>

<!-- ke situs luar -->
<a href="https://example.com" target="_blank" rel="noopener">Buka example.com</a>

<!-- ke bagian dalam halaman yang sama -->
<a href="#kontak">Langsung ke kontak</a>
...
<h2 id="kontak">Kontak</h2>

<!-- mengirim email / telepon -->
<a href="mailto:halo@toko.id">Email kami</a>
<a href="tel:+628123456789">Telepon</a>`,
        },
        {
          type: "callout",
          tone: "tip",
          title: 'Teks tautan harus menjelaskan tujuannya',
          text:
            'Hindari "klik di sini". Bandingkan "Untuk melihat harga, klik di sini" dengan "Lihat daftar harga lengkap". Yang kedua bisa dipahami tanpa membaca kalimat sebelumnya — dan itulah yang dibacakan screen reader.',
        },
      ],
    },
    {
      heading: "5. Gambar dan daftar",
      blocks: [
        {
          type: "code",
          label: "HTML",
          code: `<img src="assets/img/kopi.jpg"
     alt="Secangkir kopi hitam di atas meja kayu"
     width="640" height="427"
     loading="lazy">`,
        },
        {
          type: "list",
          items: [
            "`alt` wajib. Isinya deskripsi gambar untuk orang yang tidak bisa melihatnya. Kalau gambar murni dekoratif, tulis `alt=\"\"`.",
            '`width` dan `height` mencegah halaman "melompat" saat gambar selesai dimuat.',
            '`loading="lazy"` menunda memuat gambar yang belum terlihat.',
          ],
        },
        {
          type: "code",
          label: "HTML",
          code: `<ul>                    <!-- tidak berurutan -->
  <li>Espresso</li>
  <li>Latte</li>
</ul>

<ol>                    <!-- berurutan -->
  <li>Panaskan air</li>
  <li>Giling biji kopi</li>
  <li>Seduh</li>
</ol>

<dl>                    <!-- pasangan istilah–definisi -->
  <dt>Latte</dt>
  <dd>Espresso dengan susu steamed.</dd>
</dl>`,
        },
      ],
    },
    {
      heading: "6. Elemen semantik: memberi nama pada komponen",
      blocks: [
        {
          type: "p",
          text: 'Dulu orang menulis `<div id="header">`. HTML5 menyediakan elemen yang sudah punya makna bawaan — dan itulah nama komponen halaman yang sebenarnya.',
        },
        {
          type: "code",
          label: "HTML",
          code: `<body>
  <header>
    <a href="/">Logo</a>
    <nav aria-label="Navigasi utama">
      <ul>
        <li><a href="/menu">Menu</a></li>
        <li><a href="/lokasi">Lokasi</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <article>
      <h1>Judul Artikel</h1>
      <p>Isi...</p>
    </article>

    <aside>
      <h2>Artikel terkait</h2>
      <!-- konten pendukung -->
    </aside>
  </main>

  <footer>
    <p>&copy; 2026 Toko Kopi</p>
  </footer>
</body>`,
        },
        {
          type: "table",
          head: ["Elemen", "Dipakai untuk"],
          rows: [
            ["`header`", "Bagian pembuka sebuah halaman atau artikel (logo, judul, nav)"],
            ["`nav`", "Kumpulan tautan navigasi"],
            ["`main`", "Isi utama; hanya satu per halaman"],
            ["`article`", "Konten yang berdiri sendiri (postingan, kartu produk)"],
            ["`section`", "Kelompok konten bertema, biasanya punya heading"],
            ["`aside`", "Konten sampingan: sidebar, catatan, iklan"],
            ["`footer`", "Penutup: hak cipta, kontak, tautan sekunder"],
            ["`figure` / `figcaption`", "Gambar atau diagram beserta keterangannya"],
          ],
        },
        {
          type: "callout",
          tone: "tip",
          title: "Kapan pakai `div`?",
          text:
            'Saat tidak ada elemen semantik yang cocok — biasanya sebagai pembungkus untuk keperluan tata letak. Kalau ragu, tanya: "bagian ini isinya apa?" Jawabannya biasanya adalah nama elemennya.',
        },
      ],
    },
    {
      heading: "7. Kesalahan umum pemula",
      blocks: [
        {
          type: "table",
          head: ["Masalah", "Penyebab", "Perbaikan"],
          rows: [
            ["Huruf aneh (Ã©, â€”)", "Tidak ada `charset`", 'Tambah `<meta charset="utf-8">`'],
            ["Tampilan kecil di HP", "Tidak ada meta viewport", 'Tambah `<meta name="viewport" ...>`'],
            ["Semua teks besar", "Memakai `h1` untuk semua", "Pakai heading sesuai hierarki"],
            ["Gambar tidak muncul", "Path salah / huruf besar-kecil beda", "Cek nama file & folder relatif"],
            ["Tautan tidak jalan", "Lupa `href` atau salah ekstensi", 'Tulis `href="halaman.html"`'],
            ["Tag tidak tertutup", "Salah sarang", "Pastikan `<p><em>..</em></p>`, bukan sebaliknya"],
          ],
        },
      ],
    },
  ],
  exercise: [
    "Buat file `profil.html` dengan struktur dokumen lengkap: `lang=\"id\"`, charset, viewport, dan judul.",
    "Tambahkan satu `h1` berisi namamu, lalu paragraf perkenalan singkat.",
    "Tambahkan satu gambar dengan `alt` yang deskriptif, satu `ul` berisi 3 keahlian, dan satu `ol` berisi 3 tujuan belajar.",
    "Tambahkan tautan ke satu situs favorit, dibuka di tab baru dengan `rel=\"noopener\"`.",
    "Bungkus semuanya dengan `header`, `main`, dan `footer`.",
    "Periksa hasilnya di browser: apakah judul tab sesuai, gambar muncul, dan tautan bisa diklik?",
  ],
  checklist: [
    "Saya bisa menulis kerangka dokumen HTML tanpa melihat contoh.",
    "Saya tahu perbedaan `head` dan `body`.",
    "Saya memakai heading sesuai hierarki, bukan ukuran.",
    "Semua gambar saya punya `alt`.",
    "Saya bisa menjelaskan kapan memakai `article` vs `section`.",
  ],
}

export default lesson
