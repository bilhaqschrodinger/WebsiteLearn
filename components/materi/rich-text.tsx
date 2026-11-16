import type { ReactNode } from "react"

const TOKEN = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g

/**
 * Marka kecil untuk teks materi: `code`, **tebal**, dan *miring*.
 * Sengaja bukan markdown penuh — hanya tiga bentuk yang dipakai di data.
 */
export function RichText({ text }: { text: string }): ReactNode {
  const parts = text.split(TOKEN)

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
          return (
            <code
              key={index}
              className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.85em] whitespace-nowrap text-foreground"
            >
              {part.slice(1, -1)}
            </code>
          )
        }

        if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
          return (
            <strong key={index} className="font-semibold text-foreground">
              {part.slice(2, -2)}
            </strong>
          )
        }

        if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
          return (
            <em key={index} className="italic">
              {part.slice(1, -1)}
            </em>
          )
        }

        return part
      })}
    </>
  )
}
