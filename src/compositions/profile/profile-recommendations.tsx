import { MessageDisplayVariant, MessageVariant } from '@/src/compositions/message/types';
import MessageForm from '@/src/components/message-form/message-form';
import { createPost } from '@/app/actions/message';
import { Heading, HeadingLevel } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import { getProfileRecommendations } from '@/app/actions/profile';
import StatedMessageContainer from '@/src/compositions/message/stated-message-container';
import User from '@/src/compositions/user/user';

type ProfileRecommendationsProps = {
    userId: string;
};

export default async function ProfileRecommendations({ userId }: ProfileRecommendationsProps) {
    const recommendationsResponse = await getProfileRecommendations(userId);
    if (recommendationsResponse.isError) {
        return (
            <section className="flex flex-col gap-s">
                <MessageForm messageVariant={MessageVariant.POST} onCreate={createPost} />
            </section>
        );
    }
    const { users, paginatedPosts } = recommendationsResponse.data;
    return (
        <section className="flex flex-col gap-s">
            <MessageForm messageVariant={MessageVariant.POST} onCreate={createPost} />
            <div className="mx-m flex flex-col gap-s md:mx-0">
                <Heading className="text-secondary-600" variant={HeadingLevel.H3}>
                    Empfohlene User
                </Heading>
                <div className="grid grid-cols-2 gap-s md:grid-cols-3">
                    {users.map((user) => (
                        <User key={user.id} user={user} />
                    ))}
                </div>
                <Heading className="text-secondary-600" variant={HeadingLevel.H3}>
                    Empfohlene Mumbles
                </Heading>
            </div>
            <StatedMessageContainer
                paginatedMessages={paginatedPosts}
                displayVariant={MessageDisplayVariant.TIMELINE}
            />
        </section>
    );
}
