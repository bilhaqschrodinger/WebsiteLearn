"use client"

import { useEffect, useRef, useState } from "react"

type CodeBlockProps = {
  code: string
  label?: string
}

type CopyState = "idle" | "copied" | "error"

async function writeClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Clipboard API bisa ditolak (misalnya dokumen tidak sedang fokus).
    // textarea sementara + execCommand masih bekerja di sebagian besar browser.
    try {
      const area = document.createElement("textarea")
      area.value = text
      area.setAttribute("readonly", "")
      area.style.position = "fixed"
      area.style.top = "-9999px"
      document.body.append(area)
      area.select()
      const ok = document.execCommand("copy")
      area.remove()
      return ok
    } catch {
      return false
    }
  }
}

export function CodeBlock({ code, label }: CodeBlockProps) {
  const [state, setState] = useState<CopyState>("idle")
  const timer = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current)
    }
  }, [])

  async function copy() {
    const ok = await writeClipboard(code)
    setState(ok ? "copied" : "error")
    if (timer.current !== null) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setState("idle"), 1800)
  }

  return (
    <div className="overflow-hidden rounded-xl border border-black/40 bg-[#0d1117] shadow-sm">
      <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.04] px-3.5 py-2">
        <span className="font-mono text-[10px] tracking-[0.16em] text-white/55 uppercase">{label ?? "Kode"}</span>
        <button
          type="button"
          onClick={copy}
          className="ml-auto rounded-md px-2 py-1 font-mono text-[10px] tracking-[0.12em] text-white/55 uppercase transition-colors hover:bg-white/10 hover:text-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
        >
          <span aria-live="polite">{state === "copied" ? "Tersalin" : state === "error" ? "Gagal" : "Salin"}</span>
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-[1.7] text-[#e6edf3]">
        <code>{code}</code>
      </pre>
    </div>
  )
}
