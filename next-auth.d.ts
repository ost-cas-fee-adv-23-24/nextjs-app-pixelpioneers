import '@auth/core/jwt';
import '@auth/core/types';

declare module '@auth/core/types' {
    interface User {
        id: string;
        name: string;
        email: string;
        sub: string;
        image: string;
    }

    interface Session {
        user?: User;
        accessToken?: string;
    }
}

declare module '@auth/core/jwt' {
    interface JWT {
        accessToken?: string;
        expiresAt?: number;
    }
}
