# WebsiteLearn — Peta Belajar Website

Situs belajar interaktif tentang **komponen apa saja yang membentuk sebuah website**. Materi disusun bertahap dari HTML sampai deploy, dengan halaman terpisah untuk setiap sub-materi.

**Situs live:** <https://website-learn-omega.vercel.app>

Dibuat dengan Next.js 16 (App Router), React 19, TypeScript, dan Tailwind CSS v4.

Mau ikut mengedit? Baca [CONTRIBUTING.md](./CONTRIBUTING.md) untuk alur clone, edit materi, dan Pull Request.

## Menjalankan proyek

Prasyarat: **Node.js 20.9+** dan npm.

```bash
npm install
npm run dev
```

Buka <http://localhost:3000>.

Perintah lain:

```bash
npm run build      # build produksi
npm start          # jalankan hasil build
npm run typecheck  # cek TypeScript
```

## Halaman

| Rute | Isi |
| --- | --- |
| `/` | Peta belajar berbentuk folder kaca. Klik folder untuk membuka, klik berkas untuk membaca materi. |
| `/materi` | Daftar lengkap 11 materi, dikelompokkan per tahap. |
| `/materi/[slug]` | Halaman satu materi: tujuan, isi, komponen website terkait, latihan, checklist, dan navigasi prev/next. |

Kelompok materi:

- **Mulai** — 00 Peta Belajar
- **Fondasi** — 01 HTML, 02 CSS, 03 Layout (Flexbox & Grid), 04 Responsive Design
- **Interaksi** — 05 JavaScript, 06 Form & Validasi
- **Kualitas** — 07 Aksesibilitas, 08 SEO & Performa
- **Rilis** — 09 Hosting & Deploy, 10 Cheatsheet

## Struktur penting

```text
app/
  page.tsx                     # beranda (render PetaBelajarDemo)
  materi/page.tsx              # daftar semua materi
  materi/[slug]/page.tsx       # halaman materi (static generation)
  layout.tsx                   # metadata & font
  globals.css                  # token warna & tema

components/
  peta-belajar-demo.tsx        # isi beranda: folder + berkas materi
  materi/                      # tampilan halaman materi
    lesson-view.tsx            # layout halaman, TOC, pager
    code-block.tsx             # blok kode + tombol salin
    lesson-checklist.tsx       # checklist progres (localStorage)
    rich-text.tsx              # render `code`, **tebal**, *miring*
  ui/glass-folder-cards.tsx    # komponen folder kaca

lib/materi/
  index.ts                     # daftar LESSONS, LESSON_GROUPS, helper
  types.ts                     # tipe Lesson, Section, Block
  00-peta-belajar.ts … 10-cheatsheet.ts   # isi tiap materi
```

## Mengedit atau menambah materi

Semua teks materi adalah data TypeScript, bukan HTML terpisah. Satu materi = satu file.

1. **Ubah isi materi** — edit file yang sesuai di `lib/materi/`, misalnya `lib/materi/01-html-struktur.ts`.
   Bagian yang bisa diubah: `title`, `lead`, `goals`, `components`, `sections`, `exercise`, `checklist`.
2. **Tambah materi baru** — buat file baru di `lib/materi/`, lalu impor dan masukkan ke array `LESSONS` di `lib/materi/index.ts`, dan tentukan `group`-nya.
3. **Ubah nama/urutan di beranda** — sesuaikan `files` pada `components/peta-belajar-demo.tsx`. Nilai `href` harus sama dengan `slug` materi.
4. **Tambah kelompok** — tambahkan entri di `LESSON_GROUPS` (`lib/materi/index.ts`). Daftar di `/materi` dan navigasi kelompok mengikuti data ini.

Materi baru otomatis mendapat halaman di `/materi/<slug>` karena rute memakai `generateStaticParams`.

### Format teks di dalam data

- `` `kode` `` → ditampilkan sebagai kode inline
- `**tebal**` → teks tebal
- `*miring*` → teks miring

Blok yang tersedia di `sections[].blocks`: `p` (paragraf), `code` (blok kode), `callout` (tip/warn/info/danger), `table`, dan `list`.

## Progres belajar

Checklist di bagian bawah setiap materi disimpan di `localStorage` browser dengan kunci `bw-progress:<slug>`. Tidak ada server atau database — progres hanya tersimpan di perangkat pengunjung.

## Deploy

Repo ini siap di-deploy ke Vercel tanpa konfigurasi tambahan:

1. Buka [vercel.com/new](https://vercel.com/new), masuk dengan akun GitHub.
2. Pilih repo `bilhaqschrodinger/WebsiteLearn`.
3. Framework terdeteksi otomatis sebagai **Next.js**. Biarkan Build Command dan Output default.
4. Klik **Deploy**.

Setelah terhubung, setiap `git push` ke `main` otomatis menjadi deploy produksi, dan setiap Pull Request mendapat URL preview sendiri. Jadi situs **tetap bisa diedit setelah deploy** — cukup commit dan push lagi.

## Dokumentasi

- [Panduan kontribusi](./CONTRIBUTING.md)

## Tech stack

- Next.js 16 (App Router, static generation)
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui (base-nova)
