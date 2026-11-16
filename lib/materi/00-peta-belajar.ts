import type { Lesson } from "./types"

const lesson: Lesson = {
  slug: "peta-belajar",
  num: "00",
  title: "Peta Belajar",
  short: "Peta Belajar",
  desc: "Gambaran besar: apa saja komponen yang membentuk sebuah website dan urutan mempelajarinya.",
  group: "mulai",
  lead:
    "Sebelum menulis satu baris kode, kamu perlu tahu bahan bangunan sebuah website. Materi ini memetakan lima lapisan yang selalu ada, komponen apa saja yang biasa muncul di halaman, dan urutan belajar yang masuk akal.",
  goals: [
    "Mengenali lima lapisan yang membentuk website apa pun.",
    "Mengetahui komponen visual yang paling sering ada di sebuah halaman.",
    "Memisahkan kebutuhan website pertama dari hal yang bisa menyusul.",
    "Tahu urutan materi 01–10 dan ke mana harus kembali saat bingung.",
  ],
  components: [
    { name: "Header & navigasi", note: "Identitas situs dan jalan menuju halaman lain." },
    { name: "Hero", note: "Blok pembuka: judul besar, kalimat penjelas, satu tombol utama." },
    { name: "Kartu", note: "Wadah kecil untuk satu produk, artikel, atau layanan." },
    { name: "Form", note: "Tempat pengguna mengirim data: kontak, pencarian, pendaftaran." },
    { name: "Footer", note: "Penutup halaman: hak cipta, kontak, tautan sekunder." },
  ],
  sections: [
    {
      heading: "Lima lapisan sebuah website",
      blocks: [
        {
          type: "p",
          text: "Website apa pun — dari portofolio satu halaman sampai aplikasi besar — berdiri di atas lapisan yang sama. Kalau kamu paham lima lapisan ini, kamu tahu **di mana** harus mencari ketika ada masalah.",
        },
        {
          type: "table",
          head: ["Lapisan", "Isi", "Pertanyaan yang dijawab"],
          rows: [
            ["1. Konten", "Teks, gambar, video, data", '"Apa yang ingin disampaikan?"'],
            ["2. Struktur", "HTML", '"Bagian mana judul, isi, navigasi?"'],
            ["3. Tampilan", "CSS", '"Bagaimana bentuk, warna, dan tata letaknya?"'],
            ["4. Perilaku", "JavaScript", '"Apa yang terjadi saat diklik, diketik, digulir?"'],
            ["5. Distribusi", "Domain, hosting, HTTPS", '"Bagaimana orang lain bisa membukanya?"'],
          ],
        },
        {
          type: "callout",
          tone: "info",
          title: "Masalah selalu bisa dilacak ke satu lapisan",
          text:
            "Teks salah tulis = konten. Halaman berantakan = struktur atau tampilan. Tombol tidak bereaksi = perilaku. Situs tidak bisa dibuka orang lain = distribusi.",
        },
      ],
    },
    {
      heading: "Apa itu komponen website?",
      blocks: [
        {
          type: "p",
          text: "Komponen adalah **potongan halaman yang punya satu tugas**. Navbar mengarahkan, kartu meringkas satu item, form mengumpulkan input. Hampir semua website besar tersusun dari komponen yang sama, hanya disusun berbeda.",
        },
        {
          type: "table",
          head: ["Komponen", "Isi umumnya", "Dibangun di materi"],
          rows: [
            ["Header & navbar", "Logo, menu, tombol masuk", "01, 03, 04"],
            ["Hero", "H1, paragraf pendek, tombol aksi", "01, 02, 04"],
            ["Section & artikel", "Judul bagian, paragraf, gambar", "01, 02"],
            ["Kartu & galeri", "Judul, ringkasan, tombol, gambar", "02, 03"],
            ["Form", "Label, input, pesan error, tombol kirim", "06, 07"],
            ["Tabel", "Baris data dengan header kolom", "01, 02"],
            ["Modal & menu", "Panel di atas halaman, fokus terkurung", "05, 07"],
            ["Footer", "Kontak, tautan sekunder, hak cipta", "01, 03"],
          ],
        },
        {
          type: "p",
          text: "Yang membuat sebuah komponen terasa benar bukan warna atau animasinya, melainkan **struktur yang tepat**: tombol yang memang `<button>`, judul yang berjenjang, gambar yang punya `alt`, dan form yang punya label.",
        },
      ],
    },
    {
      heading: "Yang wajib vs yang menyusul",
      blocks: [
        {
          type: "p",
          text: "Banyak pemula berhenti sebelum mulai karena mengira harus menguasai semuanya dulu. Kenyataannya, website pertama hanya butuh tiga hal: HTML, sedikit CSS, dan tempat menaruh filenya.",
        },
        {
          type: "table",
          head: ["Wajib untuk website pertama", "Menyusul, sesuai kebutuhan"],
          rows: [
            ["HTML dasar (struktur & teks)", "JavaScript untuk interaksi"],
            ["CSS dasar (warna, ukuran, jarak)", "Form & validasi"],
            ["Layout sederhana (Flexbox cukup)", "Aksesibilitas"],
            ["Satu folder proyek + `index.html`", "SEO & performa"],
            ["Browser untuk melihat hasil", "Git, hosting, domain"],
          ],
        },
        {
          type: "callout",
          tone: "warn",
          title: "Soal framework",
          text:
            "React, Vue, Next.js, dan Tailwind semuanya dibangun di atas HTML, CSS, dan JavaScript. Mempelajarinya lebih dulu seperti belajar menulis novel sebelum bisa menulis kalimat.",
        },
      ],
    },
    {
      heading: "Urutan materi 00–10",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "**Mulai** — peta belajar: lima lapisan, daftar komponen, urutan.",
            "**Fondasi** — 01 HTML (struktur), 02 CSS (tampilan), 03 Layout (Flexbox & Grid), 04 Responsive Design.",
            "**Interaksi** — 05 JavaScript (DOM & event), 06 Form & Validasi.",
            "**Kualitas** — 07 Aksesibilitas, 08 SEO & Performa.",
            "**Rilis** — 09 Hosting & Deploy, 10 Cheatsheet.",
          ],
        },
        {
          type: "p",
          text: "Urutannya sengaja: setiap materi memakai hasil materi sebelumnya. Layout butuh HTML dan CSS; responsive butuh layout; JavaScript butuh struktur yang bisa dipilih; form butuh keduanya.",
        },
      ],
    },
    {
      heading: "Cara memakai materi ini",
      blocks: [
        {
          type: "callout",
          tone: "tip",
          title: "Ketik ulang, jangan hanya membaca",
          text:
            "Setiap halaman punya penjelasan, contoh kode, dan latihan. Buka editor teks di sebelah halaman ini, ketik ulang contohnya, lalu ubah satu nilai dan lihat apa yang berubah. Mengetik ulang jauh lebih efektif daripada menyalin.",
        },
        {
          type: "p",
          text: "Checklist di bagian bawah tiap materi bisa dicentang dan tersimpan di browser. Pakai untuk memastikan kamu benar-benar sudah bisa, bukan sekadar sudah membaca.",
        },
      ],
    },
  ],
  exercise: [
    "Buka satu website yang sering kamu pakai, lalu daftar lima komponen pertamanya dari atas ke bawah.",
    "Untuk tiap komponen, tebak lapisan mana yang paling berperan: struktur, tampilan, atau perilaku.",
    "Tulis satu halaman rencana: website apa yang ingin kamu buat, siapa pembacanya, dan komponen apa saja yang dibutuhkan.",
  ],
  checklist: [
    "Saya bisa menyebut lima lapisan sebuah website.",
    "Saya bisa menyebut minimal lima komponen yang biasa ada di halaman.",
    "Saya tahu bedanya konten, struktur, tampilan, dan perilaku.",
    "Saya tahu materi mana yang harus saya buka ketika ada masalah tertentu.",
  ],
}

export default lesson
