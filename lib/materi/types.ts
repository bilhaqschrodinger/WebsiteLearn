export type GroupId = "mulai" | "fondasi" | "interaksi" | "kualitas" | "rilis"

export type CalloutTone = "tip" | "warn" | "info" | "danger"

/** Satu blok konten di dalam sebuah sub-bab. */
export type Block =
  | { type: "p"; text: string }
  | { type: "code"; code: string; label?: string }
  | { type: "callout"; tone: CalloutTone; title: string; text?: string; code?: string }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "list"; ordered?: boolean; items: string[] }

export type Section = {
  heading: string
  blocks: Block[]
}

/** Potongan website yang bisa dibangun setelah menyelesaikan materi ini. */
export type WebsiteComponent = {
  name: string
  note: string
}

export type Lesson = {
  slug: string
  num: string
  title: string
  /** Nama pendek yang tampil di folder. */
  short: string
  desc: string
  group: GroupId
  lead: string
  goals: string[]
  components: WebsiteComponent[]
  sections: Section[]
  exercise: string[]
  checklist: string[]
}

export type LessonGroup = {
  id: GroupId
  label: string
  note: string
}
