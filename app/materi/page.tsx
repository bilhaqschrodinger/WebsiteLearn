import type { Metadata } from "next"
import Link from "next/link"

import { getGroupLessons, LESSON_COUNT, LESSON_GROUPS } from "@/lib/materi"

export const metadata: Metadata = {
  title: "Semua Materi — Belajar Website",
  description:
    "Sebelas halaman materi tentang komponen website: struktur, tampilan, layout, responsive, interaksi, form, aksesibilitas, SEO, dan rilis.",
}

export default function MateriIndexPage() {
  return (
    <div className="min-h-svh bg-background">
      <header className="border-b border-border/60">
        <div className="mx-auto flex h-14 max-w-5xl items-center gap-3 px-5">
          <Link
            href="/"
            className="group flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <span aria-hidden className="transition-transform group-hover:-translate-x-0.5">
              ←
            </span>
            Peta Belajar
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 pt-12 pb-24">
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">Daftar lengkap</p>
        <h1 className="mt-4 text-3xl font-medium tracking-tight text-balance sm:text-[2.6rem] sm:leading-[1.1]">
          Semua materi, dari nol sampai rilis
        </h1>
        <p className="mt-4 max-w-[62ch] text-[15px] leading-7 text-muted-foreground">
          {LESSON_COUNT} halaman yang menjelaskan komponen apa saja yang membentuk sebuah website — dan cara membuat
          masing-masing. Dimulai dari struktur HTML, lalu tampilan, tata letak, interaksi, kualitas, sampai publikasi.
        </p>

        <div className="mt-14 space-y-12">
          {LESSON_GROUPS.map((group) => {
            const lessons = getGroupLessons(group.id)

            return (
              <section key={group.id} aria-labelledby={`grup-${group.id}`}>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-border/60 pb-3">
                  <h2 id={`grup-${group.id}`} className="text-lg font-medium tracking-tight">
                    {group.label}
                  </h2>
                  <span className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                    {lessons.length} materi
                  </span>
                </div>
                <p className="mt-3 max-w-[70ch] text-sm leading-6 text-muted-foreground">{group.note}</p>

                <ul className="mt-4 grid gap-2.5">
                  {lessons.map((lesson) => (
                    <li key={lesson.slug}>
                      <Link
                        href={`/materi/${lesson.slug}`}
                        className="group flex items-start gap-4 rounded-xl border border-border/70 px-4 py-3.5 transition-colors hover:border-border hover:bg-muted/40"
                      >
                        <span className="mt-0.5 font-mono text-[11px] text-muted-foreground tabular-nums">
                          {lesson.num}
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-medium text-foreground">{lesson.title}</span>
                          <span className="mt-0.5 block text-sm leading-6 text-muted-foreground">{lesson.desc}</span>
                        </span>
                        <span
                          aria-hidden
                          className="ml-auto pt-0.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}
        </div>

        <p className="mt-16 border-t border-border/60 pt-6 text-xs text-muted-foreground">
          Materi disusun dari kurikulum Belajar Website (00–10), diperluas dengan sudut pandang komponen website.
        </p>
      </main>
    </div>
  )
}
