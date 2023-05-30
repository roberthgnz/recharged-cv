import { Grid } from '@tremor/react';

import { CVEditorProvider } from '@/cv-editor';
import { CVEditorScoreProvider } from '@/cv-editor-score';

import { CVForm } from '@/components/CVForm';
import { CVEditorPreview } from '@/components/CVEditorPreview';

export default async function Page() {
  const defaultState = {
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
          <CVForm defaultState={defaultState} />
          <CVEditorPreview />
        </Grid>
      </CVEditorScoreProvider>
    </CVEditorProvider>
  );
}
