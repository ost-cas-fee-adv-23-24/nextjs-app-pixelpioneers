import ZITADEL from '@auth/core/providers/zitadel';
import NextAuth from 'next-auth';

export const {
    handlers: { GET, POST },
    auth,
} = NextAuth({
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
        session({ session, token }) {
            session.accessToken = token.accessToken;
            session.user = token.user;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});
