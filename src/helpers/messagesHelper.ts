import { ToastOptions, TypeOptions, toast } from 'react-toastify';

export const showNotification = (
    type: TypeOptions,
    message: string,
    toastOptions?: ToastOptions
) => {
    const options: ToastOptions = {
        ...toastOptions,
        type,
    };

    toast(message, {
        ...options,
        toastId: message,
    });
};

export const hideNotification = (toastId: ToastOptions['toastId']) => {
    toast.dismiss(toastId);
};

export const isToastActive = (toastId: ToastOptions['toastId']) => {
    if (toastId === undefined) return false;
    return toast.isActive(toastId);
};
