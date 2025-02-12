import { showNotification } from '@/helpers/messagesHelper';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '../apis';
import { userQuerykeys } from '../constants';
import { User } from '../types';

export const useCreateUsers = (
    onErrorCb: (errors: any) => void,
    onSuccessCb?: () => void
) => {
    const queryClient = useQueryClient();

    const handleSuccess = () => {
        queryClient.invalidateQueries({
            queryKey: userQuerykeys.getList,
        });
        if (onSuccessCb) {
            onSuccessCb();
        }
        showNotification('success', 'Create user successfully');
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
        mutationFn: (data: Omit<User, 'id'>) => userApi.createUser(data),
        onSuccess: handleSuccess,
        onError: handleOnError,
    });

    const createUser = (data: Omit<User, 'id'>) => {
        mutation.mutate(data);
    };
    return {
        ...mutation,
        createUser,
    };
};
