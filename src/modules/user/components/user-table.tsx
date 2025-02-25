'use client';
import { TYPE_MODAL_USER } from '@/enums';
import { getIndex } from '@/helpers/common';
import { useModalStore } from '@/hooks/useModal';
import { formattedDate } from '@/lib/utils';
import { Avatar, Table, Tag } from 'antd';
import { ColumnType, TablePaginationConfig, TableProps } from 'antd/es/table';
import { Pencil } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { User } from '../types';

interface UserTableProps extends Omit<TableProps<User>, 'columns'> {}

export default function UserTable({ ...props }: UserTableProps) {
    const message = useTranslations();
    const { openModal } = useModalStore();

    const handleOpenModal = (value: User) => {
        openModal(TYPE_MODAL_USER.UPDATE, value);
    };

    const columns: ColumnType<User>[] = [
        {
            title: 'No.',
            dataIndex: '',
            key: 'key',
            align: 'center',

            render: (text, record, index) =>
                getIndex(
                    (props.pagination as TablePaginationConfig)?.pageSize,
                    (props.pagination as TablePaginationConfig)?.current,
                    index
                ),
        },
        {
            title: message('common.avatar'),
            dataIndex: 'avatarUrl',
            key: 'avatarUrl',
            render: (value, record) => (
                <div className="flex justify-center">
                    <Avatar
                        src={value}
                        alt="avatar"
                        className="h-10 w-10 rounded-full"
                    >
                        {record.firstName.split('')[0]}
                    </Avatar>
                </div>
            ),
            align: 'center',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: message('common.phoneNumber'),
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: message('common.name'),
            dataIndex: 'firstName',
            key: 'name',
        },
        {
            title: message('common.role'),
            dataIndex: 'role',
            key: 'role',
            align: 'center',
            filters: [
                { text: 'Admin', value: 'Admin' },
                { text: 'User', value: 'User' },
                { text: 'staff', value: 'staff' },
            ],
            onFilter: (value, record) => record.role === value,
        },
        {
            title: message('status.active'),
            dataIndex: 'status',
            key: 'status',
            render: (value) => {
                return (
                    <Tag color={value === true ? 'green' : 'red'}>
                        {value === true ? 'Active' : 'Blocked'}
                    </Tag>
                );
            },
            align: 'center',
            filters: [
                { text: 'Active', value: true },
                { text: 'Blocked', value: false },
            ],
            onFilter: (value, record) => record.isActive === value,
        },
        {
            title: message('common.department'),
            dataIndex: 'department',
            key: 'department',
            align: 'center',
        },

        {
            title: message('common.dateCreated'),
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (value) => {
                return <span>{formattedDate(value)}</span>;
            },
            sorter: (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime(),
            align: 'center',
        },
        {
            title: message('common.action'),
            dataIndex: '',
            key: 'action',
            align: 'center',
            render: (value) => (
                <div>
                    <button
                        onClick={() => {
                            handleOpenModal(value);
                        }}
                        className="rounded-full p-2 hover:bg-hoverBgColor"
                    >
                        <Pencil size={16} />
                    </button>
                </div>
            ),
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
