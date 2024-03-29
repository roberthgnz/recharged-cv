"use client"

import { useRef, useState } from "react"
import { RefreshCcwIcon } from "lucide-react"
import { toast } from "react-hot-toast"
import { useOnClickOutside } from "usehooks-ts"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const DialogSuggestions = ({
  prompt,
  defaultContext,
  defaultGeneratedText = "1. Results-driven software engineer with 5+ years of experience in Python development. Proficient in React and passionate about building innovative solutions for complex problems. \n2. Highly skilled and detail-oriented Python developer with expertise in React. Committed to delivering high-quality software products that exceed client expectations. \n3. Experienced software engineer with a strong background in Python and React. Excels at collaborating with cross-functional teams to develop innovative solutions to complex problems. \n4. Expert software engineer with 5+ years of experience in Python development. Skilled in React and passionate about building innovative solutions for complex problems.",
  onClose,
  onSelect,
}: any) => {
  const ref = useRef(null)

  const [loading, setLoading] = useState(false)
  const [context, setContext] = useState(defaultContext || "")

  const [generatedText, setGeneratedText] = useState(defaultGeneratedText)

  const generate = async (e: any) => {
    e.preventDefault()
    setGeneratedText("")
    setLoading(true)

    const _prompt =
      prompt ||
      `Generate 4 Professional and energetic CV summary clearly labeling each section 1. 2. 3. 4.
      Make sure each generated summary is at least 150 and 200 max characters based on this context: ${context}`

    const response = await fetch("/api/cv/get-suggestions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: _prompt,
      }),
    })

    if (!response.ok) {
      setLoading(false)
      setGeneratedText(defaultGeneratedText)
      return toast.error(response.statusText)
    }

    // This data is a ReadableStream
    const data = response.body
    if (!data) {
      return
    }

    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)
      setGeneratedText((prev: string) => prev + chunkValue)
    }

    setLoading(false)
  }

  useOnClickOutside(ref, (e) => {
    if (loading) return
    onClose(e)
  })

  return (
    <div ref={ref} className="w-full rounded-md border bg-white p-3 shadow-lg">
      <form onSubmit={generate}>
        <div className="flex items-center space-x-3">
          <Input
            value={context}
            onChange={(e: any) => setContext(e.target.value)}
            className="my-5 w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            placeholder={
              'Use keywords and job title. e.g. "software engineer, python, react"'
            }
            disabled={loading}
          />
          <Button disabled={loading} onClick={generate}>
            {loading && <RefreshCcwIcon className="mr-2 size-4 animate-spin" />}
            Generate
          </Button>
        </div>
      </form>
      <div className="space-y-10">
        {generatedText && (
          <div className="space-y-4">
            {generatedText
              .split(/\d\./)
              .slice(1)
              .map((generated: string, index: number) => {
                return (
                  <div
                    className="flex flex-row gap-4"
                    key={`generated-${index}`}
                  >
                    <div className="inline-flex size-5 shrink-0 cursor-default items-center justify-center rounded-full bg-blue-100 text-sm text-blue-700">
                      {index + 1}
                    </div>
                    <div
                      className="cursor-pointer select-none rounded-md tracking-tight hover:bg-blue-100"
                      onClick={() => {
                        onSelect(generated.trim())
                      }}
                    >
                      {generated}
                    </div>
                  </div>
                )
              })}
          </div>
        )}
      </div>
    </div>
  )
}
