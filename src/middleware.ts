import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { COOKIES_KEY, ROUTES } from './constants';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export async function middleware(req: NextRequest) {
    const cookieToken = req.cookies.get(COOKIES_KEY.TOKEN)?.value;
    const locale = req.nextUrl.locale || 'vi';
    const currentPath = req.nextUrl.pathname;

    // Nếu người dùng đã đăng nhập và đang ở trang login có tiền tố locale (ví dụ: /vi/login)
    if (cookieToken && currentPath === `/${locale}${ROUTES.LOGIN}`) {
        const url = req.nextUrl.clone();
        url.pathname = `/${locale}${ROUTES.USER}`;
        return NextResponse.redirect(url);
    }

    // Nếu người dùng chưa đăng nhập và không ở trang login (để tránh loop khi đã ở trang login)
    if (!cookieToken && currentPath !== `/${locale}${ROUTES.LOGIN}`) {
        const url = req.nextUrl.clone();
        url.pathname = `/${locale}${ROUTES.LOGIN}`;
        return NextResponse.redirect(url);
    }
}

export const config = {
    // Match only internationalized pathnames
    matcher: ['/((?!api|_next|.*\\..*).*)'],
};
