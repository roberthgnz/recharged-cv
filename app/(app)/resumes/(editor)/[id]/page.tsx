import { CVEditorProvider } from "@/cv-editor"
import { CVEditorScoreProvider } from "@/cv-editor-score"
import { getServerSession } from "@/utils/auth"

import { CVEditorPreview } from "@/components/CVEditorPreview"
import { CVForm } from "@/components/CVForm"

export default async function Page({ params }: any) {
  const session = await getServerSession()

  const curriculum = {
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
        <div className="grid grid-cols-2 h-full mt-6">
          <CVForm defaultState={curriculum} />
          <CVEditorPreview />
        </div>
      </CVEditorScoreProvider>
    </CVEditorProvider>
  )
}
