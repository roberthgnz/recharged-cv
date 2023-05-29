import { Badge, Text, Subtitle, Button } from '@tremor/react';
import { Edit } from 'lucide-react';

import { formatDate } from '@/utils/date';

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
        <Badge size="xs">{educationLevel}</Badge>
        <Button
          size="xs"
          variant="light"
          icon={Edit}
          onClick={() => onEdit(id)}
        >
          Edit
        </Button>
      </div>
      <Subtitle className="my-1 font-bold">{courseName}</Subtitle>
      {institutionName && <Text className="text-xs">{institutionName}</Text>}
      <Text className="text-xs">
        {formatDate(startingDate)} -{' '}
        {stillEnrolled ? 'Present' : formatDate(finishingDate)}
      </Text>
    </div>
  );
};
