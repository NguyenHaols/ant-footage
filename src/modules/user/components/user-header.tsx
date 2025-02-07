'use client';

import AppSearch from '@/components/appSearch';
import { defaulFilterUserParams } from '@/constants';
import { useFilter } from '@/hooks/useFilter';

export default function UserHeader() {
    const { dataFilter, onSearch } = useFilter(defaulFilterUserParams);
    return (
        <div className="flex items-center justify-between gap-2 px-4 py-4">
            <AppSearch value={dataFilter.keyword} onChange={onSearch} />
        </div>
    );
}
