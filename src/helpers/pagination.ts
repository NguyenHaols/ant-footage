import { LOCALE } from '@/enums';
import { formattedNumber } from './number';

export const getTotalText = (
    total: number,
    range: [number, number],
    locale: LOCALE
) => {
    const offset = formattedNumber(range[0]);
    const limit = formattedNumber(range[1]);
    const totalItems = formattedNumber(total);

    if (locale === LOCALE.VI) {
        return `${offset}-${limit} trong tổng ${totalItems}`;
    }

    return `${offset}-${limit} of ${totalItems} items`;
};
