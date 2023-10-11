import { redirect } from "next/navigation"

import { getServerSession } from "@/utils/auth"

// import { Hero } from "@/components/Hero"

export default async function Home() {
  const session = await getServerSession()

  if (session) redirect("/resumes")

  return (
    <>
      <h1>WIP</h1>
      <p>Work in progress</p>
    </>
  )
}
