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
        <div className="mt-6 grid h-full grid-cols-2">
          <CVForm defaultState={defaultState} />
          <CVEditorPreview />
        </div>
      </CVEditorScoreProvider>
    </CVEditorProvider>
  )
}
