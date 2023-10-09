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
        <div className="grid grid-cols- 2 h-full mt-6">
          <CVForm defaultState={defaultState} />
          <CVEditorPreview />
        </div>
      </CVEditorScoreProvider>
    </CVEditorProvider>
  );
}
