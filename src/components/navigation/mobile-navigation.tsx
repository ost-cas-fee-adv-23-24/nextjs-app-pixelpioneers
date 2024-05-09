'use client';

import { IconMumble, NaviUser } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import { APP_ROUTES, getRoute } from '@/src/helpers/routes';
import Link from 'next/link';
import LoginButton from '@/src/components/login/login-button';
import { useRouter } from 'next/navigation';
import { User } from '@/src/models/user.model';

type MobileNavigationProps = {
    user?: User;
};

export default function MobileNavigation({ user }: MobileNavigationProps) {
    const router = useRouter();
    return (
        <div className="fixed bottom-0 z-30 w-full md:hidden">
            <nav className="flex bg-primary-600">
                <section className="mx-m flex h-[70px] w-full flex-row items-center justify-between">
                    <div className="flex w-7xl justify-start">
                        <LoginButton isLoggedIn={!!user} navBar={true} />
                    </div>
                    <div className="self-end rounded-full border-8 border-primary-600">
                        <Link href={APP_ROUTES.HOME}>
                            <div className="flex h-[80px] w-[80px] flex-wrap content-center justify-center rounded-full border-4 border-white bg-primary-600">
                                <IconMumble className="h-[42px] w-[42px] fill-white" />
                            </div>
                        </Link>
                    </div>
                    <div className="flex w-7xl justify-end">
                        <NaviUser
                            onClick={() =>
                                router.push(
                                    user
                                        ? getRoute(APP_ROUTES.USER, user.id)
                                        : getRoute(APP_ROUTES.LOGIN),
                                )
                            }
                            avatarSrc={user?.avatarUrl}
                            avatarAlt={`${user?.username} Profil öffnen`}
                        />
                    </div>
                </section>
            </nav>
        </div>
    );
}
