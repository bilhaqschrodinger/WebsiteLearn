import type { GroupId, Lesson, LessonGroup } from "./types"

import l00 from "./00-peta-belajar"
import l01 from "./01-html-struktur"
import l02 from "./02-css-tampilan"
import l03 from "./03-layout-flexbox-grid"
import l04 from "./04-responsive-design"
import l05 from "./05-javascript-interaksi"
import l06 from "./06-form-validasi"
import l07 from "./07-aksesibilitas"
import l08 from "./08-seo-performa"
import l09 from "./09-hosting-deploy"
import l10 from "./10-cheatsheet"

export type { Block, CalloutTone, GroupId, Lesson, LessonGroup, Section, WebsiteComponent } from "./types"

/** Urutan materi 00–10, sama dengan urutan di peta belajar. */
export const LESSONS: Lesson[] = [l00, l01, l02, l03, l04, l05, l06, l07, l08, l09, l10]

export const LESSON_GROUPS: LessonGroup[] = [
  { id: "mulai", label: "Mulai", note: "Gambaran besar sebelum menulis kode." },
  {
    id: "fondasi",
    label: "Fondasi",
    note: "Empat fondasi yang membentuk semua halaman: struktur, tampilan, tata letak, dan perilaku di layar kecil.",
  },
  { id: "interaksi", label: "Interaksi", note: "Membuat halaman bereaksi dan menerima input pengguna." },
  { id: "kualitas", label: "Kualitas", note: "Bisa dipakai semua orang, dan ditemukan mesin pencari." },
  { id: "rilis", label: "Rilis", note: "Membuat situs bisa diakses publik, plus rujukan cepat." },
]

export const LESSON_COUNT = LESSONS.length

export function getLesson(slug: string): Lesson | undefined {
  return LESSONS.find((lesson) => lesson.slug === slug)
}

export function getGroup(id: GroupId): LessonGroup {
  return LESSON_GROUPS.find((group) => group.id === id) ?? LESSON_GROUPS[0]
}

export function getGroupLessons(id: GroupId): Lesson[] {
  return LESSONS.filter((lesson) => lesson.group === id)
}

export function getLessonNeighbors(slug: string): { prev?: Lesson; next?: Lesson } {
  const index = LESSONS.findIndex((lesson) => lesson.slug === slug)
  if (index < 0) return {}
  return { prev: LESSONS[index - 1], next: LESSONS[index + 1] }
}

export function getAllSlugs(): string[] {
  return LESSONS.map((lesson) => lesson.slug)
}
