'use client';

import { Button } from 'antd';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function TopicHeader() {
    const message = useTranslations();
    // const { openModal } = useModalStore();

    return (
        <div className="flex items-center justify-between gap-2 px-4 py-4">
            <div className="flex items-center gap-2">filter</div>
            <div>
                <Button
                    type="primary"
                    className="h-9 px-1 py-4"
                    // onClick={() => openModal(TYPE_MODAL_USER.CREATE)}
                >
                    <Plus size={18} />
                    {message('common.create')}
                </Button>
            </div>
        </div>
    );
}
