import { ORDER } from '@/enums';

export const addKeyForData = (data: any[]) => {
    return data.map((item) => ({ ...item, key: item.id }));
};

export function fillArrayToPageSize<T>(
    array: T[],
    pageSize: number,
    fillValue = null
) {
    while (array.length < pageSize) {
        array.push(fillValue as any);
    }
    return array;
}

export function compareChannelCount(a: any, b: any, order: ORDER | undefined) {
    if (!order) return 0;
    if (Number(a.channelCount) < Number(b.channelCount)) {
        return order === ORDER.ASC ? -1 : 1;
    }
    if (Number(a.channelCount) > Number(b.channelCount)) {
        return order === ORDER.ASC ? 1 : -1;
    }
    return 0;
}
