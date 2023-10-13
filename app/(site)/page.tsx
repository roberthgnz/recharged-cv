import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Hero } from "@/components/Hero"

export const dynamic = "force-dynamic"

export default async function Home() {
  const cookieStore = cookies()

  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) redirect("/resumes")

  return <Hero />
}
