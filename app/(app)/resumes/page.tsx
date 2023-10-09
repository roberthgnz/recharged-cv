import { redirect } from "next/navigation"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"

import { Dashboard } from "@/components/Dashboard"

export default async function Resumes() {
  const session = await getServerSession(authOptions)

  if (!session) return redirect("/login")

  const props = {
    cvs: [],
  }

  return <Dashboard {...props} />
}
