import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

import { Grid } from '@tremor/react';

import { CVEditorProvider } from '@/cv-editor';
import { CVEditorScoreProvider } from '@/cv-editor-score';

import { CVForm } from '@/components/CVForm';
import { CVEditorPreview } from '@/components/CVEditorPreview';

export default async function Page({ params }: any) {
  const session = await getServerSession(authOptions);

  const curriculum = {
    personaldata: {},
    futurejob: {},
    experience: {
      experience: []
    },
    education: {
      education: []
    },
    skills: {
      expertise: [],
      language: []
    }
  };

  return (
    <CVEditorProvider>
      <CVEditorScoreProvider>
        <Grid className="h-full mt-6" numCols={2}>
          <CVForm defaultState={curriculum} />
          <CVEditorPreview />
        </Grid>
      </CVEditorScoreProvider>
    </CVEditorProvider>
  );
}
