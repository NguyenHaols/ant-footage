import { OnSearchType } from '@/hooks/useFilter';
import { Input } from 'antd';
import _ from 'lodash';
import { useCallback, useEffect } from 'react';
import { useTranslations } from 'use-intl';

type Props = {
    value: string | undefined;
    onChange?: OnSearchType;
    delay?: number;
};

export default function AppSearch({
    value,
    onChange = () => {},
    delay = 300,
}: Props) {
    const messages = useTranslations();

    const debounceSearchChange = 
        _.debounce((e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e);
        }, delay)
    ;

    useEffect(() => {
        return () => {
            debounceSearchChange.cancel();
        };
    }, [debounceSearchChange]);

    return (
        <Input
            placeholder={messages('placeholders.enterSearch')}
            defaultValue={value}
            onChange={(e) => debounceSearchChange(e)}
            allowClear
            style={{ width: '200px' }}
        />
    );
}
