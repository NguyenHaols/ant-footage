'use client';
import { formattedDate } from '@/lib/utils';
import { Table } from 'antd';
import { ColumnType } from 'antd/es/table';
import Image from 'next/image';
import { DataType, User } from '../types';

interface UserTableProps {
    data: User[];
    loading?: boolean;
}
export default function UserTable({ data, loading }: UserTableProps) {
    const columns: ColumnType<DataType>[] = [
        {
            title: 'No.',
            dataIndex: 'key',
            key: 'key',
            align: 'center',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Role',
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
            title: 'Active',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (value) => {
                return <span>{value ? 'Active' : 'Blocked'}</span>;
            },
            align: 'center',
            filters: [
                { text: 'Active', value: true },
                { text: 'Blocked', value: false },
            ],
            onFilter: (value, record) => record.isActive === value,
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
            align: 'center',
        },
        {
            title: 'Avatar',
            dataIndex: 'avatarUrl',
            key: 'avatarUrl',
            render: (value) =>
                value ? (
                    <div className="flex justify-center">
                        <Image
                            src={value}
                            alt="avatar"
                            className="h-10 w-10 rounded-full"
                            width={50}
                            height={50}
                        />
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <Image
                            src={'/logo128.png'}
                            alt="avatar"
                            className="h-10 w-10 rounded-full"
                            width={50}
                            height={50}
                        />
                    </div>
                ),
            align: 'center',
        },
        {
            title: 'Date Created',
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
    ];

    const dataTable = data.map((item, i) => ({
        key: i + 1,
        email: item.email,
        phoneNumber: item.phoneNumber,
        name: `${item.firstName} ${item.lastName}`,
        department: item.department,
        role: item.role,
        isActive: item.isActive,
        createdAt: item.createdAt,
        avatarUrl: item.avatarUrl,
    }));

    return (
        <div>
            <Table
                loading={loading}
                dataSource={dataTable}
                columns={columns}
                pagination={{
                    defaultPageSize: 5,
                    position: ['bottomCenter'],
                    showSizeChanger: true,
                    pageSizeOptions: [5, 10, 15, 20],
                }}
            />
        </div>
    );
}
