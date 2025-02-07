import { defaultData } from '@/constants';
import { ListResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { userApi } from '../apis';
import { userQuerykeys } from '../constants';
import { User, UserParams } from '../types';

const useGetUsers = (params: UserParams) => {
    const { data, ...restReponse } = useQuery({
        queryKey: [...userQuerykeys.getList, params],
        queryFn: () => userApi.getUserList(params),
        placeholderData: (previousData) => previousData,
    });

    const result: ListResponse<User>['data'] = data?.data?.data ?? defaultData;
    return { data: result, ...restReponse };
};

export default useGetUsers;
