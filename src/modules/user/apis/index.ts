import axiosClient from '@/apiClient/axiosClient';
import { User } from '../types';

export const userApi = {
    getUserList: () => {
        return axiosClient.get<User[]>('/users');
    },
};
