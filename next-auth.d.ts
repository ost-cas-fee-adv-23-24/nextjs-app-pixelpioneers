import '@auth/core/jwt';
import '@auth/core/types';
import { User, Profile } from '@auth/core/types';

declare module '@auth/core/types' {
    interface User {
        id: string;
        name: string;
        email: string;
        profile: Profile;
    }

    interface Session {
        user?: User;
        accessToken?: string;
    }
}

declare module '@auth/core/jwt' {
    interface JWT {
        user?: User;
        accessToken?: string;
        expiresAt?: number;
    }
}
