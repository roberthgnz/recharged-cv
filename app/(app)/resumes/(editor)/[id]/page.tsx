import { api } from '@/lib/infojobs';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

import prisma from '@/lib/prisma';

import { Grid } from '@tremor/react';

import { getStudy, getStudyDetails } from '@/utils/dictionary';

import { CVEditorProvider } from '@/cv-editor';
import { CVEditorScoreProvider } from '@/cv-editor-score';

import { CVForm } from '@/components/CVForm';
import { CVEditorPreview } from '@/components/CVEditorPreview';

export default async function Page({ params }: any) {
  const session = await getServerSession(authOptions);

  const infojosToken = await prisma.iJToken.findFirst({
    where: {
      // @ts-ignore
      userId: session?.user.id
    }
  });

  const curriculum = await api.curriculum.get({
    token: infojosToken?.accesToken as string,
    curriculumId: params.id
  });

  curriculum.skills = await api.curriculum.details.skill({
    token: infojosToken?.accesToken as string,
    curriculumId: params.id
  });

  curriculum.experience = await api.curriculum.details.experience({
    token: infojosToken?.accesToken as string,
    curriculumId: params.id
  });

  if (!curriculum.education?.education) {
    curriculum.education.education = [];
  } else {
    curriculum.education.education = await Promise.all(
      curriculum.education.education.map(async (education: any) => {
        const study = await getStudy(education.educationLevelCode);
        const studyDetails = await getStudyDetails(education.courseCode);

        return {
          ...education,
          educationLevel: study?.value,
          courseName: studyDetails?.value
        };
      })
    );
  }

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
