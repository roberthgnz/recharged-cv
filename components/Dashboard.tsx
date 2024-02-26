import Link from "next/link"
import { PlusIcon } from "@heroicons/react/24/outline"

import { CVCard } from "./CVCard"
import { Card } from "./ui/card"

export const Dashboard = ({ cvs }: { cvs: any[] }) => {
  const cvUuid = crypto.randomUUID()

  return (
    <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="flex items-center justify-center border-2 p-0 text-blue-500 shadow-none ring-0 transition-all hover:shadow-md">
        <Link
          href={`/resumes/${cvUuid}/`}
          className="flex size-full items-center justify-center p-6"
        >
          <PlusIcon className="mr-2 size-4" />
          Add new CV
        </Link>
      </Card>
      {cvs.map((cv) => (
        <CVCard key={cv.id} {...cv} />
      ))}
    </div>
  )
}
