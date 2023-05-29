import prisma from '@/lib/prisma';
import { auth } from '@/lib/infojobs';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../[...nextauth]';

export default async function handler(req: any, res: any) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  const code = req.query.code;
  const token = (await auth.getAccessToken(code)) as any;

  if (token.error) {
    return res.status(400).json(token);
  }

  const expiresAt = new Date();

  try {
    await prisma.iJToken.create({
      data: {
        expiresAt: new Date(
          expiresAt.setSeconds(expiresAt.getSeconds() + token.expires_in)
        ),
        accesToken: token.access_token,
        refreshToken: token.refresh_token,
        // @ts-ignore
        userId: session.user.id
      }
    });

    return res.redirect('/resumes');
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
