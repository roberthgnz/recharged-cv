import Link from 'next/link';
import { Card, Grid } from '@tremor/react';

import { CVCard } from './CVCard';
import { PlusIcon } from '@heroicons/react/24/outline';

type CV = {
  id: number;
  code: string;
  name: string;
  completed: boolean;
  principal: boolean;
  incompleteSteps: string[];
};

export const Dashboard = ({
  dialogUrl,
  cvs
}: {
  dialogUrl: string;
  cvs: CV[];
}) => {
  return (
    <Grid numColsMd={2} numColsLg={3} className="gap-6 mt-6">
      {cvs.map((cv) => (
        <CVCard key={cv.id} {...cv} />
      ))}
      <Card className="flex items-center justify-center text-blue-500 p-0 border-2 border-dotted ring-0 shadow-none">
        <Link
          href="/resumes/create"
          className="flex items-center justify-center w-full h-full p-6"
        >
          <PlusIcon className="w-5 h-5 mr-3" />
          CREATE NEW RESUME
        </Link>
      </Card>
    </Grid>
  );
};
