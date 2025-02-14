import { ProgressBar } from '@/components/progressBar';
import { routing } from '@/i18n/routing';
import { configTheme } from '@/style/theme';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import en_US from 'antd/locale/en_US';
import vi_VN from 'antd/locale/vi_VN';
import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import {
    getFormatter,
    getMessages,
    getNow,
    getTimeZone,
    getTranslations,
} from 'next-intl/server';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { notFound } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';
import ReactQueryClientProvider from '../../providers/QueryClientProvider';
import '../../style/globals.css';
const inter = Inter({ subsets: ['latin'], weight: ['400', '700', '900'] });

const boston = localFont({
    src: '../../fonts/boston.otf',
    variable: '--font-boston',
});

interface RootLayoutProps extends PropsWithChildren {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({
    params,
}: Omit<RootLayoutProps, 'children'>): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'app' });
    const formatter = await getFormatter({ locale });
    const now = await getNow({ locale });
    const timeZone = await getTimeZone({ locale });

    return {
        metadataBase: new URL(process.env.url || 'http://localhost:3100'),
        title: t('title'),
        description: t('description'),
        other: {
            currentYear: formatter.dateTime(now, { year: 'numeric' }),
            timeZone: timeZone || 'N/A',
        },
        icons: '/logo128.png',
    };
}

export default async function RootLayout({
    children,
    params,
}: Readonly<RootLayoutProps>) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    const messages = await getMessages();
    return (
        <html lang={locale}>
            <head>
                <meta
                    http-equiv="Content-Security-Policy"
                    content="upgrade-insecure-requests"
                />
            </head>
            <body
                className={`${inter.className} ${boston.variable} antialiased`}
            >
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <AntdRegistry>
                        <ConfigProvider
                            locale={locale === 'vi' ? vi_VN : en_US}
                            theme={configTheme}
                        >
                            <ReactQueryClientProvider>
                                <ToastContainer />
                                {children}
                            </ReactQueryClientProvider>
                        </ConfigProvider>
                        <ProgressBar />
                    </AntdRegistry>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
