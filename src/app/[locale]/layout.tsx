import { ProgressBar } from '@/components/progressBar';
import { routing } from '@/i18n/routing';
import { configTheme } from '@/style/theme';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
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
import ReactQueryClientProvider from '../../../providers/QueryClientProvider';
import '../../style/globals.css';

const inter = Inter({ subsets: ['latin'], weight: ['400', '700', '900'] });

const boston = localFont({
    src: '../../fonts/Boston.otf',
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
        metadataBase: new URL('http://localhost:3000'),
        title: t('title'),
        description: t('description'),
        other: {
            currentYear: formatter.dateTime(now, { year: 'numeric' }),
            timeZone: timeZone || 'N/A',
        },
        icons: '/logo32.png',
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
            <body
                className={`${inter.className} ${boston.variable} antialiased`}
            >
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <AntdRegistry>
                        <ConfigProvider theme={configTheme}>
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
