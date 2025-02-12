'use client';

import AppSearch from '@/components/appSearch';
import { defaulFilterUserParams } from '@/constants';
import { TYPE_MODAL_USER } from '@/enums';
import { useFilter } from '@/hooks/useFilter';
import { useModalStore } from '@/hooks/useModal';
import { Button } from 'antd';
import { Plus } from 'lucide-react';
import UserSelectFilter from './user-selectFilter';

export default function UserHeader() {
    const { openModal } = useModalStore();
    const { dataFilter, onSearch, onChangeFilter } = useFilter(
        defaulFilterUserParams
    );
    return (
        <div className="flex items-center justify-between gap-2 px-4 py-4">
            <div className="flex items-center gap-2">
                <AppSearch value={dataFilter.keyword} onChange={onSearch} />
                <UserSelectFilter
                    value={dataFilter.status}
                    onChangeFilter={onChangeFilter}
                />
            </div>
            <div>
                <Button
                    type="primary"
                    style={{ padding: '4px 16px', height: '36px' }}
                    onClick={() => openModal(TYPE_MODAL_USER.CREATE)}
                >
                    <Plus size={18} />
                    Create
                </Button>
            </div>
        </div>
    );
}
