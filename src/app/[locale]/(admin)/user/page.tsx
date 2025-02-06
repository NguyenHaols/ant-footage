'use client';
// import { defaultFilterParams } from '@/constants';
// import { useFilter } from '@/hooks/useFilter';
import UserHeader from '@/modules/user/components/userHeader';
import UserTable from '@/modules/user/components/userTable';
import useUserList from '@/modules/user/hooks/useGetUsers';

export default function User() {
    // const { dataFilter, onSearch } = useFilter(defaultFilterParams);
    // console.log('🚀 ~ User ~ dataFilter:', dataFilter);

    const { data, isFetching } = useUserList();

    return (
        <div className="w-full">
            <UserHeader />
            <UserTable data={data} loading={isFetching} />
        </div>
    );
}
