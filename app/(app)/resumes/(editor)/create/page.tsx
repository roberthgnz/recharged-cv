import { CVEditorProvider } from "@/cv-editor"
import { CVEditorScoreProvider } from "@/cv-editor-score"

import { CVEditorPreview } from "@/components/CVEditorPreview"
import { CVForm } from "@/components/CVForm"

export default async function Page() {
  const defaultState = {
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
        <div className="grid grid-cols- 2 h-full mt-6">
          <CVForm defaultState={defaultState} />
          <CVEditorPreview />
        </div>
      </CVEditorScoreProvider>
    </CVEditorProvider>
  )
}
