import { OrderParams } from '@/modules/order/types';
import { UserParams } from '@/modules/user/types';
import { ListResponse } from '@/types';

export const COOKIES_KEY = {
    TOKEN: 'at',
    REFRESH_TOKEN: 'rt',
};

export const ROUTES = {
    LOGIN: '/login',
    ORDER: '/order',
    USER: '/user',
};

export const defaulFilterUserParams: UserParams = {
    page: 1,
    pageSize: 10,
};

export const defaultData: ListResponse['data'] = {
    items: [],
    metadata: {
        currentPage: 0,
        limit: 0,
        totalItems: 0,
        totalPages: 0,
    },
};

export const deFaultOrderParams: OrderParams = {
    page: 1,
    pageSize: 10,
};
