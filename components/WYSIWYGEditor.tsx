"use client"

import { useRef } from "react"
import { Editor } from "@tinymce/tinymce-react"

export const WYSIWYGEditor = ({ value, onChange }: any) => {
  const editorRef = useRef<any>(null)

  return (
    <>
      <Editor
        tinymceScriptSrc={
          "https://cdn.tiny.cloud/1/mxnwduf36nbk4p2rbj6jh7otmulfl1cdc9y9nf6k1hhmuxrh/tinymce/6/tinymce.min.js"
        }
        onInit={(_, editor) => (editorRef.current = editor)}
        init={{
          content_style: `body { font-family: Arial; font-weight: 500; font-size: 0.875rem; line-height: 1.25rem; }`,
          height: 300,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "anchor",
            "help",
            "wordcount",
          ],
        }}
        value={value}
        onEditorChange={onChange}
      />
    </>
  )
}
