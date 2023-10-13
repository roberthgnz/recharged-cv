"use client"

import { useSearchParams } from "next/navigation"

export function AuthMessages() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")
  const message = searchParams.get("message")
  return (
    <>
      {error && (
        <p className="rounded-md border border-red-300 bg-red-200 p-4 text-center text-sm text-gray-800">
          {error}
        </p>
      )}
      {message && (
        <p className="rounded-md border border-green-300 bg-green-200 p-4 text-center text-sm text-gray-800">
          {message}
        </p>
      )}
    </>
  )
}
