import { DATE_FORMAT } from '@/enums';
import clsx, { ClassValue } from 'clsx';
import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formattedDate(
    date?: string | number | Date | dayjs.Dayjs | null | undefined,
    format?: DATE_FORMAT | string
): string {
    return (date && dayjs(date).format(format ?? DATE_FORMAT.DATE_ONLY)) || '';
}

export const getFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
