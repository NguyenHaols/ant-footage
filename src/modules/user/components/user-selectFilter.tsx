import { UseFilterProps } from '@/hooks/useFilter';
import { Select, SelectProps } from 'antd';
import { useTranslations } from 'next-intl';
import { UserParams } from '../types';

type UserSelectFilterProps = Pick<
    UseFilterProps<UserParams>,
    'onChangeFilter'
> &
    SelectProps & {};
export default function UserSelectFilter({
    value,
    onChangeFilter,
    ...props
}: UserSelectFilterProps) {
    const message = useTranslations();

    const items = [
        {
            label: (
                <p className="flex items-center justify-start gap-2">
                    {message('status.block')}
                </p>
            ),
            value: 'false',
        },
        {
            label: (
                <p className="flex items-center justify-start gap-2">
                    {message('status.active')}
                </p>
            ),
            value: 'true',
        },
    ];

    const handleChange = (value: string) => {
        if (value) {
            onChangeFilter({ status: value === 'true' ? 'true' : 'false' });
        } else {
            console.log('first');
            onChangeFilter({ status: '' });
        }
    };

    return (
        <div>
            <Select
                {...props}
                style={{ width: 150 }}
                options={items}
                placeholder={message('status.active')}
                allowClear
                onChange={handleChange}
                value={value || undefined}
            />
        </div>
    );
}
