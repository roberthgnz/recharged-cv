import { redirect } from "next/navigation"
import { CVEditorProvider } from "@/cv-editor"
import { CVEditorScoreProvider } from "@/cv-editor-score"

import { getServerSession } from "@/utils/auth"
import { CVEditorPreview } from "@/components/CVEditorPreview"
import { CVForm } from "@/components/CVForm"
import { getCv } from "@/app/(app)/actions"

export default async function Page({ params }: any) {
  const uuid = params.uuid

  const session = await getServerSession()
  if (!session) return redirect("/")

  const data = await getCv(uuid, session.user.id)

  const curriculum = data?.cv || {
    personaldata: {},
    futurejob: {},
    experience: {
      experience: [],
    },
    education: {
      education: [],
    },
    skills: {
      expertise: [],
      language: [],
    },
  }

  return (
    <CVEditorProvider>
      <CVEditorScoreProvider>
        <div className="mt-6 grid h-full grid-cols-2">
          <CVForm defaultState={curriculum} />
          <CVEditorPreview />
        </div>
      </CVEditorScoreProvider>
    </CVEditorProvider>
  )
}
