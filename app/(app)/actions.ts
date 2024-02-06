"use server"

import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

export async function getCvs(userId?: string | null) {
  const cookieStore = cookies()

  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  })

  try {
    const { data: cvs } = await supabase
      .from("resumes")
      .select("*")
      .eq("user_id", userId)

    return cvs ?? []
  } catch (error) {
    return []
  }
}

export async function getCv(id: string, userId: string) {
  const cookieStore = cookies()

  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  })

  const { data: resume } = await supabase
    .from("resumes")
    .select("*")
    .eq("id", id)
    .eq("user_id", userId)
    .single()

  return resume.cv
}

export async function getSharedCv(id: string) {
  const cookieStore = cookies()

  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  })

  const { data: resume } = await supabase
    .from("resumes")
    .select("*")
    .eq("id", id)
    .single()

  return resume.cv
}
