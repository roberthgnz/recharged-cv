import { redirect } from "next/navigation"
import { getServerSession } from "@/utils/auth"

import { Dashboard } from "@/components/Dashboard"

export default async function Resumes() {
  const session = await getServerSession()

  if (!session) return redirect("/")

  const props = {
    cvs: [],
  }

  return <Dashboard {...props} />
}
