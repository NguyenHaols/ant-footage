import { LOCALE } from '@/enums';

export function formattedNumber(
    value: number | string | null | undefined,
    lang: LOCALE = LOCALE.EN,
    collapse: boolean = false
) {
    const localeArg = lang === LOCALE.VI ? 'en-US' : 'en-US';
    // const localeArg = lang === LOCALE.VI ? 'vi-VN' : 'en-US';
    const number = value ? Number(value) : 0;
    const option: Intl.NumberFormatOptions | undefined = {
        notation: collapse ? 'compact' : undefined,
        maximumFractionDigits: 2,
    };
    return new Intl.NumberFormat(localeArg, option).format(number);
}
