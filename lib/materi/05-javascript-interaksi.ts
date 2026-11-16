import type { Lesson } from "./types"

const lesson: Lesson = {
  slug: "javascript-interaksi",
  num: "05",
  title: "JavaScript: Interaksi",
  short: "JavaScript: Interaksi",
  desc: "DOM, event, dan logika di sisi browser untuk komponen yang bereaksi.",
  group: "interaksi",
  lead:
    "HTML dan CSS sudah cukup untuk website statis. JavaScript dipakai ketika halaman perlu bereaksi: menghitung, menyimpan pilihan, menampilkan data, atau mengubah tampilan tanpa memuat ulang.",
  goals: [
    "Menulis dan menjalankan JavaScript di halaman.",
    "Memahami variabel, tipe data, fungsi, dan kondisi.",
    "Mengambil dan mengubah elemen lewat DOM.",
    "Menangani event klik, input, dan submit.",
  ],
  components: [
    { name: "Penghitung", note: "Tombol +, −, reset yang mengubah satu angka di DOM." },
    { name: "Daftar tugas", note: "Tambah, hapus, dan tandai selesai tanpa reload." },
    { name: "Menu dropdown", note: "Buka/tutup panel saat tombol diklik." },
    { name: "Tab", note: "Satu area konten berganti sesuai tab aktif." },
    { name: "Pencarian langsung", note: "Menyaring kartu saat pengguna mengetik." },
  ],
  sections: [
    {
      heading: "1. Cara memasang JavaScript",
      blocks: [
        {
          type: "code",
          label: "HTML",
          code: `<!-- Taruh di akhir <body> supaya HTML sudah siap -->
<script src="assets/app.js"></script>

<!-- Atau langsung di halaman -->
<script>
  console.log("Halo dari JavaScript");
</script>`,
        },
        {
          type: "p",
          text: "Buka Console di DevTools (F12 → tab Console) untuk melihat `console.log`, pesan error, dan mencoba kode secara langsung.",
        },
        {
          type: "callout",
          tone: "info",
          title: "Mulai dari sini, bukan dari framework",
          text:
            "Semua contoh di materi ini adalah JavaScript biasa (vanilla). Kalau kamu paham ini, React/Vue hanya soal cara menyusun ulang kode.",
        },
      ],
    },
    {
      heading: "2. Variabel dan tipe data",
      blocks: [
        {
          type: "code",
          label: "JavaScript",
          code: `const nama = "Sari";          // tidak bisa diganti isinya
let umur = 21;                // bisa diubah
const sudahLogin = false;     // boolean
const hobi = ["membaca", "lari"];
const pengguna = { nama: "Sari", umur: 21 };

umur = 22;                    // boleh
// nama = "Budi";             // error: const tidak bisa diubah

console.log(\`Halo, \${nama}. Umurmu \${umur} tahun.\`);`,
        },
        {
          type: "table",
          head: ["Tipe", "Contoh", "Dipakai untuk"],
          rows: [
            ["String", '"halo", `halo ${nama}`', "Teks"],
            ["Number", "`42`, `3.14`", "Angka & perhitungan"],
            ["Boolean", "`true`, `false`", "Kondisi"],
            ["Array", "`[1, 2, 3]`", "Daftar"],
            ["Object", '`{ nama: "Sari" }`', "Data berlabel"],
            ["null / undefined", "`null`, `undefined`", '"Kosong" dengan makna berbeda'],
          ],
        },
      ],
    },
    {
      heading: "3. Fungsi, kondisi, dan perulangan",
      blocks: [
        {
          type: "code",
          label: "JavaScript",
          code: `// Deklarasi
function sapa(nama) {
  return \`Halo, \${nama}!\`;
}

// Arrow function (bentuk ringkas)
const tambah = (a, b) => a + b;

// Nilai default
function harga(total, diskon = 0) {
  return total - total * diskon;
}

console.log(sapa("Sari"));        // Halo, Sari!
console.log(tambah(2, 3));        // 5
console.log(harga(100000, 0.1));  // 90000`,
        },
        {
          type: "code",
          label: "JavaScript",
          code: `const nilai = 78;

if (nilai >= 85) {
  console.log("A");
} else if (nilai >= 70) {
  console.log("B");
} else {
  console.log("C");
}

// Perulangan pada array
const buah = ["apel", "jeruk", "mangga"];
for (const b of buah) {
  console.log(b);
}

// Transformasi array
const angka = [1, 2, 3, 4];
const kuadrat = angka.map((n) => n * n);        // [1, 4, 9, 16]
const genap = angka.filter((n) => n % 2 === 0); // [2, 4]
const total = angka.reduce((a, n) => a + n, 0); // 10`,
        },
      ],
    },
    {
      heading: "4. DOM: menyentuh halaman",
      blocks: [
        {
          type: "p",
          text: "DOM adalah representasi halaman di memori browser. JavaScript mengubah DOM, dan browser langsung menggambar ulang.",
        },
        {
          type: "code",
          label: "HTML",
          code: `<p id="pesan">Teks awal</p>
<ul id="daftar"></ul>`,
        },
        {
          type: "code",
          label: "JavaScript",
          code: `// Ambil elemen
const pesan = document.querySelector("#pesan");
const daftar = document.querySelector("#daftar");

// Ubah isi dan gaya
pesan.textContent = "Teks baru dari JavaScript";
pesan.classList.add("sorot");

// Buat elemen baru
const item = document.createElement("li");
item.textContent = "Item baru";
daftar.append(item);`,
        },
        {
          type: "table",
          head: ["Kode", "Arti"],
          rows: [
            ['`document.querySelector(".kartu")`', "Elemen pertama yang cocok (CSS selector)"],
            ['`document.querySelectorAll(".kartu")`', "Semua yang cocok (NodeList)"],
            ["`el.textContent`", "Teks di dalam elemen (aman)"],
            ["`el.innerHTML`", "HTML di dalam elemen (hati-hati XSS)"],
            ["`el.classList.add/remove/toggle`", "Menambah/menghapus class"],
            ["`el.setAttribute()`", "Mengubah atribut"],
          ],
        },
        {
          type: "callout",
          tone: "danger",
          title: "Jangan masukkan input pengguna ke `innerHTML`",
          text:
            "Kalau teks berasal dari pengguna atau URL, gunakan `textContent`. `innerHTML` akan menjalankan HTML/script di dalamnya — celah XSS yang klasik.",
        },
      ],
    },
    {
      heading: "5. Event: bereaksi terhadap pengguna",
      blocks: [
        {
          type: "code",
          label: "JavaScript",
          code: `const tombol = document.querySelector("#tombolHitung");
let jumlah = 0;

tombol.addEventListener("click", () => {
  jumlah++;
  document.querySelector("#hasil").textContent = jumlah;
});

// Event form
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();          // cegah halaman reload
  // proses data di sini
});`,
        },
        {
          type: "p",
          text: "Contoh utuh — daftar tugas yang bisa ditambah dan dihapus:",
        },
        {
          type: "code",
          label: "HTML + JavaScript",
          code: `<form id="formTugas">
  <label for="inputTugas">Tugas baru</label>
  <input id="inputTugas" type="text" required>
  <button type="submit">Tambah</button>
</form>
<ul id="daftarTugas"></ul>

<script>
  const form = document.querySelector("#formTugas");
  const input = document.querySelector("#inputTugas");
  const daftar = document.querySelector("#daftarTugas");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const teks = input.value.trim();
    if (!teks) return;

    const li = document.createElement("li");
    li.textContent = teks;

    const hapus = document.createElement("button");
    hapus.type = "button";
    hapus.textContent = "Hapus";
    hapus.addEventListener("click", () => li.remove());

    li.append(" ", hapus);
    daftar.append(li);
    input.value = "";
    input.focus();
  });
</script>`,
        },
      ],
    },
    {
      heading: "6. Sedikit soal asinkron dan debugging",
      blocks: [
        {
          type: "p",
          text: "Mengambil data dari server butuh waktu. `fetch` mengembalikan Promise, jadi kita pakai `await` di dalam fungsi `async`.",
        },
        {
          type: "code",
          label: "JavaScript",
          code: `async function ambilData() {
  try {
    const res = await fetch("/api/produk");
    if (!res.ok) throw new Error("Gagal memuat");
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err.message);
  }
}`,
        },
        {
          type: "table",
          head: ["Gejala", "Penyebab"],
          rows: [
            ["`Cannot read properties of null`", "Elemen tidak ditemukan — cek selektor dan urutan script"],
            ["`is not a function`", "Salah nama method atau tipenya bukan yang dikira"],
            ["Tidak terjadi apa-apa", "Cek Console; biasanya script berhenti karena error sebelumnya"],
          ],
        },
        {
          type: "p",
          text: "Gunakan `console.log` untuk mencetak nilai, `console.table` untuk data berbentuk daftar, dan `debugger;` untuk menghentikan eksekusi di baris tertentu (tab Sources).",
        },
      ],
    },
  ],
  exercise: [
    "Buat tombol yang mengganti teks judul saat diklik.",
    "Buat penghitung dengan tombol +, −, dan reset.",
    "Buat daftar tugas yang bisa ditambah dan dihapus.",
    'Tambahkan tombol "tandai selesai" yang memberi class `selesai` pada item (coret teksnya lewat CSS).',
  ],
  checklist: [
    "Saya bisa mengambil elemen dengan `querySelector`.",
    "Saya bisa menambah dan menghapus class lewat `classList`.",
    "Saya paham kenapa `e.preventDefault()` dipakai di submit.",
    "Saya terbiasa memeriksa Console saat ada masalah.",
  ],
}

export default lesson
