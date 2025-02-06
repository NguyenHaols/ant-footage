import { Select } from 'antd';

interface userSelectFilterProps {
    value: string;
}
export default function UserSelectFilter({}: userSelectFilterProps) {
    // const { onChangeFilter } = useFilter(defaultFilterParams);
    const items = [
        {
            label: (
                <p className="flex items-center justify-start gap-2">Blocked</p>
            ),
            value: '2',
        },
        {
            label: (
                <p className="flex items-center justify-start gap-2">Active</p>
            ),
            value: '1',
        },
    ];
    return (
        <div>
            <Select style={{ width: 150 }} options={items} />
        </div>
    );
}
