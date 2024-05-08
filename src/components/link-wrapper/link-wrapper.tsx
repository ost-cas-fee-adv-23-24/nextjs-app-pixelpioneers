import { ReactNode } from 'react';
import Link from 'next/link';

type LinkWrapperProps = {
    enabled: boolean;
    route: string;
    children: ReactNode;
};

export default function LinkWrapper({ enabled, route, children }: LinkWrapperProps) {
    return enabled ? <Link href={route}>{children}</Link> : <>{children}</>;
}
