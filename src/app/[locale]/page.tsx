import { COOKIES_KEY, ROUTES } from '@/constants';
import { redirect } from 'next/navigation';
import Cookies from 'universal-cookie';

export default function Home() {
    const cookies = new Cookies();
    const value = cookies.get(COOKIES_KEY.TOKEN)?.value;
    // waiting token
    if (!value) {
        redirect(ROUTES.USER);
    } else {
        redirect(ROUTES.LOGIN);
    }
}
