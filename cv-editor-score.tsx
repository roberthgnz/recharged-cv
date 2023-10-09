"use client"

import { createContext, useContext, useEffect, useState } from "react"

import { CVEditorContext } from "./cv-editor"

type CVEditorScoreContextState = any

function getNestedPropValue(obj: any, path: string) {
  return path.split(".").reduce((acc, key) => {
    return acc[key]
  }, obj)
}

export const CVEditorScoreContext = createContext<CVEditorScoreContextState>(0)

export const CVEditorScoreProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const editorContent = useContext(CVEditorContext)

  const [state, setState] = useState<CVEditorScoreContextState>(0)

  useEffect(() => {
    const pointers: Record<string, number> = {
      "experience.experience": 25,
      "education.education": 15,
      "personaldata.email": 5,
      "personaldata.summary": 15,
      "futurejob.preferredPosition": 10,
      "skills.expertise": 15,
      "skills.language": 15,
    }

    let score = 0

    for (const pointer in pointers) {
      const value = getNestedPropValue(editorContent?.state, pointer)
      if (value && value?.length) {
        score += pointers[pointer]
      }
    }

    setState(score)
  }, [editorContent])

  return (
    <CVEditorScoreContext.Provider value={{ state, setState }}>
      {children}
    </CVEditorScoreContext.Provider>
  )
}
