import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { LessonView } from "@/components/materi/lesson-view"
import { getGroup, getGroupLessons, getLesson, getLessonNeighbors, LESSONS } from "@/lib/materi"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return LESSONS.map((lesson) => ({ slug: lesson.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const lesson = getLesson(slug)

  if (!lesson) {
    return { title: "Materi tidak ditemukan — Belajar Website" }
  }

  return {
    title: `${lesson.num} · ${lesson.title} — Belajar Website`,
    description: lesson.desc,
  }
}

export default async function MateriPage({ params }: PageProps) {
  const { slug } = await params
  const lesson = getLesson(slug)

  if (!lesson) {
    notFound()
  }

  const group = getGroup(lesson.group)
  const { prev, next } = getLessonNeighbors(lesson.slug)

  return (
    <LessonView
      lesson={lesson}
      group={group}
      groupLessons={getGroupLessons(lesson.group)}
      prev={prev}
      next={next}
    />
  )
}
