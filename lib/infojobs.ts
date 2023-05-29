import * as infojobs from 'infojobs-api-library';

const authOptions = {
  clientId: process.env.INFOJOBS_CLIENT_ID!,
  clientSecret: process.env.INFOJOBS_CLIENT_SECRET!,
  redirectUri: process.env.INFOJOBS_REDIRECT_URI!
};

export const api = infojobs.api(authOptions);
export const auth = new infojobs.auth(authOptions);
