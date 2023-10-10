/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { createContext, useEffect, useState } from "react"

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
  const [state, setState] = useState<CVEditorContextState>(defaultState)

  return (
    <CVEditorContext.Provider value={{ state, setState }}>
      {children}
    </CVEditorContext.Provider>
  )
}
