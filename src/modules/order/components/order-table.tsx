import { formattedDateOnly, getIndex } from '@/helpers/common';
import { useModalStore } from '@/hooks/useModal';
import { Table, TableProps } from 'antd';
import { ColumnType, TablePaginationConfig } from 'antd/es/table';
import { Eye, Pencil, Trash, Upload } from 'lucide-react';
import { TYPE_MODAL_ORDER } from '../enums';
import { Order } from '../types';

interface OrderTableProps extends Omit<TableProps<Order>, 'columns'> {}

export default function OrderTable({ ...props }: OrderTableProps) {
    const { openModal } = useModalStore();

    const columns: ColumnType<Order>[] = [
        {
            title: 'No.',
            dataIndex: '',
            key: 'key',
            align: 'center',
            width: 100,
            render: (text, record, index) =>
                getIndex(
                    (props.pagination as TablePaginationConfig)?.pageSize,
                    (props.pagination as TablePaginationConfig)?.current,
                    index
                ),
        },
        {
            title: 'Order Name',
            dataIndex: 'orderName',
            key: 'orderName',
            align: 'center',
        },
        {
            title: 'Product type',
            dataIndex: 'productType',
            key: 'productType',
            align: 'center',
        },
        {
            title: 'Created at',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: 'center',
            render: (value) => formattedDateOnly(value),
        },
        // {
        //     title: 'Resource',
        //     dataIndex: 'resourceUrl',
        //     key: 'resourceUrl',
        //     align: 'center',
        //     render: (value, record) => (
        //         <div className="flex justify-center">
        //             <Avatar
        //                 src={value}
        //                 alt="avatar"
        //                 className="h-10 w-10 rounded-full"
        //             >
        //                 {record.orderName.split('')[0]}
        //             </Avatar>
        //         </div>
        //     ),
        // },

        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            align: 'center',
            render: (value) => (
                <div className="flex justify-center gap-4">
                    <div>
                        <button
                            onClick={() => {
                                openModal(TYPE_MODAL_ORDER.DETAIL, value);
                            }}
                            className="rounded-full p-2 hover:bg-hoverBgColor"
                        >
                            <Eye size={16} />
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                openModal(TYPE_MODAL_ORDER.UPDATE, value);
                            }}
                            className="rounded-full p-2 hover:bg-hoverBgColor"
                        >
                            <Pencil size={16} />
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                openModal(TYPE_MODAL_ORDER.UPLOAD, value);
                            }}
                            className="rounded-full p-2 hover:bg-hoverBgColor"
                        >
                            <Upload size={16} />
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                openModal(TYPE_MODAL_ORDER.DELETE, value);
                            }}
                            className="rounded-full p-2 hover:bg-red-100 hover:text-red-500"
                        >
                            <Trash size={16} />
                        </button>
                    </div>
                </div>
            ),
            width: 350,
        },
    ];

    return (
        <div>
            <Table
                {...props}
                rowKey={(record) => record?.id ?? Math.random()}
                columns={columns}
                pagination={false}
            />
        </div>
    );
}
