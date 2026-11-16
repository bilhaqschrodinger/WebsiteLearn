import Link from "next/link"

import type { Block, CalloutTone, Lesson, LessonGroup } from "@/lib/materi"

import { CodeBlock } from "./code-block"
import { LessonChecklist } from "./lesson-checklist"
import { RichText } from "./rich-text"

type LessonViewProps = {
  lesson: Lesson
  group: LessonGroup
  groupLessons: Lesson[]
  prev?: Lesson
  next?: Lesson
}

const CALLOUT_STYLES: Record<CalloutTone, { icon: string; box: string; title: string }> = {
  tip: {
    icon: "✅",
    box: "border-emerald-600/25 bg-emerald-500/[0.07]",
    title: "text-emerald-900 dark:text-emerald-200",
  },
  warn: {
    icon: "⚠️",
    box: "border-amber-600/30 bg-amber-500/[0.09]",
    title: "text-amber-900 dark:text-amber-200",
  },
  info: {
    icon: "💡",
    box: "border-sky-600/25 bg-sky-500/[0.07]",
    title: "text-sky-900 dark:text-sky-200",
  },
  danger: {
    icon: "🛑",
    box: "border-red-600/25 bg-red-500/[0.07]",
    title: "text-red-900 dark:text-red-200",
  },
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return (
        <p className="max-w-[68ch] text-[15px] leading-7 text-foreground/85">
          <RichText text={block.text} />
        </p>
      )

    case "code":
      return <CodeBlock code={block.code} label={block.label} />

    case "callout": {
      const style = CALLOUT_STYLES[block.tone]
      return (
        <div className={`rounded-xl border p-4 sm:p-5 ${style.box}`}>
          <div className="flex items-start gap-3">
            <span aria-hidden className="mt-0.5 text-base leading-6">
              {style.icon}
            </span>
            <div className="min-w-0 flex-1">
              <p className={`text-sm font-semibold ${style.title}`}>
                <RichText text={block.title} />
              </p>
              {block.text ? (
                <p className="mt-1.5 text-sm leading-6 text-foreground/75">
                  <RichText text={block.text} />
                </p>
              ) : null}
              {block.code ? (
                <div className="mt-3">
                  <CodeBlock code={block.code} label="Contoh" />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )
    }

    case "table":
      return (
        <div className="overflow-x-auto rounded-xl border border-border/70">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-muted/60">
              <tr>
                {block.head.map((cell) => (
                  <th
                    key={cell}
                    scope="col"
                    className="px-3.5 py-2.5 font-mono text-[10px] font-medium tracking-[0.12em] whitespace-nowrap text-muted-foreground uppercase"
                  >
                    <RichText text={cell} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="align-top even:bg-muted/25">
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={`px-3.5 py-2.5 leading-6 ${cellIndex === 0 ? "font-medium text-foreground" : "text-foreground/80"}`}
                    >
                      <RichText text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    case "list":
      return block.ordered ? (
        <ol className="max-w-[68ch] list-decimal space-y-2 pl-5 text-[15px] leading-7 text-foreground/85 marker:font-mono marker:text-xs marker:text-muted-foreground">
          {block.items.map((item, index) => (
            <li key={index} className="pl-1">
              <RichText text={item} />
            </li>
          ))}
        </ol>
      ) : (
        <ul className="max-w-[68ch] space-y-2 text-[15px] leading-7 text-foreground/85">
          {block.items.map((item, index) => (
            <li key={index} className="flex gap-2.5">
              <span aria-hidden className="mt-3 size-1.5 shrink-0 rounded-full bg-foreground/35" />
              <span>
                <RichText text={item} />
              </span>
            </li>
          ))}
        </ul>
      )

    default:
      return null
  }
}

export function LessonView({ lesson, group, groupLessons, prev, next }: LessonViewProps) {
  const toc = lesson.sections.map((section) => section.heading.replace(/[`*]/g, ""))

  return (
    <div className="min-h-svh bg-background">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-5">
          <Link
            href="/"
            className="group flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <span aria-hidden className="transition-transform group-hover:-translate-x-0.5">
              ←
            </span>
            Peta Belajar
          </Link>
          <span aria-hidden className="h-4 w-px bg-border" />
          <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">{group.label}</span>
          <Link
            href="/materi"
            className="ml-auto font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase transition-colors hover:text-foreground"
          >
            Semua materi
          </Link>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-6xl gap-12 px-5 pt-10 pb-24 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-14 lg:pt-14">
        <article className="min-w-0">
          <header>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="rounded-full border border-border bg-muted/60 px-2.5 py-1 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                {group.label}
              </span>
              <span className="font-mono text-[11px] text-muted-foreground">Materi {lesson.num}</span>
            </div>
            <h1 className="mt-5 text-[2rem] leading-[1.1] font-medium tracking-tight text-balance sm:text-[2.6rem]">
              {lesson.title}
            </h1>
            <p className="mt-4 max-w-[64ch] text-[15px] leading-7 text-muted-foreground sm:text-base">{lesson.lead}</p>
          </header>

          <section aria-labelledby="tujuan" className="mt-8 rounded-2xl border border-border/70 bg-card p-5 sm:p-6">
            <h2 id="tujuan" className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
              Yang akan kamu pelajari
            </h2>
            <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {lesson.goals.map((goal) => (
                <li key={goal} className="flex gap-2.5 text-sm leading-6 text-foreground/85">
                  <span aria-hidden className="mt-[9px] size-1.5 shrink-0 rounded-full bg-foreground/35" />
                  <span>
                    <RichText text={goal} />
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {lesson.sections.map((section, index) => (
            <section
              key={section.heading}
              id={`bagian-${index + 1}`}
              className="mt-12 scroll-mt-24 border-t border-border/60 pt-9"
            >
              <h2 className="text-xl font-medium tracking-tight text-balance sm:text-[1.35rem]">
                <RichText text={section.heading} />
              </h2>
              <div className="mt-5 space-y-5">
                {section.blocks.map((block, blockIndex) => (
                  <BlockView key={blockIndex} block={block} />
                ))}
              </div>
            </section>
          ))}

          <section aria-labelledby="komponen" className="mt-14 border-t border-border/60 pt-9">
            <h2 id="komponen" className="text-xl font-medium tracking-tight sm:text-[1.35rem]">
              Komponen website di materi ini
            </h2>
            <p className="mt-2 max-w-[62ch] text-sm leading-6 text-muted-foreground">
              Teori di atas berujung pada potongan halaman yang benar-benar dipakai. Ini yang bisa kamu bangun setelah
              menyelesaikan materinya.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {lesson.components.map((component) => (
                <div key={component.name} className="rounded-xl border border-border/70 bg-muted/30 p-4">
                  <p className="text-sm font-medium text-foreground">{component.name}</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    <RichText text={component.note} />
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="latihan" className="mt-14 border-t border-border/60 pt-9">
            <h2 id="latihan" className="text-xl font-medium tracking-tight sm:text-[1.35rem]">
              Latihan
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Kerjakan di file sendiri. Kalau macet, kembali ke bagian yang relevan — jangan langsung menyalin jawaban.
            </p>
            <ol className="mt-5 max-w-[68ch] list-decimal space-y-2.5 pl-5 text-[15px] leading-7 text-foreground/85 marker:font-mono marker:text-xs marker:text-muted-foreground">
              {lesson.exercise.map((item, index) => (
                <li key={index} className="pl-1">
                  <RichText text={item} />
                </li>
              ))}
            </ol>
          </section>

          <div className="mt-14">
            <LessonChecklist slug={lesson.slug} items={lesson.checklist} />
          </div>

          <nav aria-label="Navigasi antar materi" className="mt-10 grid gap-3 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/materi/${prev.slug}`}
                className="group rounded-xl border border-border/70 p-4 transition-colors hover:bg-muted/50"
              >
                <span className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                  ← Materi {prev.num}
                </span>
                <span className="mt-1 block text-sm font-medium text-foreground">{prev.title}</span>
              </Link>
            ) : (
              <span aria-hidden />
            )}
            {next ? (
              <Link
                href={`/materi/${next.slug}`}
                className="group rounded-xl border border-border/70 p-4 transition-colors hover:bg-muted/50 sm:text-right"
              >
                <span className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                  Materi {next.num} →
                </span>
                <span className="mt-1 block text-sm font-medium text-foreground">{next.title}</span>
              </Link>
            ) : null}
          </nav>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-8">
            <nav aria-label="Di halaman ini">
              <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">Di halaman ini</p>
              <ul className="mt-3 space-y-2 border-l border-border/70 pl-4">
                {toc.map((heading, index) => (
                  <li key={heading}>
                    <a
                      href={`#bagian-${index + 1}`}
                      className="block text-xs leading-snug text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                Kelompok {group.label}
              </p>
              <ul className="mt-3 space-y-2">
                {groupLessons.map((item) => {
                  const active = item.slug === lesson.slug
                  return (
                    <li key={item.slug}>
                      <Link
                        href={`/materi/${item.slug}`}
                        aria-current={active ? "page" : undefined}
                        className={`flex gap-2 text-xs leading-snug transition-colors ${
                          active ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span className="font-mono text-[10px] text-muted-foreground tabular-nums">{item.num}</span>
                        <span>{item.short}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>

            <p className="border-t border-border/60 pt-5 text-[11px] leading-5 text-muted-foreground">
              {group.note}
            </p>
          </div>
        </aside>
      </main>

      <footer className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-5 py-7 text-xs text-muted-foreground">
          <span className="font-mono text-[10px] tracking-[0.14em] uppercase">
            {lesson.num} · {lesson.title}
          </span>
          <Link href="/materi" className="transition-colors hover:text-foreground">
            Semua materi
          </Link>
          <Link href="/" className="ml-auto transition-colors hover:text-foreground">
            Kembali ke peta belajar
          </Link>
        </div>
      </footer>
    </div>
  )
}
