import { Text, Subtitle, Button } from '@tremor/react';
import { Edit } from 'lucide-react';

import { formatDate } from '@/utils/date';

export const ExperienceCard = ({
  id,
  job,
  company,
  startingDate,
  finishingDate,
  onCourse,
  onEdit
}: any) => {
  return (
    <div className="p-4 border rounded-md">
      <div className="flex items-center justify-between">
        <Subtitle className="my-1 font-bold">{job}</Subtitle>{' '}
        <Button
          size="xs"
          variant="light"
          icon={Edit}
          onClick={() => onEdit(id)}
        >
          Edit
        </Button>
      </div>
      {company && <Text className="text-xs">{company}</Text>}
      <Text className="text-xs">
        {formatDate(startingDate)} -{' '}
        {onCourse ? 'Present' : formatDate(finishingDate)}
      </Text>
    </div>
  );
};
