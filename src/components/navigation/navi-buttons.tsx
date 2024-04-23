'use client';
import {
    ButtonSize,
    IconSettingsAnimated,
    NaviButton,
    NaviUser,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import LoginButton from '@/src/components/login/login-button';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import { APP_ROUTES, getRoute } from '@/src/helpers/routes';

type NaviButtonsProps = { session: Session | null };

export default function NaviButtons({ session }: NaviButtonsProps) {
    const router = useRouter();
    const userId = session?.user?.profile.sub;
    return (
        <section className="flex flex-row items-center gap-s">
            <NaviUser
                onClick={() => userId && router.push(getRoute(APP_ROUTES.USER, userId))}
                avatarSrc={session?.user?.image || ''}
                avatarAlt={session?.user?.name || ''}
            />
            <NaviButton size={ButtonSize.L} label={'Settings'} Icon={IconSettingsAnimated} />
            <LoginButton session={session} navBar={true} />
        </section>
    );
}
