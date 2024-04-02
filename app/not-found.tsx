'use client';

import { IconArrowRight } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import ErrorPage from '@/src/compositions/error-page/error-page';
import { useRouter } from 'next/navigation';

export default function NotFound() {
    const router = useRouter();
    return (
        <ErrorPage
            errorMessage="Wir konnten die aufgesuchte Seite nicht finden."
            buttonIcon={IconArrowRight}
            buttonLabel={'Zur Startseite'}
            onButtonClick={() => router.push('/')}
        />
    );
}
