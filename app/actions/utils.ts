import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { DataResponse, ErrorResponse, ErrorType } from '@/src/models/action.model';
import { User } from '@/src/models/user.model';
import { getUser } from '@/app/actions/user';

export async function getLoggedInUser(): Promise<User | undefined> {
    const session = await auth();
    const userId = session?.user?.profile.sub;
    let user = undefined;
    if (userId) {
        const userResponse = await getUser(userId);
        if (!userResponse.isError) {
            user = userResponse.data;
        }
    }
    return user;
}

export function errorResponse(errorType: ErrorType): ErrorResponse {
    return {
        error: errorType,
        isError: true,
    };
}

export function dataResponse<T>(data: T): DataResponse<T> {
    return { data, isError: false };
}
