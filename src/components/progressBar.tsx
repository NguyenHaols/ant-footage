'use client';

import { AppProgressBar } from 'next-nprogress-bar';

export function ProgressBar() {
    return (
        <AppProgressBar
            options={{ showSpinner: false, speed: 400 }}
            shallowRouting
            color={'#25a9eb'}
        />
    );
}
