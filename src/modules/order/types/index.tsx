export interface Order {
    id: string;
    orderName: string;
    productType: string;
    description: string;
    resourceUrl: string;
    createdAt: string;
    updatedAt: string;
}

export interface OrderParams {
    page: number;
    pageSize: number;
    keyword?: string;
}

export interface UpdateOrder {
    id: string;
    data: Partial<Order>;
}

export interface PayloadUploadFile {
    fileName: string;
    contentType: string;
    fileSize: number;
    entityType: string;
    entityId: string;
}

export interface ConfirmUploadParams {
    submitKey: string;
}
