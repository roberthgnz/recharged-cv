import Link from "next/link"
import { PlusIcon } from "@heroicons/react/24/outline"

import { CVCard } from "./CVCard"
import { Card } from "./ui/card"

export const Dashboard = ({ cvs }: { cvs: any[] }) => {
  const cvUuid = crypto.randomUUID()

  return (
    <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cvs.map((cv) => (
        <CVCard key={cv.uuid} {...cv} />
      ))}
      <Card className="flex items-center justify-center border-2 border-dotted p-0 text-blue-500 shadow-none ring-0">
        <Link
          href={`/resumes/${cvUuid}/`}
          className="flex h-full w-full items-center justify-center p-6"
        >
          <PlusIcon className="mr-3 h-5 w-5" />
          CREATE NEW RESUME
        </Link>
      </Card>
    </div>
  )
}
