import { useQuery } from '@tanstack/react-query';
import { userApi } from '../apis';
import { userQuerykeys } from '../constants';

const useUserList = () => {
    const { data, ...restReponse } = useQuery({
        queryKey: [...userQuerykeys.getList],
        queryFn: () => userApi.getUserList(),
        placeholderData: (previousData) => previousData,
    });

    const defaultData = data?.data || [];

    return { data: defaultData, ...restReponse };
};

export default useUserList;
