"use client"

import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
// @ts-ignore
import { BsFillCloudCheckFill } from "react-icons/bs"
import { ImSpinner8 } from "react-icons/im"

export const Autosaving = ({ cv }: any) => {
  const [isSaving, setIsSaving] = useState(true)

  useEffect(() => {
    const save = async () => {
      try {
        setIsSaving(true)

        const uuid = window.location.pathname.split("/").pop()

        await fetch(`/api/cv/${uuid}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cv }),
        })
      } catch (error) {
        console.error(error)
        toast.error("Error saving")
      } finally {
        setIsSaving(false)
      }
    }

    // Debounce 1s
    const timeout = setTimeout(save, 1000)

    return () => clearTimeout(timeout)
  }, [cv])

  return (
    <div className="absolute -top-8 left-0 -translate-y-1/2 select-none text-xs text-white">
      {isSaving ? (
        <div className="flex items-center space-x-2">
          <ImSpinner8 className="animate-spin" />
          <span>Saving...</span>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <BsFillCloudCheckFill className="text-green-500" />
          <span>Saved</span>
        </div>
      )}
    </div>
  )
}
