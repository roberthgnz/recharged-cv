import prisma from '@/lib/prisma';
import { auth } from '@/lib/infojobs';

export const getToken = async (userId: string) => {
  const infojosToken = await prisma.iJToken.findFirst({
    where: {
      // @ts-ignore
      userId
    }
  });

  if (!infojosToken) {
    return null;
  }

  const isTokenValid = new Date(infojosToken.expiresAt) > new Date();

  if (!isTokenValid) {
    const token = (await auth.refreshAccessToken(
      infojosToken.refreshToken
    )) as any;

    const expiresAt = new Date();

    return prisma.iJToken.update({
      where: {
        // @ts-ignore
        userId
      },
      data: {
        expiresAt: new Date(
          expiresAt.setSeconds(expiresAt.getSeconds() + token.expires_in)
        ),
        accesToken: token.access_token,
        refreshToken: token.refresh_token
      }
    });
  }

  return infojosToken;
};
