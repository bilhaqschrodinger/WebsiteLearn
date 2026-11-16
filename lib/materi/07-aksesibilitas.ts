import type { Lesson } from "./types"

const lesson: Lesson = {
  slug: "aksesibilitas",
  num: "07",
  title: "Aksesibilitas",
  short: "Aksesibilitas",
  desc: "Struktur, keyboard, kontras, teks alternatif, dan ARIA secukupnya.",
  group: "kualitas",
  lead:
    "Aksesibilitas berarti website bisa dipakai oleh semua orang: yang memakai keyboard, pembaca layar, layar kecil, koneksi lambat, atau penglihatan lemah. Banyak perbaikannya justru membuat situs lebih nyaman untuk semua.",
  goals: [
    "Membangun struktur yang bisa dibaca mesin bantu.",
    "Memastikan semua fungsi bisa diakses keyboard.",
    "Menulis teks alternatif dan label yang berguna.",
    "Tahu kapan ARIA diperlukan — dan kapan justru merusak.",
  ],
  components: [
    { name: "Skip link", note: "Tautan pertama halaman untuk melompati menu." },
    { name: "Tombol ikon", note: "`<button>` dengan `aria-label` dan ikon `aria-hidden`." },
    { name: "Fokus terlihat", note: "`:focus-visible` yang jelas di semua elemen interaktif." },
    { name: "Modal", note: "Fokus terkurung, ditutup dengan Esc, punya nama." },
    { name: "Pesan error", note: "`role=\"alert\"` + `aria-describedby` pada field." },
  ],
  sections: [
    {
      heading: "1. Aturan pertama: HTML yang benar",
      blocks: [
        {
          type: "p",
          text: "Sebagian besar aksesibilitas datang gratis dari elemen yang tepat. `<button>` sudah bisa difokus, bisa diaktifkan dengan Enter dan Spasi, dan diumumkan sebagai tombol. `<div onclick>` tidak.",
        },
        {
          type: "code",
          label: "Hindari",
          code: `<div class="tombol" onclick="simpan()">
  Simpan
</div>`,
        },
        {
          type: "code",
          label: "Gunakan",
          code: `<button type="button" onclick="simpan()">
  Simpan
</button>`,
        },
        {
          type: "callout",
          tone: "info",
          title: "Istilah ARIA yang perlu diketahui",
          text:
            "ARIA adalah kumpulan atribut untuk memberi tahu teknologi bantu tentang peran dan keadaan elemen. Aturan emasnya: jangan pakai ARIA kalau HTML asli sudah cukup.",
        },
      ],
    },
    {
      heading: "2. Struktur halaman dan skip link",
      blocks: [
        {
          type: "code",
          label: "HTML",
          code: `<body>
  <a class="skip-link" href="#utama">Langsung ke konten</a>

  <header>
    <nav aria-label="Navigasi utama">...</nav>
  </header>

  <main id="utama">
    <h1>Judul halaman</h1>
  </main>

  <footer>...</footer>
</body>`,
        },
        {
          type: "p",
          text: "**Skip link** adalah tautan pertama di halaman. Ia tersembunyi sampai difokus, lalu memungkinkan pengguna keyboard melompati menu yang panjang.",
        },
        {
          type: "code",
          label: "CSS",
          code: `.skip-link {
  position: absolute;
  top: -100px;
  left: 12px;
  z-index: 100;
  padding: 10px 16px;
  background: #111827;
  color: #fff;
  border-radius: 8px;
  transition: top .15s;
}
.skip-link:focus { top: 12px; }`,
        },
      ],
    },
    {
      heading: "3. Teks alternatif",
      blocks: [
        {
          type: "code",
          label: "HTML",
          code: `<!-- Informatif: jelaskan isinya -->
<img src="grafik-penjualan.png"
     alt="Grafik penjualan naik dari 10 juta pada Januari ke 45 juta pada Juni">

<!-- Dekoratif: kosongkan, jangan dihapus -->
<img src="pembatas.png" alt="">

<!-- Tombol berisi ikon saja -->
<button aria-label="Tutup dialog">
  <svg aria-hidden="true">...</svg>
</button>`,
        },
        {
          type: "callout",
          tone: "warn",
          title: 'Jangan menulis "gambar dari ..."',
          text:
            "Screen reader sudah mengumumkan bahwa itu gambar. Tulis isi informasinya, bukan jenis berkasnya.",
        },
      ],
    },
    {
      heading: "4. Kontras warna",
      blocks: [
        {
          type: "table",
          head: ["Jenis teks", "Rasio minimal"],
          rows: [
            ["Teks biasa (< 24px)", "4.5 : 1"],
            ["Teks besar (≥ 24px atau ≥ 19px tebal)", "3 : 1"],
            ["Ikon & batas komponen penting", "3 : 1"],
          ],
        },
        {
          type: "p",
          text: "Alat bantu: ekstensi \"WCAG Contrast Checker\", atau panel Accessibility di DevTools yang langsung menampilkan rasio. Periksa juga keadaan `:hover` dan `:disabled` — dua tempat kontras paling sering jatuh.",
        },
      ],
    },
    {
      heading: "5. Keyboard dan fokus",
      blocks: [
        {
          type: "p",
          text: "Uji dengan mencabut mouse. Urutan Tab harus masuk akal dan fokus harus selalu terlihat.",
        },
        {
          type: "code",
          label: "CSS",
          code: `/* Fokus yang jelas, hanya saat navigasi keyboard */
:focus-visible {
  outline: 2px solid #2b5cf6;
  outline-offset: 2px;
}

/* Jangan pernah: */
/* *:focus { outline: none; } */`,
        },
        {
          type: "list",
          items: [
            "Semua yang bisa diklik harus bisa difokus (`<a>`, `<button>`, `<input>`).",
            "Jangan memakai `tabindex` positif — ia mengacaukan urutan alami.",
            "Elemen yang disembunyikan dengan `display: none` otomatis tidak bisa difokus.",
            "Modal/dialog harus mengurung fokus di dalamnya sampai ditutup.",
          ],
        },
      ],
    },
    {
      heading: "6. Form, ARIA, dan cara menguji",
      blocks: [
        {
          type: "code",
          label: "HTML",
          code: `<label for="email">Email</label>
<input id="email" type="email" required
       aria-describedby="email-bantuan">
<p id="email-bantuan">Kami hanya mengirim buletin bulanan.</p>

<!-- Error yang terhubung -->
<input id="sandi" type="password" aria-invalid="true"
       aria-describedby="sandi-error">
<p id="sandi-error" role="alert">Kata sandi minimal 8 karakter.</p>`,
        },
        {
          type: "p",
          text: "`aria-describedby` membuat teks bantuan/error dibacakan saat field difokus. `role=\"alert\"` membuat pesan baru langsung diumumkan.",
        },
        {
          type: "table",
          head: ["Atribut", "Kapan dipakai"],
          rows: [
            ["`aria-label`", "Memberi nama pada elemen tanpa teks terlihat (tombol ikon)"],
            ["`aria-expanded`", "Status buka/tutup menu atau accordion"],
            ['`aria-current="page"`', "Menandai tautan halaman aktif"],
            ['`aria-hidden="true"`', "Menyembunyikan elemen dekoratif dari pembaca layar"],
            ["`aria-live`", "Mengumumkan perubahan konten (hasil pencarian, notifikasi)"],
            ['`role="alert"`', "Pesan penting yang harus segera diumumkan"],
          ],
        },
        {
          type: "callout",
          tone: "danger",
          title: "ARIA bisa memperburuk",
          text:
            '`role="button"` pada `div` tidak otomatis menambahkan dukungan keyboard. Kalau memaksa memakai div, kamu harus menambahkan `tabindex="0"`, penanganan Enter dan Spasi, serta role yang tepat. Lebih mudah memakai `<button>`.',
        },
        {
          type: "list",
          ordered: true,
          items: [
            "**Keyboard saja** — Tab melalui seluruh halaman. Semua bisa dicapai? Fokus terlihat?",
            "**Zoom 200%** — tidak ada teks terpotong.",
            "**DevTools → Lighthouse → Accessibility** — skor dan daftar masalah.",
            "**Screen reader** — NVDA (Windows, gratis) atau VoiceOver (macOS: Cmd+F5).",
            "**Simulasi buta warna** — panel Rendering di DevTools.",
          ],
        },
      ],
    },
  ],
  exercise: [
    "Tambahkan skip link ke halaman profilmu.",
    "Uji seluruh halaman hanya dengan Tab; perbaiki apa pun yang tidak bisa dicapai.",
    "Periksa kontras semua teks; ganti yang di bawah 4.5:1.",
    "Beri `aria-label` pada semua tombol yang hanya berisi ikon.",
    "Jalankan Lighthouse Accessibility dan capai skor ≥ 95.",
  ],
  checklist: [
    "Saya bisa menavigasi seluruh halaman dengan keyboard.",
    "Fokus selalu terlihat jelas.",
    "Semua gambar punya `alt` yang sesuai konteks.",
    "Kontras teks memenuhi minimal 4.5:1.",
    "Saya tidak memakai ARIA untuk hal yang bisa dilakukan HTML.",
  ],
}

export default lesson
