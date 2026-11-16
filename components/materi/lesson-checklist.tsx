"use client"

import { useEffect, useState } from "react"

import { RichText } from "./rich-text"

type LessonChecklistProps = {
  slug: string
  items: string[]
}

export function LessonChecklist({ slug, items }: LessonChecklistProps) {
  const storageKey = `bw-progress:${slug}`
  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false))

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey)
      const saved: unknown = raw ? JSON.parse(raw) : []
      if (Array.isArray(saved)) {
        setChecked(items.map((_, index) => saved.includes(index)))
      }
    } catch {
      /* localStorage bisa diblokir — biarkan kosong. */
    }
    // items berasal dari data statis; cukup kunci penyimpanannya yang berubah.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey])

  function toggle(index: number) {
    setChecked((prev) => {
      const next = prev.map((value, i) => (i === index ? !value : value))
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(next.flatMap((value, i) => (value ? [i] : []))))
      } catch {
        /* abaikan */
      }
      return next
    })
  }

  function reset() {
    setChecked(items.map(() => false))
    try {
      window.localStorage.removeItem(storageKey)
    } catch {
      /* abaikan */
    }
  }

  const done = checked.filter(Boolean).length
  const percent = items.length > 0 ? Math.round((done / items.length) * 100) : 0

  return (
    <div className="rounded-2xl border border-border/70 bg-card p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <h2 className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">Checklist</h2>
        <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
          {done}/{items.length}
        </span>
        {done > 0 ? (
          <button
            type="button"
            onClick={reset}
            className="ml-auto font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase transition-colors hover:text-foreground"
          >
            Reset
          </button>
        ) : null}
      </div>

      <div
        className="mt-3 h-1 w-full overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-label="Progres checklist"
        aria-valuemin={0}
        aria-valuemax={items.length}
        aria-valuenow={done}
      >
        <div className="h-full rounded-full bg-foreground/70 transition-[width] duration-300" style={{ width: `${percent}%` }} />
      </div>

      <ul className="mt-3 space-y-0.5">
        {items.map((item, index) => (
          <li key={item}>
            <label className="flex cursor-pointer items-start gap-3 rounded-lg px-1.5 py-2 text-[15px] leading-7 transition-colors hover:bg-muted/50">
              <input
                type="checkbox"
                checked={checked[index]}
                onChange={() => toggle(index)}
                className="mt-[7px] size-4 shrink-0 cursor-pointer accent-foreground"
              />
              <span className={checked[index] ? "text-muted-foreground line-through decoration-border" : undefined}>
                <RichText text={item} />
              </span>
            </label>
          </li>
        ))}
      </ul>
      <p className="mt-3 px-1.5 text-xs text-muted-foreground">Centang tersimpan di browser ini.</p>
    </div>
  )
}
