import { UseFilterProps } from '@/hooks/useFilter';
import { Select, SelectProps } from 'antd';
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
    const items = [
        {
            label: (
                <p className="flex items-center justify-start gap-2">Blocked</p>
            ),
            value: 'false',
        },
        {
            label: (
                <p className="flex items-center justify-start gap-2">Active</p>
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
                placeholder={'Active'}
                allowClear
                onChange={handleChange}
                value={value || undefined}
            />
        </div>
    );
}
