import { LogoMumbleHorizontal } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import { APP_ROUTES } from '@/src/helpers/routes';
import Link from 'next/link';

export default async function MobileHeader() {
    // TODO: settings button
    return (
        <div className="fixed top-0 z-30 h-[50px] w-full bg-primary-600 md:hidden">
            <div className="relative flex">
                <Link href={APP_ROUTES.HOME}>
                    <LogoMumbleHorizontal className="m-[10px] fill-white " sizeHeight="30" />
                </Link>
            </div>
        </div>
    );
}
