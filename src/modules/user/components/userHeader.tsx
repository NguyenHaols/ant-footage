'use client';

import AppSearch from '@/Components/AppSearch';
import { defaultFilterParams } from '@/constants';
import { useFilter } from '@/hooks/useFilter';

export default function UserHeader() {
    const { dataFilter, onSearch } = useFilter(defaultFilterParams);
    return (
        <div className="flex items-center justify-between gap-2 px-4 py-4">
            <AppSearch value={dataFilter.keyword || ''} onChange={onSearch} />
        </div>
    );
}
