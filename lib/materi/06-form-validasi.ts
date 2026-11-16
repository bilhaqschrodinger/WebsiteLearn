import type { Lesson } from "./types"

const lesson: Lesson = {
  slug: "form-validasi",
  num: "06",
  title: "Form & Validasi",
  short: "Form & Validasi",
  desc: "Menerima input pengguna dengan label, tipe field, dan pesan error yang jelas.",
  group: "interaksi",
  lead:
    "Form adalah satu-satunya cara pengguna berbicara balik kepada website: mendaftar, memesan, menghubungi, mencari. Form yang buruk membuat orang pergi; form yang baik terasa tidak ada.",
  goals: [
    "Menulis form dengan label dan tipe input yang tepat.",
    "Memanfaatkan validasi bawaan browser sebelum menulis JavaScript.",
    "Menampilkan pesan error yang jelas.",
    "Tahu ke mana data dikirim.",
  ],
  components: [
    { name: "Form kontak", note: "Nama, email, subjek, pesan, dan persetujuan." },
    { name: "Pencarian", note: "`role=\"search\"` + input `type=\"search\"`." },
    { name: "Login", note: "Email + kata sandi dengan `autocomplete` yang benar." },
    { name: "Newsletter", note: "Satu field email, satu tombol, pesan sukses." },
  ],
  sections: [
    {
      heading: "1. Struktur dasar",
      blocks: [
        {
          type: "code",
          label: "HTML",
          code: `<form action="/kirim" method="post">
  <label for="nama">Nama lengkap</label>
  <input id="nama" name="nama" type="text" required>

  <label for="email">Email</label>
  <input id="email" name="email" type="email" required>

  <button type="submit">Kirim</button>
</form>`,
        },
        {
          type: "table",
          head: ["Atribut", "Fungsi"],
          rows: [
            ["`action`", "Alamat tujuan pengiriman"],
            ["`method`", "`get` (data di URL) atau `post` (data di body)"],
            ["`name`", "Nama field saat data dikirim — tanpa ini, data tidak terkirim"],
            ["`id` + `for`", "Menghubungkan label dengan input; klik label akan memfokuskan input"],
            ["`required`", "Wajib diisi"],
            ["`autocomplete`", "Membantu pengisian otomatis (`email`, `name`, `tel`, `new-password`)"],
          ],
        },
        {
          type: "callout",
          tone: "warn",
          title: "Label bukan hiasan",
          text:
            'Tanpa `<label for="...">`, pengguna screen reader tidak tahu field itu untuk apa, dan area klik jadi kecil. Ini kesalahan form nomor satu.',
        },
      ],
    },
    {
      heading: "2. Tipe input yang tepat",
      blocks: [
        {
          type: "p",
          text: "Memilih tipe yang benar memberi keyboard yang sesuai di HP dan validasi gratis:",
        },
        {
          type: "table",
          head: ["Tipe", "Untuk", "Bonus"],
          rows: [
            ["`text`", "Teks satu baris", "—"],
            ["`email`", "Alamat email", "Keyboard @ di HP, validasi format"],
            ["`tel`", "Nomor telepon", "Keyboard angka"],
            ["`number`", "Angka", "Panah naik/turun, `min`/`max`"],
            ["`password`", "Kata sandi", "Tersembunyi"],
            ["`date`", "Tanggal", "Pemilih tanggal bawaan"],
            ["`search`", "Pencarian", "Tombol hapus di beberapa browser"],
            ["`url`", "Alamat web", "Validasi format"],
            ["`file`", "Unggah berkas", "`accept` membatasi jenis"],
            ["`checkbox` / `radio`", "Pilih banyak / satu", "—"],
            ["`textarea`", "Teks panjang", "Bisa diubah ukurannya"],
            ["`select`", "Pilihan dari daftar", "Hemat ruang"],
          ],
        },
      ],
    },
    {
      heading: "3. Validasi bawaan browser",
      blocks: [
        {
          type: "p",
          text: "Sebelum menulis JavaScript, manfaatkan atribut ini:",
        },
        {
          type: "code",
          label: "HTML",
          code: `<input type="email" required>
<input type="text" minlength="3" maxlength="40">
<input type="number" min="1" max="10" step="1">
<input type="text" pattern="[0-9]{5}" title="5 angka">
<input type="password" required minlength="8">
<input type="file" accept="image/png, image/jpeg">`,
        },
        {
          type: "p",
          text: "Kalau ada yang salah, browser menampilkan pesan dan memfokuskan field bermasalah — tanpa satu baris JavaScript.",
        },
        {
          type: "code",
          label: "CSS",
          code: `input:focus-visible {
  outline: 2px solid #2b5cf6;
  outline-offset: 2px;
}

/* :user-invalid hanya aktif setelah pengguna mengisi */
input:user-invalid {
  border-color: #b0202a;
  background: #fff5f5;
}

input:user-valid {
  border-color: #0f7a4f;
}`,
        },
        {
          type: "callout",
          tone: "tip",
          title: "Jangan hilangkan outline fokus",
          text:
            "`outline: none` tanpa pengganti membuat pengguna keyboard tersesat. Kalau tidak suka tampilan bawaan, ganti dengan gaya sendiri — jangan dihapus.",
        },
      ],
    },
    {
      heading: "4. Validasi dengan JavaScript",
      blocks: [
        {
          type: "p",
          text: "Gunakan saat aturanmu lebih rumit dari yang bisa diungkapkan atribut HTML:",
        },
        {
          type: "code",
          label: "JavaScript",
          code: `const form = document.querySelector("#daftar");

form.addEventListener("submit", (e) => {
  const sandi = form.elements.sandi.value;
  const ulangi = form.elements.ulangi.value;

  if (sandi !== ulangi) {
    e.preventDefault();                    // hentikan pengiriman
    form.elements.ulangi.setCustomValidity("Kata sandi tidak sama");
    form.elements.ulangi.reportValidity();
    return;
  }

  form.elements.ulangi.setCustomValidity(""); // bersihkan
});`,
        },
      ],
    },
    {
      heading: "5. Pola form yang baik",
      blocks: [
        {
          type: "table",
          head: ["Lakukan", "Hindari"],
          rows: [
            ["Satu kolom, urutan logis", "Field tanpa label"],
            ["Label di atas field", 'Menandai semua field wajib dengan tanda bintang saja'],
            ["Placeholder sebagai contoh, bukan pengganti label", "Error hanya berwarna merah tanpa teks"],
            ["Pesan error menjelaskan cara memperbaiki", "Reset otomatis seluruh form setelah gagal"],
            ["Pertahankan isian saat ada error", "Meminta data yang tidak dipakai"],
            ["Tombol jelas: \"Kirim pesan\", bukan \"OK\"", 'Mengirim password lewat `method="get"`'],
          ],
        },
        {
          type: "code",
          label: "HTML",
          code: `<form role="search" action="/cari" method="get">
  <label for="q">Cari artikel</label>
  <input id="q" name="q" type="search">
  <button type="submit">Cari</button>
</form>`,
        },
      ],
    },
    {
      heading: "6. Ke mana data pergi?",
      blocks: [
        {
          type: "p",
          text: "Website statis (HTML/CSS/JS saja) **tidak bisa** memproses form sendiri. Kamu butuh salah satu dari ini:",
        },
        {
          type: "list",
          items: [
            "**Layanan form** — Formspree, Netlify Forms, Getform. Paling cepat untuk pemula.",
            "**Backend sendiri** — Node.js, PHP, Python, Go. Kontrol penuh.",
            "**Serverless function** — Vercel/Netlify Functions, Cloudflare Workers.",
          ],
        },
        {
          type: "code",
          label: "HTML",
          code: `<!-- Contoh memakai layanan form -->
<form action="https://formspree.io/f/xxxxxxx" method="post">
  <label for="pesan">Pesan</label>
  <textarea id="pesan" name="pesan" rows="5" required></textarea>
  <button type="submit">Kirim pesan</button>
</form>`,
        },
        {
          type: "callout",
          tone: "danger",
          title: "Validasi di browser bukan keamanan",
          text:
            "Siapa pun bisa mengirim data langsung ke server, melewati form. Server wajib memvalidasi ulang semua input: panjang, format, izin, dan isi berbahaya.",
        },
      ],
    },
  ],
  exercise: [
    "Buat form kontak: nama, email, subjek (select), pesan (textarea), checkbox persetujuan.",
    "Semua field punya label yang terhubung dengan benar.",
    "Tambahkan validasi HTML: wajib isi, email valid, pesan minimal 20 karakter.",
    "Tambahkan CSS untuk `:focus-visible` dan `:user-invalid`.",
    "Uji dengan Tab saja: apakah semua field bisa diisi tanpa mouse?",
  ],
  checklist: [
    "Setiap input punya label yang terhubung.",
    "Saya memakai tipe input sesuai jenis data.",
    "Form bisa diselesaikan hanya dengan keyboard.",
    "Saya tahu ke mana data form akan dikirim.",
  ],
}

export default lesson
