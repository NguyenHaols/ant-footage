import { SCREEN } from '@/enums';
import { Table, TableProps } from 'antd';

export type AppTableProps<RecordType> = {} & TableProps<RecordType>;

const AppTable = <RecordType extends object>({
    scroll,
    ...props
}: AppTableProps<RecordType>) => {
    return (
        <Table
            // @ts-ignore
            rowKey={(record) => record?.id ?? Math.random()}
            size="small"
            pagination={false}
            {...props}
            scroll={{
                x: SCREEN.XL,
                ...scroll,
            }}
            childrenColumnName="child"
        />
    );
};

export default AppTable;
