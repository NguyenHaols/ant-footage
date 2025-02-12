import { defaultData } from '@/constants';
import { ListResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { orderApi } from '../apis';
import { orderQuerykeys } from '../constants';
import { Order, OrderParams } from '../types';

export const useGetOrders = (params: OrderParams) => {
    const { data, ...restReponse } = useQuery({
        queryKey: [...orderQuerykeys.getList, params],
        queryFn: () => orderApi.getOrderList(params),
        placeholderData: (previousData) => previousData,
    });

    const result: ListResponse<Order>['data'] = data?.data?.data ?? defaultData;
    return { data: result, ...restReponse };
};
