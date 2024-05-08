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
import LoginButton from '@/src/components/login/login-button';
import { useRouter } from 'next/navigation';
import { User } from '@/src/models/user.model';

type NavigationProps = {
    user?: User;
};

export default function Navigation({ user }: NavigationProps) {
    const router = useRouter();
    return (
        <nav className="fixed top-0 z-30 hidden h-[80px] w-full items-center justify-around bg-primary-600 md:flex">
            <div className="mx-0 flex w-container flex-row justify-between">
                <section className="flex items-center">
                    <Link href={APP_ROUTES.HOME} data-testid="testHomeLink">
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
                                user
                                    ? getRoute(APP_ROUTES.USER, user.id)
                                    : getRoute(APP_ROUTES.LOGIN),
                            )
                        }
                        avatarSrc={user?.avatarUrl}
                        avatarAlt={`${user?.username} Profil öffnen`}
                        data-testid="testNaviUserButton"
                    />
                    <NaviButton
                        size={ButtonSize.L}
                        label={'Settings'}
                        Icon={IconSettingsAnimated}
                        disabled
                    />
                    <LoginButton isLoggedIn={!!user} navBar={true} testId="testLoginButton"/>
                </section>
            </div>
        </nav>
    );
}
