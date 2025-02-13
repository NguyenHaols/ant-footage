import axiosClient from '@/apiClient/axiosClient';
import { ConfirmUploadParams, PayloadUploadFile } from '@/modules/order/types';

export const uploadApi = {
    uploadFile: async (payload: PayloadUploadFile, file: File) => {
        try {
            const res = await axiosClient.post('file/get-link-upload', payload);
            const { url, submitKey } = res.data.data;

            if (!url || !submitKey) {
                throw new Error('Invalid response from server');
            }
            const uploadResponse = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': file.type,
                },
                body: file,
            });

            if (uploadResponse.status === 200) {
                return { submitKey };
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

    uploadFileConfirm: async (payload: ConfirmUploadParams) => {
        return await axiosClient.post('/file/submit-upload', payload);
    },
};
