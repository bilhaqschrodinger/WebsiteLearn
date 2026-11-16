import type { Lesson } from "./types"

const lesson: Lesson = {
  slug: "cheatsheet",
  num: "10",
  title: "Cheatsheet",
  short: "Cheatsheet",
  desc: "Rujukan cepat HTML, CSS, Flexbox, Grid, JavaScript, form, aksesibilitas, dan Git.",
  group: "rilis",
  lead:
    "Rujukan cepat untuk dikembali saat mengerjakan proyek. Cetak halaman ini atau simpan sebagai bookmark — semuanya dalam satu tempat.",
  goals: [
    "Menemukan sintaks yang sering dipakai tanpa mencari ulang.",
    "Memeriksa komponen sebelum dianggap selesai.",
    "Menjalankan alur Git dasar dengan percaya diri.",
    "Menyiapkan daftar periksa rilis.",
  ],
  components: [
    { name: "Kerangka halaman", note: "doctype, head, body, script." },
    { name: "Komponen visual", note: "Kartu, tombol, navbar, grid." },
    { name: "Komponen interaktif", note: "DOM, event, `localStorage`, `fetch`." },
    { name: "Daftar periksa rilis", note: "10 hal yang wajib dicek sebelum online." },
  ],
  sections: [
    {
      heading: "1. Kerangka dokumen",
      blocks: [
        {
          type: "code",
          label: "HTML",
          code: `<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Judul</title>
  <meta name="description" content="Ringkasan halaman.">
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
  <header><nav>...</nav></header>
  <main>...</main>
  <footer>...</footer>
  <script src="assets/js/app.js" defer></script>
</body>
</html>`,
        },
        {
          type: "table",
          head: ["Tag", "Fungsi"],
          rows: [
            ["`h1`–`h6`", "Judul berjenjang"],
            ["`p`", "Paragraf"],
            ["`a href`", "Tautan"],
            ["`img src alt`", "Gambar"],
            ["`ul` / `ol` / `li`", "Daftar"],
            ["`strong` / `em`", "Penekanan penting"],
            ["`figure` / `figcaption`", "Gambar + keterangan"],
            ["`header` / `footer`", "Pembuka / penutup"],
            ["`nav`", "Navigasi"],
            ["`main`", "Konten utama (satu per halaman)"],
            ["`article` / `section`", "Konten mandiri / kelompok bertema"],
            ["`aside`", "Konten sampingan"],
            ["`div` / `span`", "Pembungkus blok / inline"],
            ["`button`", "Tombol (bisa difokus)"],
            ["`form`, `label`, `input`, `textarea`, `select`", "Formulir"],
            ["`table`, `tr`, `th`, `td`", "Tabel data"],
            ["`details` / `summary`", "Accordion bawaan"],
            ["`dialog`", "Modal bawaan"],
          ],
        },
      ],
    },
    {
      heading: "2. CSS: properti inti",
      blocks: [
        {
          type: "code",
          label: "CSS",
          code: `/* Dasar global */
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, sans-serif; line-height: 1.6; }

/* Kotak */
width, height, max-width, min-height
margin, padding          /* 1–4 nilai: atas kanan bawah kiri */
border: 1px solid #ddd
border-radius: 12px
box-shadow: 0 8px 24px -12px rgb(0 0 0 / .2)
overflow: hidden | auto

/* Teks */
font-size, font-weight, font-family
line-height, letter-spacing
text-align, text-decoration, text-transform
color, background

/* Tata letak */
display: block | inline | flex | grid | none
position: relative | absolute | fixed | sticky
inset / top right bottom left
z-index
gap

/* Efek */
opacity, transform, transition, cursor

/* Responsif */
@media (min-width: 768px) { }
clamp(min, ideal, max)`,
        },
      ],
    },
    {
      heading: "3. Flexbox dan Grid",
      blocks: [
        {
          type: "code",
          label: "CSS",
          code: `.induk {
  display: flex;
  flex-direction: row | column;
  flex-wrap: wrap;
  justify-content: flex-start | center | flex-end | space-between | space-around | space-evenly;
  align-items: stretch | flex-start | center | flex-end | baseline;
  gap: 1rem;
}

.anak {
  flex: 1;                 /* tumbuh mengisi ruang */
  flex: 0 0 220px;         /* ukuran tetap */
  align-self: center;
  order: 2;
  margin-left: auto;       /* dorong ke kanan */
}`,
        },
        {
          type: "code",
          label: "CSS",
          code: `.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-template-rows: auto 1fr auto;
  gap: 1rem;
}

.item { grid-column: span 2; }
.item-penuh { grid-column: 1 / -1; }

/* Area bernama */
.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 240px 1fr;
}
.layout > header { grid-area: header; }`,
        },
      ],
    },
    {
      heading: "4. JavaScript",
      blocks: [
        {
          type: "code",
          label: "JavaScript",
          code: `// Variabel
const tetap = 1;
let berubah = 2;

// Fungsi
const tambah = (a, b) => a + b;

// Seleksi
const el = document.querySelector(".kartu");
const semua = document.querySelectorAll(".kartu");

// Ubah
el.textContent = "Teks";
el.classList.add("aktif");
el.classList.toggle("buka");
el.style.color = "red";

// Buat
const li = document.createElement("li");
li.textContent = "Baru";
document.querySelector("ul").append(li);

// Hapus
li.remove();

// Event
el.addEventListener("click", (e) => { e.preventDefault(); });

// Array
array.map(fn); array.filter(fn); array.reduce(fn, awal);
array.forEach(fn); array.includes(nilai);

// Simpan di browser
localStorage.setItem("kunci", "nilai");
localStorage.getItem("kunci");

// Ambil data
const res = await fetch("/api/data");
const data = await res.json();`,
        },
      ],
    },
    {
      heading: "5. Form dan aksesibilitas",
      blocks: [
        {
          type: "code",
          label: "HTML",
          code: `<label for="email">Email</label>
<input id="email" name="email" type="email"
       required autocomplete="email">

<input type="text" minlength="3" maxlength="40">
<input type="number" min="1" max="10">
<input type="text" pattern="[0-9]{5}" title="5 angka">
<textarea rows="5"></textarea>
<select><option>Pilih</option></select>
<button type="submit">Kirim</button>`,
        },
        {
          type: "code",
          label: "HTML + CSS",
          code: `<a class="skip-link" href="#utama">Ke konten</a>
<img src="foto.jpg" alt="Deskripsi isi gambar">
<img src="garis.png" alt="">
<button aria-label="Tutup"><svg aria-hidden="true">...</svg></button>
<nav aria-label="Navigasi utama">...</nav>
<input aria-describedby="bantuan">
<p id="bantuan">Teks bantuan</p>

:focus-visible { outline: 2px solid #2b5cf6; outline-offset: 2px; }

@media (prefers-reduced-motion: reduce) {
  * { animation-duration: .01ms !important; transition-duration: .01ms !important; }
}`,
        },
      ],
    },
    {
      heading: "6. Git dan DevTools",
      blocks: [
        {
          type: "code",
          label: "Terminal",
          code: `git init
git status
git add .
git commit -m "Pesan perubahan"
git log --oneline
git branch
git checkout -b fitur-baru
git remote add origin URL
git push -u origin main
git pull`,
        },
        {
          type: "table",
          head: ["Pintasan", "Fungsi"],
          rows: [
            ["F12", "Buka DevTools"],
            ["Ctrl+Shift+M", "Mode perangkat (responsive)"],
            ["Ctrl+Shift+C", "Pilih elemen di halaman"],
            ["Ctrl+F5", "Muat ulang tanpa cache"],
            ["Esc", "Tutup panel bawah Console"],
          ],
        },
      ],
    },
    {
      heading: "7. Sebelum rilis",
      blocks: [
        {
          type: "list",
          items: [
            "Satu `h1` per halaman.",
            "`title` + `description` unik.",
            "Semua gambar punya `alt`.",
            "Tidak ada scroll horizontal di 360px.",
            "Semua tautan berfungsi.",
            "Form tervalidasi & terkirim.",
            "Bisa dipakai dengan keyboard.",
            "Kontras teks ≥ 4.5:1.",
            "HTTPS aktif.",
            "Sudah diuji di 2 browser.",
          ],
        },
        {
          type: "callout",
          tone: "tip",
          title: "Setelah cheatsheet",
          text:
            "Cara terbaik mengunci materi ini adalah membangun satu halaman utuh dari nol: header, hero, tiga kartu, form kontak, dan footer. Kalau semuanya bisa kamu tulis tanpa membuka materi, kamu sudah siap.",
        },
      ],
    },
  ],
  exercise: [
    "Ambil halaman profilmu, lalu audit dengan daftar \"Sebelum rilis\" di atas.",
    "Perbaiki semua poin yang belum lulus dan catat apa yang berubah.",
    "Simpan halaman cheatsheet ini sebagai bookmark agar mudah dibuka saat coding.",
  ],
  checklist: [
    "Saya bisa menulis kerangka dokumen tanpa melihat contoh.",
    "Saya tahu properti CSS dan pola Flexbox/Grid yang paling sering dipakai.",
    "Saya bisa memilih elemen, mengubah DOM, dan menangani event.",
    "Saya punya daftar periksa rilis yang saya jalankan sebelum deploy.",
  ],
}

export default lesson
