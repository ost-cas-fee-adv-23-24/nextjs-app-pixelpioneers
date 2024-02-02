export type PublicUser = {
    id: string;
    username: string;
    avatarUrl?: string;
};

export type User = {
    id: string;
    username: string;
    avatarUrl?: string;
    firstName: string;
    lastname: string;
};

export type UpdateUserData = {
    firstname: string;
    lastname: string;
    username: string;
};
