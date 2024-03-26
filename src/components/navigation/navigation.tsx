import { LogoMumbleHorizontal } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { APP_ROUTES } from '@/src/helpers/routes';
import Link from 'next/link';
import NaviButtons from '@/src/components/navigation/navi-buttons';

export default async function Navigation() {
    // TODO: is this the best way, calling session in every component?
    const session = await auth();
    return (
        <nav className="flex h-[80px] w-full items-center justify-around bg-primary-600 md:content-center">
            <div className="flex w-[680px] flex-row justify-between">
                <section className="flex items-center">
                    <Link href={APP_ROUTES.MAIN}>
                        <LogoMumbleHorizontal
                            titleClasses="fill-white"
                            iconClasses="fill-white"
                            sizeWidth="235"
                            sizeHeight="34"
                            className="hidden md:ml-[-24px] md:flex"
                        />
                    </Link>
                </section>
                <NaviButtons session={session} />
            </div>
        </nav>
    );
}
