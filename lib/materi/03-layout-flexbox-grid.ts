import type { Lesson } from "./types"

const lesson: Lesson = {
  slug: "layout-flexbox-grid",
  num: "03",
  title: "Layout: Flexbox & Grid",
  short: "Layout: Flexbox & Grid",
  desc: "Menyusun komponen jadi tata letak yang rapi: navbar, galeri kartu, sidebar, dan footer.",
  group: "fondasi",
  lead:
    "Dua alat ini menyelesaikan 95% kebutuhan tata letak modern. Aturan sederhananya: Flexbox untuk satu arah (baris atau kolom), Grid untuk dua arah (baris dan kolom sekaligus).",
  goals: [
    "Menyusun elemen dalam baris/kolom dengan Flexbox.",
    "Membuat grid kartu yang otomatis menyesuaikan lebar.",
    "Membangun layout halaman penuh dengan Grid area.",
    "Tahu kapan memakai yang mana.",
  ],
  components: [
    { name: "Navbar", note: "Logo kiri, menu kanan — satu baris Flexbox." },
    { name: "Galeri kartu", note: "Grid `auto-fit` yang menyesuaikan jumlah kolom." },
    { name: "Kartu sejajar", note: "Tombol selalu menempel di bawah, tinggi kartu sama." },
    { name: "Layout sidebar", note: "Header, sidebar, konten, footer dengan Grid area." },
    { name: "Hero terpusat", note: "Satu blok di tengah layar secara horizontal & vertikal." },
  ],
  sections: [
    {
      heading: "1. Flexbox: dasar",
      blocks: [
        {
          type: "code",
          label: "CSS",
          code: `.baris {
  display: flex;
  gap: 12px;                 /* jarak antar anak, lebih rapi dari margin */
  justify-content: center;   /* posisi sepanjang sumbu utama */
  align-items: center;       /* posisi sepanjang sumbu silang */
}`,
        },
        {
          type: "table",
          head: ["`flex-direction`", "Sumbu utama (justify)", "Sumbu silang (align)"],
          rows: [
            ["`row` (default)", "horizontal →", "vertikal ↕"],
            ["`column`", "vertikal ↓", "horizontal ↔"],
          ],
        },
        {
          type: "code",
          label: "CSS",
          code: `.wadah {
  display: flex;
  flex-direction: row;             /* row | column */
  flex-wrap: wrap;                 /* boleh turun baris kalau sempit */
  justify-content: space-between;  /* flex-start | center | flex-end | space-around | space-evenly */
  align-items: center;             /* stretch | flex-start | flex-end | baseline */
  gap: 1rem;
}

.anak { flex: 1; }                 /* bagi ruang sisa secara merata */
.anak-tetap { flex: 0 0 220px; }   /* jangan melebar/menyusut, lebar 220px */
.anak-kanan { margin-left: auto; } /* dorong ke ujung kanan */`,
        },
        {
          type: "callout",
          tone: "info",
          title: "Kesalahan paling sering",
          text:
            '`display: flex` pada induk membuat anak menyusut sesuai isinya — bukan otomatis selebar penuh. Kalau butuh anak mengisi ruang, tambahkan `flex: 1`.',
        },
      ],
    },
    {
      heading: "2. Pola Flexbox yang sering dipakai",
      blocks: [
        { type: "p", text: "**a. Navbar: logo kiri, menu kanan**" },
        {
          type: "code",
          label: "CSS",
          code: `.navbar {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #e5e7eb;
}
.navbar nav { margin-left: auto; display: flex; gap: 1rem; }`,
        },
        { type: "p", text: "**b. Pusatkan sesuatu secara horizontal & vertikal**" },
        {
          type: "code",
          label: "CSS",
          code: `.tengah {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;   /* atau 100dvh di HP */
}`,
        },
        { type: "p", text: "**c. Kartu dengan tombol selalu di bawah**" },
        {
          type: "code",
          label: "CSS",
          code: `.kartu {
  display: flex;
  flex-direction: column;
  gap: .75rem;
}
.kartu .isi { flex: 1; }          /* isi mengambil sisa tinggi */
.kartu .tombol { margin-top: auto; }`,
        },
      ],
    },
    {
      heading: "3. CSS Grid: dasar",
      blocks: [
        {
          type: "code",
          label: "CSS",
          code: `.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);  /* 3 kolom sama lebar */
  gap: 16px;
}`,
        },
        {
          type: "p",
          text: "Versi responsif tanpa media query — pola paling berguna untuk galeri kartu:",
        },
        {
          type: "code",
          label: "CSS",
          code: `.grid-kartu {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
}`,
        },
        {
          type: "p",
          text: 'Artinya: "buat kolom sebanyak yang muat, tiap kolom minimal 240px, lalu bagi sisa ruang." Di HP jadi 1 kolom, di desktop jadi 3–4 kolom — otomatis.',
        },
        {
          type: "callout",
          tone: "tip",
          title: "`auto-fill` vs `auto-fit`",
          text:
            "`auto-fill` tetap menyisakan kolom kosong; `auto-fit` menghapus kolom kosong sehingga kartu meregang memenuhi lebar. Untuk galeri kartu, `auto-fit` biasanya terlihat lebih baik.",
        },
      ],
    },
    {
      heading: "4. Grid area: kerangka halaman penuh",
      blocks: [
        {
          type: "code",
          label: "CSS",
          code: `.halaman {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header"
    "sidebar utama"
    "footer footer";
  min-height: 100vh;
  gap: 1px;
}

.halaman > header  { grid-area: header; }
.halaman > aside   { grid-area: sidebar; }
.halaman > main    { grid-area: utama; }
.halaman > footer  { grid-area: footer; }

@media (max-width: 800px) {
  .halaman {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "utama"
      "sidebar"
      "footer";
  }
}`,
        },
        {
          type: "p",
          text: "Item juga bisa dibentangkan tanpa nama area:",
        },
        {
          type: "code",
          label: "CSS",
          code: `.item-lebar { grid-column: span 2; }     /* selebar 2 kolom */
.item-penuh { grid-column: 1 / -1; }    /* dari kolom pertama sampai terakhir */
.item-baris2 { grid-row: 1 / span 2; }  /* setinggi 2 baris */`,
        },
      ],
    },
    {
      heading: "5. Kapan pakai apa?",
      blocks: [
        {
          type: "table",
          head: ["Kebutuhan", "Pilihan"],
          rows: [
            ["Menu horizontal, tombol berjajar", "Flexbox"],
            ["Kartu dengan tinggi sama & isi rata", "Flexbox (`flex-direction: column`)"],
            ["Galeri kartu responsif", "Grid `auto-fit`"],
            ["Layout halaman (header/sidebar/main/footer)", "Grid area"],
            ["Form: label + input berpasangan", "Grid 2 kolom"],
            ["Pusatkan satu elemen di layar", "Flexbox atau `place-items: center`"],
          ],
        },
        {
          type: "callout",
          tone: "info",
          title: "Boleh digabung",
          text:
            "Grid untuk kerangka besar, Flexbox untuk isi di dalamnya. Ini pola yang paling umum dan sehat — bukan dua pilihan yang saling meniadakan.",
        },
        {
          type: "list",
          items: [
            "Jangan menambahkan `margin` ke setiap anak kalau induk sudah memakai `gap`.",
            "Jangan memakai `height: 100%` tanpa induk yang punya tinggi pasti — gunakan `min-height: 100vh`.",
            "Jangan memakai `position: absolute` untuk layout utama; hampir selalu bisa diganti Flex/Grid.",
          ],
        },
      ],
    },
  ],
  exercise: [
    "Buat galeri 6 kartu dengan Grid `auto-fit minmax(240px, 1fr)`.",
    "Setiap kartu berisi judul, paragraf, dan tombol yang selalu menempel di bawah.",
    "Buat navbar dengan logo di kiri dan 3 menu di kanan memakai Flexbox.",
    "Buat layout 2 kolom (sidebar 240px + konten) yang berubah jadi 1 kolom di bawah 800px.",
  ],
  checklist: [
    "Saya bisa menjelaskan sumbu utama dan sumbu silang.",
    "Saya bisa membuat galeri responsif tanpa media query.",
    "Saya bisa membuat tombol selalu di bawah kartu.",
    "Saya tahu kapan memilih Flexbox dan kapan Grid.",
  ],
}

export default lesson
