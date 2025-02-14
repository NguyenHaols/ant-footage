import { ROUTES } from '@/constants';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const axiosClient = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        Accept: '*/*',
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
    const currentLocale = cookies.get('NEXT_LOCALE');
    if (error?.response?.status === 401) {
        return (window.location.href = `/${currentLocale}/${ROUTES.LOGIN}`);
    }
    return Promise.reject(error);
});

export default axiosClient;
