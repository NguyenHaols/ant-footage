import { showNotification } from '@/helpers/messagesHelper';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { orderApi } from '../apis';
import { orderQuerykeys } from '../constants';
import { Order } from '../types';

export const useCreateOrder = (
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
        showNotification('success', 'Create order successfully');
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
        showNotification('error', error.response.data.message[0]);
    };

    const mutation = useMutation({
        mutationFn: (data: Omit<Order, 'id'>) => orderApi.createOrder(data),
        onSuccess: handleSuccess,
        onError: handleOnError,
    });

    const createOrder = (data: Omit<Order, 'id'>) => {
        mutation.mutate(data);
    };

    return {
        createOrder,
        ...mutation,
    };
};
