export type PublicUser = {
    id: string;
    username: string;
    avatarUrl?: string;
};

export type User = PublicUser & {
    firstName: string;
    lastname: string;
};

export type UpdateUserData = User & {
    username: string;
};
