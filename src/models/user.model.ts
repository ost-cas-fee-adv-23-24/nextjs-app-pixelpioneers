export type User = {
    id: string;
    username: string;
    avatarUrl?: string;
    firstName: string;
    lastname: string;
};

export type PublicUser = Omit<User, 'firstname' | 'lastname'>;

export type UpdateUserData = Omit<User, 'id' | 'avatarUrl'>;
