import { uploadApi } from '@/apis';
import { showNotification } from '@/helpers/messagesHelper';
import { orderQuerykeys } from '@/modules/order/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUploadOrder = () => {
    const queryClient = useQueryClient();

    const handleOnSuccess = () => {
        queryClient.invalidateQueries({
            queryKey: orderQuerykeys.getList,
        });
        showNotification('success', 'Upload file successfully');
    };

    const handleOnError = () => {
        showNotification('error', 'Upload file failed');
    };

    const mutation = useMutation({
        mutationFn: (payload) => uploadApi.uploadFileConfirm(payload),
        onSuccess: handleOnSuccess,
        onError: handleOnError,
    });

    const uploadOrder = (payload: any) => {
        mutation.mutate(payload);
    };

    return { uploadOrder, ...mutation };
};
