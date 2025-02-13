export interface Order {
    id: string;
    orderName: string;
    productType: string;
    description: string;
    resourceUrl: string;
    createdAt: string;
    updatedAt: string;
    filePathGcs: string;
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
    folderName: string;
}

export interface ConfirmUploadParams {
    orderId: string;
    submitKey: string;
}
