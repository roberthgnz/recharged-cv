import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import { getToken } from '@/services/db';
import { api, auth } from '@/lib/infojobs';

import { Dashboard } from '@/components/Dashboard';

export default async function Resumes() {
  const session = await getServerSession(authOptions);

  if (!session) return redirect('/login');

  const dialogUrl = auth.generateAuthUrl({
    scope: [
      'CV',
      'CANDIDATE_READ_CURRICULUM_PERSONAL_DATA',
      'CANDIDATE_EDIT_CURRICULUM_PERSONAL_DATA',
      'CANDIDATE_READ_CURRICULUM_EDUCATION',
      'CANDIDATE_EDIT_CURRICULUM_EDUCATION',
      'CANDIDATE_READ_CURRICULUM_EXPERIENCE',
      'CANDIDATE_EDIT_CURRICULUM_EXPERIENCE',
      'CANDIDATE_READ_CURRICULUM_SKILLS',
      'CANDIDATE_EDIT_CURRICULUM_FUTURE_JOB'
    ],
    responseType: 'code'
  });

  const iJToken = await getToken((session.user as any).id);

  const cvs = await api.curriculum.list({
    token: iJToken?.accesToken as string
  });

  const props = {
    dialogUrl,
    isLinked: !!iJToken,
    cvs: Array.isArray(cvs) ? cvs : []
  };

  return <Dashboard {...props} />;
}
