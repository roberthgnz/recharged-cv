import { Edit } from 'lucide-react';

import { formatDate } from '@/utils/date';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const StudyCard = ({
  id,
  educationLevel,
  courseName,
  institutionName,
  startingDate,
  finishingDate,
  stillEnrolled,
  onEdit
}: any) => {
  return (
    <div className="p-4 border rounded-md">
      <div className="flex items-center justify-between">
        <Badge>{educationLevel}</Badge>
        <Button variant="secondary" onClick={() => onEdit(id)}>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </div>
      <h2 className="my-1 font-bold">{courseName}</h2>
      {institutionName && <span className="text-xs">{institutionName}</span>}
      <span className="text-xs">
        {formatDate(startingDate)} -{' '}
        {stillEnrolled ? 'Present' : formatDate(finishingDate)}
      </span>
    </div>
  );
};
