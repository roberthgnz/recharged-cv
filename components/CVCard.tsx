import Link from "next/link"
import { FiEdit2, FiTrash } from "react-icons/fi"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { removeCv } from "@/app/(app)/actions"

import { CVCardPreview } from "./CVCardPreview"
import { Button } from "./ui/button"

export const CVCard = ({ id }: any) => {
  const removeCvWithId = removeCv.bind(null, id)

  return (
    <Card className="flex h-full flex-col justify-between">
      <CardContent className="pt-6">
        <CVCardPreview id={id} />
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-between">
          <form action={removeCvWithId}>
            <Button variant={"link"} className="text-destructive">
              <FiTrash className="mr-2 size-4" />
              Remove
            </Button>
          </form>
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
