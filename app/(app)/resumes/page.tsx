import { redirect } from "next/navigation"

import { getServerSession } from "@/utils/auth"
import { Dashboard } from "@/components/Dashboard"
import { getCvs } from "@/app/(app)/actions"

export default async function Resumes() {
  const session = await getServerSession()

  if (!session) return redirect("/")

  const cvs = await getCvs(session.user.id)

  return <Dashboard cvs={cvs} />
}
