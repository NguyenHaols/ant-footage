import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: '**',
                pathname: '**',
            },
        ],
        minimumCacheTTL: 1500000,
    },
};

export default withNextIntl(nextConfig);
