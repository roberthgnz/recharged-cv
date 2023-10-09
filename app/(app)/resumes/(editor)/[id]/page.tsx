import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

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
        <div className="grid grid-cols-2 h-full mt-6">
          <CVForm defaultState={curriculum} />
          <CVEditorPreview />
        </div>
      </CVEditorScoreProvider>
    </CVEditorProvider>
  );
}
