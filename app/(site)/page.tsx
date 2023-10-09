import { redirect } from "next/navigation"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"

import { Hero } from "@/components/Hero"

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (session) redirect("/resumes")

  return <Hero />
}
