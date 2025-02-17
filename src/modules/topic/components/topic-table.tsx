import SortableTable, {
    SortableTableProps,
} from '@/components/ui/table/sortableTable';
import { ColumnType } from 'antd/es/table';
import { Pencil, Trash } from 'lucide-react';
import { TopicData } from '../types';

type Props = {} & Omit<SortableTableProps<TopicData>, 'columns'>;

export default function TopicTable({ ...props }: Props) {
    const columns: ColumnType<TopicData>[] = [
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
            align: 'center',
        },
        {
            title: 'Description',
            dataIndex: 'decription',
            key: 'decription',
            align: 'center',
        },
        {
            title: 'Note',
            dataIndex: 'note',
            key: 'note',
            align: 'center',
        },
        {
            title: 'Date created',
            dataIndex: 'dateCreated',
            key: 'dateCreated',
            align: 'center',
        },
        {
            title: 'Date updated',
            dataIndex: 'dateUpdated',
            key: 'dateUpdated',
            align: 'center',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            align: 'center',
            width: 100,
            render: () => (
                <div className="flex justify-center gap-4">
                    <div>
                        <button className="rounded-full p-2 hover:bg-hoverBgColor">
                            <Pencil size={16} />
                        </button>
                    </div>

                    <div>
                        <button className="rounded-full p-2 text-red-500 hover:bg-red-100">
                            <Trash size={16} />
                        </button>
                    </div>
                </div>
            ),
        },
    ];

    // @ts-ignore
    const expandable: SortableTableProps<TopicData>['expendable'] = {
        expandedRowRender: (record: any) => (
            <div className="p-2">
                <SortableTable
                    className="rounded-lg border"
                    key={record.id.toString()}
                    {...props}
                    loading={false}
                    expandable={expandable}
                    dataSource={record.children as any[]}
                    pagination={false}
                    columns={columns}
                    showHeader={false}
                />
            </div>
        ),
        columnWidth: 40,
        rowExpandable: (record: any) => Number(record.children?.length) > 0,
    };

    return (
        <SortableTable
            key="main"
            {...props}
            pagination={false}
            columns={columns}
            expandable={expandable}
        />
    );
}
