import { redirect } from 'next/navigation';
import { APP_ROUTES, getRoute } from '@/src/helpers/routes';

export function redirectToLogin() {
    redirect(getRoute(APP_ROUTES.LOGIN));
}
