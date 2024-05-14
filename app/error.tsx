'use client';

import { IconRepost } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import ErrorPage from '@/src/compositions/error-page/error-page';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <ErrorPage
            errorMessage={error.message}
            buttonIcon={IconRepost}
            buttonLabel={'Neu laden'}
            onButtonClick={reset}
        />
    );
}
