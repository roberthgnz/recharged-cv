import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

import { api, auth } from '@/lib/infojobs';

import { getToken } from '@/services/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  const iJToken = await getToken((session.user as any).id);

  const cvs = await api.curriculum.list({
    token: iJToken?.accesToken as string
  });

  let dialogUrl = '';

  if (!iJToken) {
  }
  {
    dialogUrl = auth.generateAuthUrl({
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
  }

  return res.status(200).json({
    dialogUrl,
    isLinked: !!iJToken,
    list: Array.isArray(cvs) ? cvs : []
  });
}
