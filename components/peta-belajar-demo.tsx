"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

import GlassFolder from "@/components/ui/glass-folder-cards"

/**
 * Peta Belajar — seluruh materi dari Belajar-Website (00–10).
 * Satu folder per kelompok materi, satu file per materi. Urutan dan judul
 * mengikuti LESSONS / LESSON_GROUPS di assets/script.js.
 */
export default function PetaBelajarDemo() {
  const router = useRouter()

  return (
    <main
      className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-background px-6 py-16"
      style={{ minHeight: "100svh" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 text-foreground opacity-[0.13]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1.1px, transparent 1.4px)",
          backgroundSize: "22px 22px",
        }}
      />

      <header className="relative mb-14 max-w-[720px] text-center">
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">Mulai di sini</p>
        <h1 className="mt-3 text-3xl font-medium tracking-tight text-balance sm:text-4xl">
          Apa saja yang dibutuhkan untuk membuat website?
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          Materi bertahap yang bisa dibuka langsung di browser. Tanpa instalasi, tanpa internet. Tiap halaman punya
          penjelasan, contoh kode, demo yang benar-benar berjalan, dan latihan.
        </p>
      </header>

      <div className="relative grid max-w-[1180px] grid-cols-1 items-end justify-items-center gap-x-14 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
        <GlassFolder
          label="Mulai"
          art="aurora"
          seed={3}
          action="none"
          appearDelay={0}
          files={[{ name: "Peta Belajar", meta: "00", href: "/materi/peta-belajar" }]}
        />
        <GlassFolder
          label="Fondasi"
          art="dusk"
          seed={7}
          appearDelay={140}
          files={[
            { name: "HTML: Struktur", meta: "01", art: "ember", href: "/materi/html-struktur" },
            { name: "CSS: Tampilan", meta: "02", href: "/materi/css-tampilan" },
            { name: "Layout: Flexbox & Grid", meta: "03", art: "dusk", href: "/materi/layout-flexbox-grid" },
            { name: "Responsive Design", meta: "04", href: "/materi/responsive-design" },
          ]}
        />
        <GlassFolder
          label="Interaksi"
          art="verdant"
          seed={11}
          action="more"
          labelPlacement="top-left"
          appearDelay={280}
          files={[
            { name: "JavaScript: Interaksi", meta: "05", art: "verdant", href: "/materi/javascript-interaksi" },
            { name: "Form & Validasi", meta: "06", href: "/materi/form-validasi" },
          ]}
          menu={[
            { label: "Buka materi 05", onSelect: () => router.push("/materi/javascript-interaksi") },
            { label: "Buka materi 06", onSelect: () => router.push("/materi/form-validasi") },
            {
              label: "Reset progres",
              danger: true,
              onSelect: () => {
                for (const key of Object.keys(window.localStorage)) {
                  if (key.startsWith("bw-progress:")) window.localStorage.removeItem(key)
                }
              },
            },
          ]}
        />
        <GlassFolder
          label="Kualitas"
          art="glacier"
          seed={5}
          action="none"
          appearDelay={420}
          files={[
            { name: "Aksesibilitas", meta: "07", art: "glacier", href: "/materi/aksesibilitas" },
            { name: "SEO & Performa", meta: "08", href: "/materi/seo-performa" },
          ]}
        />
        <GlassFolder
          label="Rilis"
          meta="2 materi terakhir"
          tone="dark"
          art="ember"
          seed={17}
          action="none"
          labelPlacement="top-right"
          appearDelay={560}
          files={[
            { name: "Hosting & Deploy", meta: "09", href: "/materi/hosting-deploy" },
            { name: "Cheatsheet", meta: "10", art: "aurora", href: "/materi/cheatsheet" },
          ]}
        />
      </div>

      <div className="relative mt-14 flex flex-col items-center gap-4">
        <p className="text-center font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
          Hover untuk miring · Klik folder untuk buka · Klik berkas untuk membaca
        </p>
        <Link
          href="/materi"
          className="group inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/60 px-4 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted/60"
        >
          Lihat semua materi sebagai daftar
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </main>
  )
}
