/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { createContext, useEffect, useState } from "react"
import { useLocalStorage } from "usehooks-ts"

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

type CVEditorContextState = Record<string, unknown> | null

export const CVEditorContext = createContext<CVEditorContextState>(defaultState)

export const CVEditorProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [localEditorData, setlocalEditorData] =
    useLocalStorage<CVEditorContextState>("recharged-cv", null)
  const [state, setState] = useState<CVEditorContextState>(defaultState)

  useEffect(() => {
    if (localEditorData) {
      setState(localEditorData)
    }
  }, [])

  useEffect(() => {
    setlocalEditorData(state)
  }, [state])

  return (
    <CVEditorContext.Provider value={{ state, setState }}>
      {children}
    </CVEditorContext.Provider>
  )
}
