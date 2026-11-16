import type { Lesson } from "./types"

const lesson: Lesson = {
  slug: "responsive-design",
  num: "04",
  title: "Responsive Design",
  short: "Responsive Design",
  desc: "Meta viewport, mobile-first, breakpoint, unit fluid, dan gambar yang menyesuaikan layar.",
  group: "fondasi",
  lead:
    "Lebih dari separuh pengunjung membuka website dari ponsel. Halaman yang hanya nyaman di desktop akan terasa rusak di sana — teks kecil, tombol meleset, dan scroll horizontal.",
  goals: [
    "Memahami peran meta viewport.",
    "Menulis media query dengan pendekatan mobile-first.",
    "Memakai unit dan gambar yang menyesuaikan layar.",
    "Menghindari penyebab scroll horizontal.",
  ],
  components: [
    { name: "Menu HP", note: "Menu horizontal di desktop, tombol ☰ dengan target 44×44px di HP." },
    { name: "Hero fluid", note: "Judul `clamp()` dan padding yang mengecil di layar sempit." },
    { name: "Galeri kartu", note: "1 kolom di HP, 2 di tablet, 3 di desktop." },
    { name: "Gambar responsif", note: "`max-width: 100%`, `srcset`, dan rasio tetap." },
  ],
  sections: [
    {
      heading: "1. Fondasi wajib: meta viewport",
      blocks: [
        {
          type: "code",
          label: "HTML",
          code: `<meta name="viewport" content="width=device-width, initial-scale=1">`,
        },
        {
          type: "p",
          text: "Tanpa baris ini, ponsel akan menganggap halamanmu selebar 980px lalu mengecilkannya. Semua media query jadi tidak berfungsi seperti yang diharapkan.",
        },
      ],
    },
    {
      heading: "2. Mobile-first: mulai dari layar kecil",
      blocks: [
        {
          type: "p",
          text: "Tulis gaya dasar untuk layar sempit, lalu tambahkan aturan untuk layar lebar memakai `min-width`. Hasilnya CSS lebih sedikit dan lebih mudah dirawat.",
        },
        {
          type: "code",
          label: "CSS",
          code: `/* Dasar: berlaku untuk semua ukuran (HP dulu) */
.grid-kartu {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

/* Tablet ke atas */
@media (min-width: 640px) {
  .grid-kartu { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop ke atas */
@media (min-width: 1024px) {
  .grid-kartu { grid-template-columns: repeat(3, 1fr); }
}`,
        },
        {
          type: "callout",
          tone: "warn",
          title: "Hindari pendekatan desktop-first untuk proyek baru",
          text:
            "Kalau mulai dari desktop dengan `max-width`, kamu akan menulis banyak penimpaan dan sering lupa satu-dua kasus di HP.",
        },
      ],
    },
    {
      heading: "3. Breakpoint yang wajar",
      blocks: [
        {
          type: "p",
          text: "Jangan meniru angka perangkat tertentu. Pilih titik di mana desainmu mulai terasa sempit.",
        },
        {
          type: "table",
          head: ["Nama", "Lebar", "Perubahan umum"],
          rows: [
            ["HP", "< 640px", "1 kolom, menu jadi tombol"],
            ["Tablet", "640–1023px", "2 kolom"],
            ["Desktop", "≥ 1024px", "3–4 kolom, sidebar muncul"],
            ["Lebar", "≥ 1280px", "Konten dibatasi `max-width`"],
          ],
        },
      ],
    },
    {
      heading: "4. Unit yang menyesuaikan",
      blocks: [
        {
          type: "code",
          label: "CSS",
          code: `/* Judul yang skalanya halus */
h1 { font-size: clamp(1.75rem, 5vw, 3rem); }

/* Wadah konten */
.container {
  width: 100%;
  max-width: 1120px;
  margin-inline: auto;
  padding-inline: clamp(1rem, 4vw, 2rem);
}

/* Jarak antar bagian */
section { padding-block: clamp(2.5rem, 8vw, 6rem); }`,
        },
        {
          type: "p",
          text: "Dengan pola ini, satu set aturan bekerja di semua lebar tanpa media query tambahan.",
        },
      ],
    },
    {
      heading: "5. Gambar dan media",
      blocks: [
        {
          type: "code",
          label: "CSS",
          code: `img, video, svg {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Gambar yang mengisi wadah dengan rapi */
.cover {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 12px;
}`,
        },
        {
          type: "callout",
          tone: "tip",
          title: "Gunakan gambar beresolusi sesuai",
          text:
            "Gambar 4000px untuk kartu 300px hanya memperlambat halaman. Pakai `srcset` untuk menyediakan beberapa ukuran:",
          code: `<img src="foto-640.jpg"
     srcset="foto-640.jpg 640w, foto-1280.jpg 1280w"
     sizes="(max-width: 640px) 100vw, 50vw"
     alt="Meja kerja dengan laptop">`,
        },
      ],
    },
    {
      heading: "6. Menu yang menyesuaikan dan scroll horizontal",
      blocks: [
        {
          type: "p",
          text: "Pola paling umum: menu horizontal di desktop, tombol ☰ di HP. Tombolnya harus cukup besar untuk jari (minimal 44×44px).",
        },
        {
          type: "code",
          label: "CSS",
          code: `.menu { display: none; }          /* tersembunyi di HP */
.menu.is-open { display: flex; flex-direction: column; }

@media (min-width: 768px) {
  .tombol-menu { display: none; }
  .menu { display: flex; flex-direction: row; gap: 1.5rem; }
}`,
        },
        {
          type: "callout",
          tone: "danger",
          title: "Jangan sembunyikan konten penting dengan `display: none`",
          text:
            "Menu yang hanya bisa dibuka dengan JavaScript dan tidak punya alternatif akan membuat sebagian pengguna buntu. Pastikan tombolnya `<button>` asli, punya `aria-expanded`, dan bisa dioperasikan dengan keyboard.",
        },
        {
          type: "table",
          head: ["Penyebab scroll horizontal", "Perbaikan"],
          rows: [
            ["Elemen dengan lebar tetap lebih besar dari layar", "Ganti ke `max-width: 100%` / `1fr`"],
            ["`width: 100vw` + scrollbar vertikal", "Pakai `width: 100%`"],
            ["Padding horizontal pada elemen 100%", "`box-sizing: border-box`"],
            ["Gambar tanpa `max-width`", "Aturan global `img { max-width: 100% }`"],
            ["Margin negatif berlebihan", "Hapus atau ganti dengan padding wadah"],
            ["Teks panjang tanpa spasi (URL)", "`overflow-wrap: anywhere`"],
          ],
        },
        {
          type: "p",
          text: "Untuk menemukan biang keladi scroll horizontal, tempel ini di Console DevTools:",
        },
        {
          type: "code",
          label: "Console",
          code: `document.querySelectorAll("*").forEach(el => {
  if (el.offsetWidth > document.documentElement.clientWidth) {
    console.log(el, el.offsetWidth);
  }
});`,
        },
        {
          type: "list",
          items: [
            "Uji di lebar 360px (HP kecil), 768px (tablet), dan 1280px (desktop).",
            "Perbesar teks browser ke 150% — layout tidak boleh pecah.",
            "Area sentuh minimal 44×44 piksel; jangan mengandalkan `:hover` saja.",
            "Jangan mengunci orientasi atau mematikan zoom (`user-scalable=no`).",
          ],
        },
      ],
    },
  ],
  exercise: [
    "Ambil halaman profil dari latihan materi 01, tambahkan meta viewport.",
    "Buat galeri kartu: 1 kolom di HP, 2 di tablet, 3 di desktop.",
    "Buat judul dengan `clamp()` agar mengecil di HP.",
    "Cari satu halaman nyata di internet, buka DevTools, dan amati bagaimana mereka mengubah layout di 360px.",
  ],
  checklist: [
    "Semua halaman saya punya meta viewport.",
    "Tidak ada scroll horizontal di lebar 360px.",
    "Gambar tidak pernah melebihi lebar wadahnya.",
    "Tombol dan tautan cukup besar untuk jari.",
  ],
}

export default lesson
