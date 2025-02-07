export interface DataFilterParams {
    page: number;
    pageSize: number;
}

export interface DataReponse<T> {
    data: T;
    statusCode: number;
    message: string;
}

export interface ListResponse<T = any> {
    data: {
        items: T[];
        metadata: MetaDataPage;
    };
    message?: string;
    statusCode?: number;
}

export interface MetaDataPage {
    currentPage: number;
    limit: number;
    totalItems: number;
    totalPages: number;
}

export interface DetailResponse<T> {
    data: T;
}

export interface ErrorResponse {
    message: string;
}

export interface SuccessResponse {
    message: string;
    data?: string;
}

export interface ResponseCommon {
    statusCode: number;
    message: string;
}
