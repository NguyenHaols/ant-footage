import axiosClient from '@/apiClient/axiosClient';
import { PayloadUploadFile } from '@/modules/order/types';

export const uploadApi = {
    uploadFile: async (payload: PayloadUploadFile, file: File) => {
        try {
            const res = await axiosClient.post(
                '/buckets/signed-upload-url',
                payload
            );
            const { url, submitKey } = res.data.data;

            const dataSubmit = {
                key: submitKey,
                contentType: file.type,
                fileName: file.name,
            };

            const uploadResponse = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': file.type,
                },
                body: file,
            });

            if (uploadResponse.status === 200) {
                return dataSubmit;
            } else {
                throw new Error(
                    `Upload failed with status ${uploadResponse.status}`
                );
            }
        } catch (error) {
            console.error('Error upload file:', error);
            throw error;
        }
    },

    uploadFileConfirm: async (payload: any) => {
        return await axiosClient.post('/test', payload);
    },
};
