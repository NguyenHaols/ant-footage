import { COOKIES_KEY, ROUTES } from '@/constants';
import { useLocale } from 'next-intl';
import { redirect } from 'next/navigation';
import Cookies from 'universal-cookie';

export default function Home() {
    const cookies = new Cookies();
    const value = cookies.get(COOKIES_KEY.TOKEN)?.value;
    const locale = useLocale();
    if (value) {
        redirect(`/${locale}${ROUTES.USER}`);
    } else {
        redirect(`/${locale}${ROUTES.LOGIN}`);
    }
}
