import { LOCALE } from '@/enums';
import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: [LOCALE.EN, LOCALE.VI],
    defaultLocale: LOCALE.EN,
    localeCookie:
        process.env.NEXT_PUBLIC_USE_CASE === 'locale-cookie-false'
            ? false
            : {
                  // 200 days
                  maxAge: 200 * 24 * 60 * 60,
              },
});

// export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { Link, getPathname, redirect, usePathname, useRouter } =
    createNavigation(routing);
