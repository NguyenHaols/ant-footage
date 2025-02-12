import { showNotification } from '@/helpers/messagesHelper';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { orderApi } from '../apis';
import { orderQuerykeys } from '../constants';
import { UpdateOrder } from '../types';

export const useUpdateOrder = (
    onSuccessCb?: () => void,
    onErrorCb?: (errors: any) => void
) => {
    const queryClient = useQueryClient();

    const handleSuccess = () => {
        queryClient.invalidateQueries({
            queryKey: orderQuerykeys.getList,
        });
        if (onSuccessCb) {
            onSuccessCb();
        }
        showNotification('success', 'Update order successfully');
    };

    const handleOnError = (error: any) => {
        const apiErrors = error.response.data.errors;
        const formattedErrors = apiErrors.map((error: any) => ({
            name: error.key,
            errors: [error.message],
        }));

        if (onErrorCb) {
            onErrorCb(formattedErrors);
        }
    };

    const mutation = useMutation({
        mutationFn: ({ id, data }: UpdateOrder) =>
            orderApi.updateOrder(id, data),
        onSuccess: handleSuccess,
        onError: handleOnError,
    });

    const updateOrder = ({ id, data }: UpdateOrder) => {
        mutation.mutate({ id, data });
    };

    return { updateOrder, ...mutation };
};
