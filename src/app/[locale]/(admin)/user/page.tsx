'use client';
import AppPagination from '@/components/pagination';
import { defaulFilterUserParams } from '@/constants';
import { TYPE_MODAL_USER } from '@/enums';
import { useFilter } from '@/hooks/useFilter';
import { useModalStore } from '@/hooks/useModal';
import UserHeader from '@/modules/user/components/user-header';
import UserModal from '@/modules/user/components/user-modal';
import UserTable from '@/modules/user/components/user-table';
import useGetUsers from '@/modules/user/hooks/useGetUsers';

export default function User() {
    const { dataFilter, onChangePage } = useFilter(defaulFilterUserParams);

    const { data, isFetching } = useGetUsers(dataFilter);

    const { typeModal } = useModalStore();

    return (
        <div className="w-full">
            <UserHeader />
            <UserTable
                dataSource={data.items}
                loading={isFetching}
                pagination={{
                    pageSize: dataFilter.pageSize,
                    current: dataFilter.page,
                }}
            />
            <AppPagination
                onChange={onChangePage}
                total={data.metadata.totalItems}
                pageSize={defaulFilterUserParams.pageSize}
                align="center"
            />

            {(typeModal === TYPE_MODAL_USER.UPDATE ||
                typeModal === TYPE_MODAL_USER.CREATE) && <UserModal />}
        </div>
    );
}
