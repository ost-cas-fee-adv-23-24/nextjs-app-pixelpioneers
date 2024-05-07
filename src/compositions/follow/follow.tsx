'use client';
import { User } from '@/src/models/user.model';
import {
    Button,
    ButtonSize,
    IconCancel,
    IconCheckmark,
    Label,
    LabelSize,
    LabelType,
    Variant,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import React, { useEffect, useReducer } from 'react';
import { getProfileFollowingStatus } from '@/app/actions/profile';
import { followUser } from '@/app/actions/user';
import { ActionResponse } from '@/src/models/action.model';
import FollowSkeleton from '@/src/compositions/follow/follow-skeleton';
import { followReducer } from '@/src/compositions/follow/follow-reducer';
import { FollowActionType } from '@/src/compositions/follow/types';
import ErrorPage from '../error-page/error-page';

type FollowProps = {
    user: User;
};
export default function Follow({ user }: FollowProps) {
    const [state, dispatch] = useReducer(followReducer, {
        isLoading: true,
        isFollowing: false,
        isSubmittingFollow: false,
    });

    useEffect(() => {
        if (!state.isSubmittingFollow) {
            const loadFollowingInfo = async (): Promise<boolean> => {
                const isFollowingResponse = await getProfileFollowingStatus(user.id);
                if (isFollowingResponse.isError) {
                    dispatch({
                        type: FollowActionType.ERROR,
                        error: isFollowingResponse.error,
                    });
                    return false;
                }
                return isFollowingResponse.data.isFollowing;
            };
            loadFollowingInfo().then((following) =>
                dispatch({ type: FollowActionType.FOLLOWEES_LOADED, isFollowing: following }),
            );
        }
    }, [state.isSubmittingFollow, user]);

    const name = user.firstname ? `${user.firstname} ${user.lastname}` : user.username;

    return state.error ? (
        <ErrorPage
            errorMessage={state.error}
            errorTitle={'Folgen-Status konnte nicht geladen werden.'}
            fullPage={false}
        />
    ) : state.isLoading ? (
        <FollowSkeleton />
    ) : (
        <div className="flex flex-row items-center gap-m">
            <Label type={LabelType.SPAN} size={LabelSize.M} className="text-secondary-400">
                {`Du folgst ${name} ${state.isFollowing ? '' : 'nicht'}`}
            </Label>
            <form
                action={async (formData) => {
                    dispatch({
                        type: FollowActionType.SUBMITTING_FOLLOW,
                        isFollowing: !state.isFollowing,
                    });

                    const followUserResponse = JSON.parse(
                        await followUser(formData),
                    ) as ActionResponse<undefined>;

                    if (followUserResponse.isError) {
                        dispatch({
                            type: FollowActionType.ERROR,
                            error: followUserResponse.error,
                        });
                    }

                    dispatch({ type: FollowActionType.SUBMITTED_FOLLOW });
                }}
            >
                <input name="userId" value={user.id} hidden readOnly />
                <input name="isFollowing" value={String(state.isFollowing)} hidden readOnly />
                <Button
                    type="submit"
                    Icon={state.isFollowing ? IconCancel : IconCheckmark}
                    size={ButtonSize.M}
                    variant={Variant.SECONDARY}
                    label={state.isFollowing ? 'Unfollow' : 'Follow'}
                />
            </form>
        </div>
    );
}
