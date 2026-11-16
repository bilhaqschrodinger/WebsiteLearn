import type { Lesson } from "./types"

const lesson: Lesson = {
  slug: "css-tampilan",
  num: "02",
  title: "CSS: Tampilan",
  short: "CSS: Tampilan",
  desc: "Selektor, box model, warna, tipografi, dan variabel untuk membentuk komponen.",
  group: "fondasi",
  lead:
    "HTML memberi arti, CSS memberi bentuk. Materi ini menjelaskan cara CSS memilih elemen, cara menghitung ukuran, dan kenapa kadang gayamu terasa \"tidak mau berlaku\".",
  goals: [
    "Menghubungkan CSS ke HTML dengan cara yang benar.",
    "Memahami selektor dan prioritas (cascade & specificity).",
    "Menguasai box model: margin, border, padding, content.",
    "Memilih unit, warna, dan tipografi yang tepat.",
  ],
  components: [
    { name: "Tombol", note: "Latar, radius, padding, dan state `:hover` / `:focus-visible`." },
    { name: "Kartu", note: "Border halus, radius, bayangan, dan jarak dalam." },
    { name: "Badge & label", note: "Teks kecil, huruf kapital, latar lembut." },
    { name: "Nav link", note: "Warna diam, hover, dan penanda halaman aktif." },
    { name: "Tema", note: "Satu set variabel yang dipakai seluruh komponen." },
  ],
  sections: [
    {
      heading: "1. Tiga cara memasang CSS",
      blocks: [
        {
          type: "code",
          label: "HTML",
          code: `<!-- 1. External (paling dianjurkan) -->
<link rel="stylesheet" href="assets/style.css">

<!-- 2. Internal, di dalam <head> -->
<style>
  body { background: #fafafa; }
</style>

<!-- 3. Inline, di atribut style (hindari kecuali mendesak) -->
<p style="color: red;">Teks merah</p>`,
        },
        {
          type: "callout",
          tone: "tip",
          title: "Selalu mulai dari file eksternal",
          text:
            "Satu file CSS bisa dipakai banyak halaman, mudah diubah, dan bisa di-cache browser. Inline style sulit dicari dan mengalahkan hampir semua aturan lain.",
        },
      ],
    },
    {
      heading: "2. Selektor dan siapa yang menang",
      blocks: [
        {
          type: "code",
          label: "CSS",
          code: `p            { }   /* semua <p> */
.card        { }   /* semua elemen class="card" */
#utama       { }   /* elemen id="utama" (unik) */
nav a        { }   /* semua <a> di dalam <nav> */
.card > h2   { }   /* h2 yang anak langsung .card */
h2 + p       { }   /* p tepat setelah h2 */
a:hover      { }   /* saat kursor di atas tautan */
input:focus  { }   /* saat input aktif */
li:nth-child(2) { } /* item kedua */
[type="email"] { } /* atribut tertentu */`,
        },
        { type: "p", text: "Gunakan class untuk gaya, id untuk penanda unik (misalnya target anchor)." },
        {
          type: "p",
          text: "Kalau beberapa aturan mengenai elemen yang sama, browser memilih pemenang dengan urutan ini:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "`!important` — menang atas segalanya (hindari).",
            "Inline style di atribut `style`.",
            "Specificity: id > class/atribut/pseudo-class > elemen.",
            "Urutan tulis: aturan yang lebih bawah menang jika seri.",
          ],
        },
        {
          type: "code",
          label: "CSS",
          code: `/* specificity: (id, class, elemen) */
p              { color: gray; }   /* 0,0,1 */
.catatan       { color: blue; }   /* 0,1,0  ← menang */
#paragraf-1    { color: green; }  /* 1,0,0  ← menang lagi */

/* kalau seri, yang terakhir menang */
.tombol { background: red; }
.tombol { background: blue; }     /* biru */`,
        },
        {
          type: "callout",
          tone: "warn",
          title: 'Kalau CSS "tidak berlaku"',
          text:
            "Hampir selalu ada tiga penyebab: (1) selektornya salah atau tidak cocok, (2) ada aturan lain yang lebih spesifik, atau (3) file CSS tidak ter-load (cek tab Network di DevTools). Jangan langsung menambah `!important`.",
        },
      ],
    },
    {
      heading: "3. Box model: semua elemen adalah kotak",
      blocks: [
        {
          type: "code",
          label: "CSS",
          code: `.kotak {
  width: 300px;             /* lebar konten */
  padding: 16px;            /* ruang di dalam, antara konten dan border */
  border: 2px solid #333;
  margin: 24px;             /* ruang di luar, mendorong elemen lain */
  box-sizing: border-box;   /* width termasuk padding + border */
}`,
        },
        {
          type: "callout",
          tone: "info",
          title: "Selalu pasang ini di awal",
          code: `*, *::before, *::after {
  box-sizing: border-box;
}`,
          text:
            "Tanpa ini, `width: 300px` plus padding 16px menjadi 332px dan layout mudah meluber. Dengan `border-box`, 300px berarti 300px total.",
        },
        {
          type: "p",
          text: "Inilah alasan `padding` pada kartu sering membuat kartu melebar keluar wadah. Satu aturan global di atas mencegah seluruh kelas masalah itu.",
        },
      ],
    },
    {
      heading: "4. Unit, warna, dan tipografi",
      blocks: [
        {
          type: "table",
          head: ["Unit", "Arti", "Kapan dipakai"],
          rows: [
            ["`px`", "Piksel CSS", "Border, bayangan, detail kecil"],
            ["`rem`", "Relatif terhadap font-size root (biasanya 16px)", "Font, padding, jarak — paling aman"],
            ["`em`", "Relatif terhadap font-size elemen induk", "Komponen yang skalanya ikut font"],
            ["`%`", "Persentase dari induk", "Lebar kolom"],
            ["`vw` / `vh`", "1% lebar/tinggi viewport", "Hero layar penuh"],
            ["`ch`", "Lebar karakter \"0\"", "Membatasi panjang baris teks"],
            ["`clamp()`", "Nilai dinamis dengan batas", "Judul yang menyesuaikan layar"],
          ],
        },
        {
          type: "code",
          label: "CSS",
          code: `/* Judul: minimal 1.6rem, ideal 4vw, maksimal 2.6rem */
h1 { font-size: clamp(1.6rem, 4vw, 2.6rem); }

/* Lebar baca yang nyaman */
p { max-width: 68ch; }`,
        },
        {
          type: "code",
          label: "CSS",
          code: `.contoh {
  color: #1f2937;                    /* hex */
  background: rgb(43 92 246);        /* rgb */
  border-color: rgb(43 92 246 / .3); /* rgb + alpha */
  outline-color: hsl(224 88% 57%);   /* hsl */
}

body {
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 1rem;        /* 16px */
  line-height: 1.6;       /* jarak antarbaris */
  color: #1f2937;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3 {
  line-height: 1.2;
  letter-spacing: -0.02em;
  text-wrap: balance;     /* hindari baris terakhir hanya 1 kata */
}

p { text-wrap: pretty; }`,
        },
        {
          type: "callout",
          tone: "tip",
          title: "Aturan tipografi praktis",
          text:
            "Baris teks ideal 50–75 karakter (`max-width: 68ch`). `line-height` 1.5–1.7 untuk isi, 1.1–1.3 untuk judul. Maksimal 2 jenis huruf — satu pun cukup. Jangan gunakan teks lebih kecil dari 14px untuk isi.",
        },
      ],
    },
    {
      heading: "5. Pseudo-class: state sebuah komponen",
      blocks: [
        {
          type: "p",
          text: "Komponen yang baik memberi tahu keadaannya. Pseudo-class adalah cara CSS melakukannya tanpa JavaScript.",
        },
        {
          type: "code",
          label: "CSS",
          code: `a:hover        { text-decoration: underline; }
button:focus-visible { outline: 2px solid #2b5cf6; outline-offset: 2px; }
input:invalid  { border-color: #b0202a; }
li:first-child { margin-top: 0; }
li:last-child  { margin-bottom: 0; }
.card:not(.unggulan) { opacity: .9; }`,
        },
        {
          type: "p",
          text: "`display` juga menentukan komponen berperilaku sebagai blok atau mengikuti teks: `display: block` memenuhi lebar, `inline` mengikuti teks, `none` menghilangkan dari layout, `inline-block` seperti teks tetapi bisa diberi ukuran.",
        },
      ],
    },
    {
      heading: "6. Variabel CSS dan urutan file yang sehat",
      blocks: [
        {
          type: "p",
          text: "Ini cara modern menjaga warna dan ukuran tetap konsisten di seluruh komponen:",
        },
        {
          type: "code",
          label: "CSS",
          code: `:root {
  --warna-utama: #2b5cf6;
  --warna-teks: #111827;
  --radius: 12px;
  --jarak: 1rem;
}

.tombol {
  background: var(--warna-utama);
  color: #fff;
  border-radius: var(--radius);
  padding: calc(var(--jarak) * .7) var(--jarak);
}

/* tema gelap cukup mengganti variabel */
@media (prefers-color-scheme: dark) {
  :root {
    --warna-teks: #f3f4f6;
  }
}`,
        },
        {
          type: "code",
          label: "urutan style.css",
          code: `/* 1. Reset / dasar */
*, *::before, *::after { box-sizing: border-box; }
body, h1, h2, p { margin: 0; }

/* 2. Variabel & tema */
:root { --warna-utama: #2b5cf6; }

/* 3. Dasar elemen */
body { font-family: system-ui, sans-serif; line-height: 1.6; }
a { color: var(--warna-utama); }

/* 4. Layout */
.container { max-width: 1100px; margin-inline: auto; padding-inline: 1.25rem; }

/* 5. Komponen */
.card { border: 1px solid #e5e7eb; border-radius: 12px; padding: 1rem; }

/* 6. Utilitas & media query */
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }`,
        },
        {
          type: "table",
          head: ["Gejala", "Penyebab"],
          rows: [
            ["Layout melebar keluar layar", "Padding ditambahkan di luar `width` (tanpa `border-box`)"],
            ["Margin antar elemen aneh", "Margin vertikal bertumpuk (margin collapse)"],
            ["Style tidak berubah", "Cache browser — coba Ctrl+F5"],
            ["Teks tidak bisa dibaca", "Kontras rendah atau ukuran terlalu kecil"],
            ["Semua serba `!important`", "Selektor terlalu umum; perbaiki strukturnya, bukan menambah paksa"],
          ],
        },
      ],
    },
  ],
  exercise: [
    "Buat `kartu.html` berisi satu kartu: judul, paragraf, dan tombol.",
    "Beri kartu `padding`, `border-radius`, dan bayangan halus.",
    "Buat variabel `--warna-utama` dan pakai di tombol serta judul.",
    "Ubah `--warna-utama` sekali, pastikan semua komponen ikut berubah.",
    "Buat dua class tombol (utama & kedua) yang hanya beda warna latar.",
  ],
  checklist: [
    "Saya paham bedanya `margin`, `border`, dan `padding`.",
    "Saya memakai `box-sizing: border-box` secara global.",
    "Saya bisa menjelaskan kenapa satu aturan mengalahkan aturan lain.",
    "Saya memakai `rem` untuk ukuran yang berkaitan dengan teks.",
    "Saya memakai variabel CSS untuk warna utama.",
  ],
}

export default lesson
