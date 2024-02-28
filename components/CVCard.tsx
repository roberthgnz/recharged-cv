"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Loader2 } from "lucide-react"
import { FiEdit2, FiTrash } from "react-icons/fi"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

import { CVCardPreview } from "./CVCardPreview"
import { Button } from "./ui/button"

export const CVCard = ({ id }: any) => {
  const supabase = createClientComponentClient()

  const router = useRouter()

  const [_, setIsRemoveDialogOpen] = useState(false)
  const [isRemoving, setIsRemoving] = useState(false)

  const removeCv = async () => {
    setIsRemoving(true)

    await supabase.from("resumes").delete().eq("id", id)

    setIsRemoving(false)
    setIsRemoveDialogOpen(false)

    router.refresh()
  }

  return (
    <Card className="flex h-full flex-col justify-between">
      <CardContent className="pt-6">
        <CVCardPreview id={id} />
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-between">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant={"link"}
                className="text-destructive"
                onClick={() => setIsRemoveDialogOpen(true)}
              >
                <FiTrash className="mr-2 size-4" />
                Remove
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your CV and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isRemoving}>
                  Cancel
                </AlertDialogCancel>
                <Button
                  variant={"destructive"}
                  disabled={isRemoving}
                  onClick={removeCv}
                >
                  {isRemoving && (
                    <Loader2 className="mr-2 size-4 animate-spin" />
                  )}
                  Yes, remove
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button variant={"link"} asChild>
            <Link href={`/resumes/${id}`}>
              <FiEdit2 className="mr-2 size-4" />
              Edit
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
