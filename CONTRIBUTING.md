# Panduan Kontribusi

Terima kasih sudah ikut mengerjakan **WebsiteLearn — Peta Belajar Website**. Panduan ini untuk teman-teman yang mau memperbaiki materi, menambah contoh, atau mengubah tampilan.

## Prasyarat

- [Git](https://git-scm.com/downloads)
- [Node.js 20.9+](https://nodejs.org) (sudah termasuk npm)
- Editor, misalnya [VS Code](https://code.visualstudio.com)

## 1. Clone repo

```bash
git clone https://github.com/bilhaqschrodinger/WebsiteLearn.git
cd WebsiteLearn
npm install
npm run dev
```

Buka <http://localhost:3000>. Halaman akan otomatis refresh setiap file disimpan.

Perintah lain:

```bash
npm run build      # build produksi
npm start          # jalankan hasil build
npm run typecheck  # cek error TypeScript
```

## 2. Di mana mengedit

| Mau ubah apa | File |
| --- | --- |
| Isi materi (teks, tujuan, latihan, checklist) | `lib/materi/NN-nama-materi.ts` |
| Urutan / kelompok materi | `lib/materi/index.ts` (`LESSONS`, `LESSON_GROUPS`) |
| Bentuk blok konten | `lib/materi/types.ts` |
| Nama berkas & tautan di beranda | `components/peta-belajar-demo.tsx` |
| Tampilan halaman materi | `components/materi/lesson-view.tsx` |
| Blok kode & tombol salin | `components/materi/code-block.tsx` |
| Checklist progres | `components/materi/lesson-checklist.tsx` |
| Warna, font, tema | `app/globals.css` |
| Komponen folder kaca | `components/ui/glass-folder-cards.tsx` |

### Menambah materi baru

1. Buat file baru di `lib/materi/`, misalnya `lib/materi/11-proyek-akhir.ts`.
2. Ikuti bentuk `Lesson` dari `lib/materi/types.ts`. Paling mudah: salin file materi yang sudah ada, lalu ubah isinya.
3. Impor file itu di `lib/materi/index.ts` dan tambahkan ke array `LESSONS` pada urutan yang benar.
4. Halaman `/materi/<slug>` otomatis dibuat saat build.
5. Tambahkan juga berkasnya di `components/peta-belajar-demo.tsx` agar muncul di folder beranda.

### Format teks

- `` `kode` `` → kode inline
- `**tebal**` → teks tebal
- `*miring*` → teks miring

Blok yang didukung di `sections[].blocks`:

- `{ type: "p", text }` — paragraf
- `{ type: "code", code, label }` — blok kode
- `{ type: "callout", tone, title, text, code }` — tone: `tip`, `warn`, `info`, `danger`
- `{ type: "table", head, rows }` — tabel
- `{ type: "list", ordered, items }` — daftar

## 3. Alur Git

Selalu tarik perubahan terbaru sebelum mulai:

```bash
git pull
```

Setelah selesai mengedit:

```bash
git add .
git commit -m "perbaiki contoh materi 03"
git push
```

### Perubahan besar: pakai branch + Pull Request

```bash
git checkout -b materi-11
# ...edit...
git add .
git commit -m "tambah materi proyek akhir"
git push -u origin materi-11
```

Lalu buka Pull Request di GitHub. Setiap PR otomatis mendapat URL preview di Vercel, jadi perubahan bisa dicek dulu sebelum masuk ke situs utama.

## 4. Alternatif tanpa terminal

Bisa juga lewat browser:

1. Buka repo di GitHub → masuk ke file → klik ikon **pensil**.
2. Edit → **Commit changes**.
3. Untuk file baru, pakai **Add file → Create new file**.

Cara ini cocok untuk perbaikan kecil seperti salah ketik. Untuk mengedit banyak materi sekaligus, clone lokal lebih nyaman.

## 5. Deploy otomatis

Situs terhubung ke Vercel melalui repo GitHub:

- Push ke `main` → deploy produksi baru.
- Pull Request → URL preview khusus untuk PR itu.

Tidak ada langkah deploy manual. Setelah perubahan di-merge, tunggu beberapa detik sampai build selesai.

## Supaya tidak bentrok

- `git pull` sebelum mulai dan sebelum push.
- Satu orang satu file materi; kalau harus mengedit file yang sama, koordinasikan dulu.
- Jangan commit `node_modules/`, `.next/`, `AGENTS.md`, atau file `.env` (sudah di-`.gitignore`).
- Kalau `package.json` berubah, jalankan `npm install` lagi.
- Kompres gambar besar (disarankan < 5 MB per file).

## Sebelum push

Pastikan build dan TypeScript lolos:

```bash
npm run typecheck
npm run build
```

## Catatan

- Progres checklist pengunjung disimpan di `localStorage` (`bw-progress:<slug>`), bukan di server.
