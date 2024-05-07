'use client';
import {
    ButtonSize,
    IconSettingsAnimated,
    LogoMumbleHorizontal,
    NaviButton,
    NaviUser,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import { APP_ROUTES, getRoute } from '@/src/helpers/routes';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import LoginButton from '@/src/components/login/login-button';
import { useRouter } from 'next/navigation';

export default function Navigation() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const userId = session?.user?.profile.sub;
    return (
        <nav className="fixed top-0 z-30 hidden h-[80px] w-full items-center justify-around bg-primary-600 md:flex">
            <div className="mx-0 flex w-container flex-row justify-between">
                <section className="flex items-center">
                    <Link href={APP_ROUTES.HOME}>
                        <LogoMumbleHorizontal
                            titleClasses="fill-white"
                            iconClasses="fill-white"
                            sizeWidth="235"
                            sizeHeight="34"
                            className="ml-[-24px] flex"
                        />
                    </Link>
                </section>
                <section className="flex flex-row items-center gap-s">
                    <NaviUser
                        onClick={() =>
                            router.push(
                                userId
                                    ? getRoute(APP_ROUTES.USER, userId)
                                    : getRoute(APP_ROUTES.LOGIN),
                            )
                        }
                        avatarSrc={session?.user?.image || ''}
                        avatarAlt={session?.user?.name || ''}
                    />
                    <NaviButton
                        size={ButtonSize.L}
                        label={'Settings'}
                        Icon={IconSettingsAnimated}
                        disabled
                    />
                    <LoginButton isLoggedIn={status === 'authenticated'} navBar={true} />
                </section>
            </div>
        </nav>
    );
}
