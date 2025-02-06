import { faker } from '@faker-js/faker';
import { DataType } from '../types';

export const QUERY_KEY = {
    USER: {
        KEY: 'USER',
        GET_USER_LIST: 'GET_USER_LIST',
    },
};

export const userQuerykeys = {
    all: [QUERY_KEY.USER.KEY],
    getList: [QUERY_KEY.USER.KEY, QUERY_KEY.USER.GET_USER_LIST],
};

export const mockDataTable: DataType[] = Array.from({ length: 50 }, (_, i) => ({
    key: i + 1,
    email: faker.internet.email(),
    phoneNumber: '0985243123',
    name: `${faker.person.firstName()} ${faker.person.lastName()}`,
    department: faker.helpers.arrayElement([
        'IT',
        'HR',
        'Finance',
        'Marketing',
    ]),
    role: faker.helpers.arrayElement(['Admin', 'User', 'Manager']),
    isActive: faker.datatype.boolean(),
    createdAt: faker.date.past().toISOString(),
    avatarUrl: faker.image.avatar(),
}));
