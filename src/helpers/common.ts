import { DATE_FORMAT, ORDER } from '@/enums';
import dayjs from 'dayjs';

export function formattedDate(
    date?: string | number | Date | dayjs.Dayjs | null | undefined,
    format?: DATE_FORMAT | string,
    locale?: string
): string {
    return (
        (date &&
            dayjs(date)
                .locale(locale ?? 'en')
                .format(format ?? DATE_FORMAT.FULL)) ||
        ''
    );
}

export function formattedDateOnly(
    date?: string | number | Date | dayjs.Dayjs | null | undefined,
    format?: DATE_FORMAT | string,
    locale?: string
): string {
    return (
        (date &&
            dayjs(date)
                .locale(locale ?? 'en')
                .format(format ?? DATE_FORMAT.DATE_ONLY)) ||
        ''
    );
}

export function getIndex(
    pageSize: number | undefined = 0,
    currentPage: number | undefined = 1,
    index: number
) {
    return pageSize * (currentPage - 1) + index + 1;
}

export function replaceSpecialChars(str: string) {
    const regex = /[\\.{ }^%`[\]"<>#|~/]/g;
    return str.replace(regex, '_');
}

export function parseTimestampToDateTime(timestamp: number) {
    // Create a new Date object using the timestamp (converted to milliseconds)
    const date = new Date(timestamp * 1000);

    // Format the date and time in a human-readable format
    // You can adjust the format as needed
    return date.toISOString();
}

export function stringToNumber(value: any) {
    if (!value) return undefined;
    return Number(value);
}

export function getAvatarPlaceholder(value: any) {
    return value?.[0]?.toUpperCase();
}

export const convertSecondsToTime = (duration = 0) => {
    if (isNaN(Number(duration)) || duration < 0) {
        return '00:00';
    }

    let minutes: string | number = Math.floor(duration / 60);
    let seconds: string | number = Math.floor(duration - minutes * 60);

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
};

export const getFileName = (file: File) => {
    return file.name.split('.').slice(0, -1).join('.');
};

export const getFileDuration = async (file: File) => {
    const audioContext = new AudioContext();
    const buffer = await file.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(buffer);
    const duration = audioBuffer.duration;
    return Math.ceil(duration);
};

export const flattenData = (data: any[], parentObj: any) => {
    const result: any[] = [];

    data.forEach((obj) => {
        const item = { ...obj, parentObj };
        result.push(item);

        if (obj.children?.length > 0) {
            result.push(...flattenData(obj.children, item));
        }
    });

    return result;
};

export const convertParams = (value: any) => {
    if (typeof value !== 'object') return value;

    try {
        return value.join(',');
    } catch {
        return undefined;
    }
};

export const isNullOrUndefined = (value: any) =>
    value === undefined || value === null;

export function getSortOrder<T>(
    value: ORDER | undefined,
    key: T,
    target: string
) {
    if (key !== target) return null;
    if (value === 'ASC') return 'ascend';
    if (value === 'DESC') return 'descend';
    return null;
}

export const setSortOrder = (sort: any) => {
    const order =
        (sort.order === 'ascend' && ORDER.ASC) ||
        (sort.order === 'descend' && ORDER.DESC) ||
        undefined;

    return order;
};

export const calculatePercent = (
    value1: string | number,
    value2: string | number
) => {
    const number1 = Number(value1);
    const number2 = Number(value2);
    if (number2 === 0) return 0;
    const percentage = (number1 / number2) * 100;
    return Math.round(percentage * 100) / 100; // Làm tròn đến 2 chữ số thập phân
};

export function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
