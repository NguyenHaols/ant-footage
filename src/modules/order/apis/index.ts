import axiosClient from '@/apiClient/axiosClient';
import { DataReponse, ListResponse } from '@/types';
import { Order, OrderParams } from '../types';

export const orderApi = {
    getOrderList: (params: OrderParams) => {
        return axiosClient.get<ListResponse<Order>>('/orders', { params });
    },

    updateOrder: (id: string, data: any) => {
        return axiosClient.patch<DataReponse<Order>>(`/orders/${id}`, data);
    },

    createOrder: (data: Omit<Order, 'id'>) => {
        return axiosClient.post<DataReponse<Order>>('/orders', data);
    },

    deleteOrder: (id: string) => {
        return axiosClient.delete<DataReponse<Order>>(`/orders/${id}`);
    },
};
