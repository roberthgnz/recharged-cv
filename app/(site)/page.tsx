import { redirect } from "next/navigation"

import { getServerSession } from "@/utils/auth"

export const dynamic = "force-dynamic"

export default async function Home() {
  const session = await getServerSession()

  if (session) redirect("/resumes")

  return (
    <div className="space-y-4 text-center">
      <h1>WIP</h1>
      <p>Work in progress</p>
    </div>
  )
}
