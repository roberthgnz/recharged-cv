import Link from "next/link"
import { FiEdit2, FiTrash } from "react-icons/fi"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

import { Button } from "./ui/button"

export const CVCard = ({ id }: any) => {
  return (
    <Card className="flex h-full flex-col justify-between">
      <CardHeader>
        CV <small>{id}</small>
      </CardHeader>
      <CardContent>Lorem ipsum dolor sit amet consectetur</CardContent>
      <CardFooter>
        <div className="flex w-full justify-between">
          <Button variant={"link"} className="text-destructive">
            <FiTrash className="mr-2 h-4 w-4" />
            Remove
          </Button>
          <Button variant={"link"} asChild>
            <Link href={`/resumes/${id}`}>
              <FiEdit2 className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
