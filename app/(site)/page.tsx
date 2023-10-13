import { cookies } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Button } from "@/components/ui/button"

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

  return (
    <div className="space-y-4 text-center">
      <h1>WIP</h1>
      <p>Work in progress</p>
      <Button asChild>
        <Link href={"/login"}>Sign In</Link>
      </Button>
    </div>
  )
}
