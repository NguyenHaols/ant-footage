'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEventHandler } from 'react';

export type OnSearchType = ChangeEventHandler<HTMLInputElement>;

export type OnChangePage = (page: number, pageSize: number) => void;

export type OnChangeFilter<DataFilterType> = (
    newValue: Partial<DataFilterType>,
    backToFirstPage?: boolean
) => void;

export interface UseFilterProps<DataFilterType> {
    dataFilter: DataFilterType;
    onSearch: any;
    onChangeFilter: OnChangeFilter<DataFilterType>;
    onChangePage: OnChangePage;
}

export const useFilter = <DataFilterType>(
    defaultFilter: DataFilterType
): UseFilterProps<DataFilterType> => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const queryParams = Object.fromEntries(
        searchParams.entries()
    ) as Partial<DataFilterType>;

    const dataFilter: DataFilterType = {
        ...defaultFilter,
        ...queryParams,
    };

    const syncParamsToURL = (params: any) => {
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        for (const [key, value] of Object.entries(params)) {
            if (value) {
                current.set(key, value as string);
            } else {
                current.delete(key);
            }
        }

        router.push(
            `${pathname}?${current.toString()}`, // href: Đường dẫn đầy đủ (bao gồm query)
            { scroll: false }
        );
    };

    const onSearch: OnSearchType = (e) => {
        const keyword = e.target.value?.trim();
        syncParamsToURL({
            keyword,
        });
    };

    const onChangeFilter: OnChangeFilter<DataFilterType> = (
        newValue,
        backToFirstPage
    ) => {
        const pageParams = backToFirstPage
            ? {
                  //   offset: defaultFilter.offset,
                  //   limit: defaultFilter.limit,
              }
            : {};

        syncParamsToURL({
            ...pageParams,
            ...newValue,
        });
    };

    const onChangePage: OnChangePage = (page: number, pageSize: number) => {
        syncParamsToURL({
            page,
            pageSize,
        });
    };

    return {
        dataFilter,
        onSearch,
        onChangeFilter,
        onChangePage,
    };
};
