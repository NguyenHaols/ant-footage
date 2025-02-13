import { uploadApi } from '@/apis';
import { showNotification } from '@/helpers/messagesHelper';
import { orderQuerykeys } from '@/modules/order/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ConfirmUploadParams } from '../types';

export const useUploadOrder = (onSuccessCb?: () => void) => {
    const queryClient = useQueryClient();

    const handleOnSuccess = () => {
        queryClient.invalidateQueries({
            queryKey: orderQuerykeys.getList,
        });
        if (onSuccessCb) {
            onSuccessCb();
        }
        showNotification('success', 'Upload file successfully');
    };

    const handleOnError = () => {
        showNotification('error', 'Upload file failed');
    };

    const mutation = useMutation({
        mutationFn: (payload: ConfirmUploadParams) =>
            uploadApi.uploadFileConfirm(payload),
        onSuccess: handleOnSuccess,
        onError: handleOnError,
    });

    const uploadOrder = (payload: ConfirmUploadParams) => {
        mutation.mutate(payload);
    };

    return { uploadOrder, ...mutation };
};
