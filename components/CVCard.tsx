"use client"
import { useRouter } from 'next/navigation';
import { Card, Title, Text, Legend } from '@tremor/react';

import { InfoJobsLogo } from './InfoJobsLogo';

type CV = {
  id: number;
  code: string;
  name: string;
  completed: boolean;
  principal: boolean;
  incompleteSteps: string[];
};

export const CVCard = ({ code, name, completed }: CV) => {
  const router = useRouter();

  const legendText = completed ? 'Completed' : 'Incomplete';
  const legendColor = completed ? 'green' : 'red';

  return (
    <Card
      className="h-full flex flex-col justify-between cursor-pointer hover:shadow-sm hover:opacity-75 transition"
      onClick={() => router.push(`/resumes/${code}`)}
    >
      <div className="flex mb-6 items-center justify-between">
        <Title>{name}</Title>
        <Legend categories={[legendText]} colors={[legendColor]} />
      </div>
      <Text className="flex items-end text-xs">
        Imported from <InfoJobsLogo width={100} height={20} />
      </Text>
    </Card>
  );
};
