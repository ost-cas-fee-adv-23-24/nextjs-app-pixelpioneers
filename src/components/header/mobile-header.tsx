import { LogoMumbleHorizontal } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import { APP_ROUTES } from '@/src/helpers/routes';
import Link from 'next/link';

export default async function MobileHeader() {
    // TODO: settings button
    return (
        <div className="absolute sticky top-0 z-50 h-[50px] bg-primary-600 md:hidden">
            <div className="flex">
                <Link href={APP_ROUTES.HOME}>
                    <LogoMumbleHorizontal className="m-[10px] fill-white " sizeHeight="30" />
                </Link>
            </div>
        </div>
    );
}
