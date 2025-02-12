import { LOCALE } from '@/enums';
import { usePathname, useRouter } from '@/i18n/routing';
import { Select } from 'antd';
import { useLocale } from 'next-intl';
import Image from 'next/image';

export default function LanguageSelect() {
    const locale = useLocale();
    console.log('🚀 ~ LanguageSelect ~ locale:', locale);
    const router = useRouter();
    const pathname = usePathname();
    const handleChange = (newLocale: string) => {
        if (newLocale !== locale) {
            router.replace(pathname, { locale: newLocale });
        }
    };

    const items = [
        {
            label: (
                <p className="flex items-center justify-start gap-2">
                    <Image
                        height={15}
                        width={30}
                        src={'/united-states.png'}
                        alt="img"
                    />
                    English
                </p>
            ),
            value: LOCALE.EN,
        },
        {
            label: (
                <p className="flex items-center justify-start gap-2">
                    <Image
                        height={15}
                        width={30}
                        src={'/vietnam.png'}
                        alt="img"
                    />
                    Việt Nam
                </p>
            ),
            value: LOCALE.VI,
        },
    ];
    return (
        <Select
            style={{ width: 150 }}
            options={items}
            defaultValue={locale}
            onChange={handleChange}
        />
    );
}
