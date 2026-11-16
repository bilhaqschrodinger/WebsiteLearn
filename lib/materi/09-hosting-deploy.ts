import type { Lesson } from "./types"

const lesson: Lesson = {
  slug: "hosting-deploy",
  num: "09",
  title: "Hosting & Deploy",
  short: "Hosting & Deploy",
  desc: "Hosting, domain, DNS, Git, dan memeriksa situs sebelum dirilis.",
  group: "rilis",
  lead:
    "Sampai di sini website-mu hanya ada di komputermu. Materi ini mengubahnya menjadi alamat yang bisa dibuka siapa saja — biasanya gratis, dan selesai dalam hitungan menit.",
  goals: [
    "Menata folder proyek yang siap diunggah.",
    "Memahami perbedaan hosting, domain, dan DNS.",
    "Mempublikasikan situs statis secara gratis.",
    "Memeriksa situs sebelum dan sesudah rilis.",
  ],
  components: [
    { name: "Halaman 404", note: "Jalan kembali saat alamat tidak ditemukan." },
    { name: "Favicon", note: "Ikon situs di tab browser dan bookmark." },
    { name: "robots.txt & sitemap.xml", note: "Petunjuk untuk mesin pencari." },
    { name: "Halaman kustom domain", note: "Alamat sendiri dengan HTTPS otomatis." },
  ],
  sections: [
    {
      heading: "1. Tiga istilah yang sering tertukar",
      blocks: [
        {
          type: "table",
          head: ["Istilah", "Analogi", "Contoh"],
          rows: [
            ["**Hosting**", "Rumah tempat barang disimpan", "Netlify, Vercel, Cloudflare Pages, Niagahoster"],
            ["**Domain**", "Alamat rumah", "`tokokopi.id`"],
            ["**DNS**", "Buku petunjuk arah dari alamat ke rumah", "Catatan A / CNAME di registrar"],
            ["**HTTPS**", "Gembok di pintu", "Sertifikat SSL, biasanya otomatis"],
          ],
        },
      ],
    },
    {
      heading: "2. Struktur folder yang siap deploy",
      blocks: [
        {
          type: "code",
          label: "Struktur proyek",
          code: `website-saya/
├── index.html            ← wajib, halaman utama
├── tentang.html
├── kontak.html
├── 404.html              ← halaman "tidak ditemukan" (opsional)
├── assets/
│   ├── css/style.css
│   ├── js/app.js
│   ├── img/hero.webp
│   └── fonts/inter.woff2
├── favicon.ico
├── robots.txt
└── sitemap.xml`,
        },
        {
          type: "callout",
          tone: "info",
          title: "Kenapa `index.html`?",
          text:
            "Server web otomatis menampilkan `index.html` ketika seseorang membuka sebuah folder atau alamat domain. Tanpa file ini, pengunjung melihat daftar file atau halaman error.",
        },
        {
          type: "code",
          label: "HTML",
          code: `<!-- dari index.html ke file di assets -->
<link rel="stylesheet" href="assets/css/style.css">
<img src="assets/img/hero.webp" alt="...">

<!-- dari halaman di subfolder -->
<link rel="stylesheet" href="../assets/css/style.css">

<!-- absolut dari root domain (aman untuk situs multi-halaman) -->
<link rel="stylesheet" href="/assets/css/style.css">`,
        },
        {
          type: "callout",
          tone: "danger",
          title: "Jangan pakai path lokal",
          text:
            '`src="C:\\Users\\Sari\\gambar.jpg"` hanya bekerja di komputermu. Di server, file itu tidak ada. Selalu gunakan path relatif.',
        },
      ],
    },
    {
      heading: "3. Pilih jenis hosting",
      blocks: [
        {
          type: "table",
          head: ["Jenis", "Cocok untuk", "Contoh"],
          rows: [
            ["Statis gratis", "HTML/CSS/JS, portofolio, landing page", "Netlify, Vercel, Cloudflare Pages, GitHub Pages"],
            ["Shared hosting", "PHP, WordPress, email domain", "Niagahoster, Hostinger, Rumahweb"],
            ["VPS", "Butuh kendali penuh, backend sendiri", "DigitalOcean, Vultr, Linode"],
            ["Platform", "Butuh database & auth siap pakai", "Supabase, Firebase, Railway"],
          ],
        },
      ],
    },
    {
      heading: "4. Deploy tanpa Git (paling cepat)",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Buka `app.netlify.com/drop` (atau layanan serupa).",
            "Seret folder proyekmu ke halaman itu.",
            "Tunggu beberapa detik — kamu mendapat URL seperti `nama-acak.netlify.app`.",
            "Selesai. Setiap perubahan: seret ulang foldernya.",
          ],
        },
      ],
    },
    {
      heading: "5. Deploy dengan Git (dianjurkan)",
      blocks: [
        {
          type: "p",
          text: "Dengan Git, setiap perubahan tercatat dan deploy bisa otomatis setiap kali kamu push.",
        },
        {
          type: "code",
          label: "Terminal",
          code: `# di folder proyek
git init
git add .
git commit -m "Website pertama"

# buat repo kosong di GitHub, lalu:
git remote add origin https://github.com/username/website-saya.git
git branch -M main
git push -u origin main`,
        },
        {
          type: "list",
          ordered: true,
          items: [
            'Di Netlify/Vercel: pilih "Import from Git" lalu hubungkan akun GitHub.',
            "Pilih repo.",
            "Build command: **kosongkan** (situs statis). Publish directory: `/` atau `.`.",
            "Deploy.",
          ],
        },
        {
          type: "code",
          label: "Alur kerja berikutnya",
          code: `git add .
git commit -m "Perbaiki navbar di HP"
git push`,
        },
        {
          type: "callout",
          tone: "tip",
          title: "`.gitignore` dasar",
          code: `.DS_Store
Thumbs.db
node_modules/
.env
*.log`,
          text: "Jangan pernah menaruh kunci API atau password di file yang masuk repo publik.",
        },
      ],
    },
    {
      heading: "6. Memasang domain sendiri",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Beli domain di registrar (Namecheap, Cloudflare, Niagahoster).",
            "Di panel hosting, tambahkan domain kustom.",
            "Di registrar, atur DNS sesuai instruksi hosting: **A record** ke IP hosting, atau **CNAME** untuk `www` ke alamat hosting.",
            "Tunggu propagasi DNS (5 menit–24 jam).",
            "Pastikan HTTPS aktif — hampir semua host modern menyediakannya otomatis.",
          ],
        },
        {
          type: "callout",
          tone: "warn",
          title: "Domain itu sewa, bukan beli permanen",
          text:
            "Perpanjang setiap tahun. Kalau lupa, domain bisa diambil orang lain dan semua tautan ke situsmu mati.",
        },
      ],
    },
    {
      heading: "7. Sebelum rilis: periksa ini",
      blocks: [
        {
          type: "list",
          items: [
            "Semua tautan internal berfungsi (tidak ada 404).",
            "Tidak ada teks Lorem ipsum atau placeholder tersisa.",
            "Tampil baik di lebar 360px dan 1440px.",
            "Semua gambar punya `alt` dan sudah dikompres.",
            "Judul tab dan deskripsi sudah diisi.",
            "Form mengirim ke tujuan yang benar.",
            "HTTPS aktif (ikon gembok).",
            "Sudah diuji di browser lain, bukan hanya satu.",
            "Ada cara menghubungi pemilik situs.",
          ],
        },
        {
          type: "table",
          head: ["Gejala", "Penyebab umum"],
          rows: [
            ["Halaman 404 padahal file ada", "Nama file beda huruf besar/kecil. Server Linux membedakan `Foto.jpg` dan `foto.jpg`."],
            ["CSS tidak ter-load", "Path absolut ke folder lokal, atau folder `assets` tidak ikut terunggah."],
            ["Gambar hilang", "Nama file mengandung spasi atau karakter khusus — ganti dengan tanda hubung."],
            ["Perubahan tidak muncul", "Cache browser atau CDN. Coba mode incognito, lalu hard refresh."],
            ["Situs lambat", "Gambar terlalu besar; lihat materi 08."],
          ],
        },
      ],
    },
    {
      heading: "8. Kebiasaan baik",
      blocks: [
        {
          type: "list",
          items: [
            "**Backup** — Git adalah backup. Simpan juga salinan di cloud.",
            "**Commit kecil dan sering**, dengan pesan yang jelas.",
            "**Jangan pernah** menaruh kunci API atau password di file yang di-push ke repo publik.",
            "**Punya halaman 404** yang ramah dan memberi jalan kembali.",
            "**Pantau** dengan analytics ringan (Plausible, Umami, atau statistik hosting).",
          ],
        },
      ],
    },
  ],
  exercise: [
    "Susun folder proyekmu mengikuti struktur di atas.",
    "Deploy lewat Netlify Drop. Buka URL-nya di HP.",
    "Perbaiki semua tautan dan gambar yang rusak.",
    "Kalau sudah nyaman, ulangi dengan Git + GitHub agar deploy otomatis.",
    "Tambahkan halaman `404.html` sederhana.",
  ],
  checklist: [
    "Website saya bisa dibuka lewat URL publik.",
    "Saya tahu bedanya hosting, domain, dan DNS.",
    "Tidak ada path lokal di dalam kode.",
    "Saya punya salinan proyek di Git.",
  ],
}

export default lesson
