import NextAuth, { Session } from 'next-auth';
import ZITADEL from '@auth/core/providers/zitadel';

export const {
    handlers: { GET, POST },
    auth,
} = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    trustHost: true,
    session: {
        strategy: 'jwt',
    },
    providers: [
        ZITADEL({
            clientId: process.env.ZITADEL_CLIENT_ID,
            issuer: process.env.ZITADEL_ISSUER,
            authorization: {
                params: {
                    scope: 'openid profile email urn:zitadel:iam:org:project:id:229389352298352392:aud',
                },
            },
            checks: ['pkce', 'state'],
            client: { token_endpoint_auth_method: 'none' },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (account) {
                token.accessToken = account.access_token;
                token.expiresAt = (account.expires_at ?? 0) * 1000;
            }

            if (user) {
                token.user = user;
            }
            return token;
        },
        // Next Auth Beta 5
        // https://github.com/nextauthjs/next-auth/issues/9633
        // eslint-disable-next-line
        session({ session, token }: { session: Session; token?: any }) {
            session.accessToken = token.accessToken;
            session.user = token.user;
            return session;
        },
    },
});
