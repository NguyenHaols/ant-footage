import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { userApi } from '../apis';
import { userQuerykeys } from '../constants';
import { User } from '../types';

export default function useUpdateUser() {
    const queryClient = useQueryClient();
    const handleSuccess = () => {
        queryClient.invalidateQueries({
            queryKey: userQuerykeys.getList,
        });
        message.success('Update user successfully');
    };

    const handleOnError = (error: any) => {
        message.error(`Failed to update user: ${error.message}`);
    };
    const mutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: User }) =>
            userApi.updateUser(id, data),
        onSuccess: handleSuccess,
        onError: handleOnError,
    });

    const updateUser = ({ id, data }: { id: string; data: User }) => {
        mutation.mutate({ id, data });
    };
    return {
        ...mutation,
        updateUser,
    };
}
