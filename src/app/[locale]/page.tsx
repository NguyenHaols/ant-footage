import { ROUTES } from '@/constants';
import { redirect } from '@/i18n/routing';
import { useLocale } from 'next-intl';

export default function Home() {
    const locale = useLocale();

    redirect({
        href: `${ROUTES.ORDER}`,
        locale,
    });
}
