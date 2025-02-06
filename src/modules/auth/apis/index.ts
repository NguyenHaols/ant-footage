import axiosClient from '@/apiClient/axiosClient';
import { LoginPayload, LoginResponse } from '../types';

export const authApi = {
    login(payload: LoginPayload) {
        return axiosClient.post<LoginResponse>(`/auth/login`, payload);
    },

    refreshToken(refresh_token: string) {
        return axiosClient.post<LoginResponse>('/auth/refresh-token', {
            refresh_token,
        });
    },

    getInfo() {
        try {
            return axiosClient.get('/user/infor');
        } catch (error) {
            return error;
        }
    },
};
