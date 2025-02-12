import { showNotification } from '@/helpers/messagesHelper';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { orderApi } from '../apis';
import { orderQuerykeys } from '../constants';

export const useDeleteOrder = () => {
    const queryClient = useQueryClient();

    const handleSuccess = () => {
        queryClient.invalidateQueries({
            queryKey: orderQuerykeys.getList,
        });
        showNotification('success', 'Delete order successfully');
    };

    const handleOnError = () => {
        showNotification('error', 'Delete order failed');
    };

    const mutation = useMutation({
        mutationFn: (id: string) => orderApi.deleteOrder(id),
        onSuccess: handleSuccess,
        onError: handleOnError,
    });

    const deleteOrder = (id: string) => {
        mutation.mutate(id);
    };

    return {
        deleteOrder,
        ...mutation,
    };
};
