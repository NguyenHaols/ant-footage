import AppSearch from '@/components/appSearch';
import { deFaultOrderParams } from '@/constants';
import { useFilter } from '@/hooks/useFilter';
import { useModalStore } from '@/hooks/useModal';
import { Button } from 'antd';
import { Plus } from 'lucide-react';
import { useTranslations } from 'use-intl';
import { TYPE_MODAL_ORDER } from '../enums';

export default function OrderHeader() {
    const message = useTranslations();
    const { openModal } = useModalStore();
    const { dataFilter, onSearch } = useFilter(deFaultOrderParams);

    return (
        <div className="flex items-center justify-between gap-2 px-4 py-4">
            <AppSearch value={dataFilter.keyword} onChange={onSearch} />
            <div>
                <Button
                    type="primary"
                    className="h-9 px-1 py-4"
                    onClick={() => openModal(TYPE_MODAL_ORDER.CREATE)}
                >
                    <Plus size={18} />
                    {message('common.create')}
                </Button>
            </div>
        </div>
    );
}
