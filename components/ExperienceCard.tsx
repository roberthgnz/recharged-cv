import { formatDate } from "@/utils/date"
import { Edit } from "lucide-react"

import { Button } from "@/components/ui/button"

export const ExperienceCard = ({
  id,
  job,
  company,
  startingDate,
  finishingDate,
  onCourse,
  onEdit,
}: any) => {
  return (
    <div className="p-4 border rounded-md">
      <div className="flex items-center justify-between">
        <h2 className="my-1 font-bold">{job}</h2>{" "}
        <Button variant="secondary" onClick={() => onEdit(id)}>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </div>
      {company && <span className="text-xs">{company}</span>}
      <span className="text-xs">
        {formatDate(startingDate)} -{" "}
        {onCourse ? "Present" : formatDate(finishingDate)}
      </span>
    </div>
  )
}
