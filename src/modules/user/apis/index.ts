import axiosClient from '@/apiClient/axiosClient';
import { DataReponse, ListResponse } from '@/types';
import { User, UserParams } from '../types';

export const userApi = {
    getUserList: (params: UserParams) => {
        return axiosClient.get<ListResponse<User>>('/users', { params });
    },
    updateUser: (id: string, data: any) => {
        return axiosClient.patch<DataReponse<User>>(`/users/${id}`, data);
    },
    createUser: (data: Omit<User, 'id'>) => {
        return axiosClient.post<DataReponse<User>>('/users', data);
    },
};
