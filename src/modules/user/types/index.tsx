import { MetaDataPage, ResponseCommon } from '@/types';

export interface DataType {
    key: number;
    id?: number;
    email: string;
    phoneNumber: string;
    name: string;
    role: string;
    department: string;
    isActive: boolean;
    avatarUrl: string | null;
    createdAt: string;
}

export interface User {
    id: string;
    createdAt: string;
    updatedAt: string;
    email: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    department: string;
    position: string;
    role: string;
    avatarUrl: string | null;
    otpVerifyEmail: string | null;
    otpVerifyEmailExpiresAt: string | null;
    isActive: boolean;
}

export interface GetUserListResponse extends ResponseCommon {
    data: {
        items: User[];
        metadata: MetaDataPage;
    };
}

export interface UserParams {
    page: number;
    pageSize: number;
    keyword?: string;
    status?: boolean | string;
}

export interface UpdateUser {
    id: string;
    data: Partial<User>;
}
