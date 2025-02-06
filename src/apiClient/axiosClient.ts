import { ROUTES } from '@/constants';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const axiosClient = axios.create({
    baseURL: 'http://45.148.30.194:3000',
    headers: {
        Accept: '*/*',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM4NTMyNTNhLTI4ZWQtNDgyNS1hNTE5LWE0MWY4YmJjYjY5MiIsImVtYWlsIjoidjFAZ21haWwuY29tIiwiaWF0IjoxNzM4ODMxMTg4LCJleHAiOjE3NDI0MzExODh9.lG44cqR2OT9RqLo9683lWsKfCH3-4aJ7GNGECm7mtS0`,
    },
    timeout: 10000,
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = cookies.get('at');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(undefined, async (error) => {
    // const refreshToken = cookies.get('rt');

    // if (error?.response?.status === 402) {
    //     if (refreshToken) {
    //         try {
    //             const response = await authApi.refreshToken(refreshToken);
    //             const newAccessToken = response.data.token;

    //             if (!newAccessToken)
    //                 return (window.location.href = ROUTES.LOGIN);

    //             const newRefreshToken = response.data.refresh_token;

    //             cookies.set('at', newAccessToken, { path: '/' });
    //             cookies.set('rt', newRefreshToken, { path: '/' });

    //             // Gửi lại yêu cầu ban đầu với token mới
    //             error.config.headers['Authorization'] =
    //                 `Bearer ${newAccessToken}`;
    //             return axios(error.config);
    //         } catch (refreshError) {
    //             console.error('Failed to refresh token:', refreshError);
    //         }
    //     } else {
    //         return (window.location.href = ROUTES.LOGIN);
    //     }
    // }
    if (error?.response?.status === 401) {
        return (window.location.href = ROUTES.LOGIN);
    }
    return Promise.reject(error);
});

export default axiosClient;
