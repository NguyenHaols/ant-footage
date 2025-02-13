'use client';
import AppPagination from '@/components/pagination';
import { deFaultOrderParams } from '@/constants';
import { useFilter } from '@/hooks/useFilter';
import { useModalStore } from '@/hooks/useModal';
import DeleteModal from '@/modules/order/components/delete-modal';
import DetailModal from '@/modules/order/components/detail-modal';
import OrderHeader from '@/modules/order/components/order-header';
import OrderModal from '@/modules/order/components/order-modal';
import OrderTable from '@/modules/order/components/order-table';
import UploadModal from '@/modules/order/components/upload-modal';
import { TYPE_MODAL_ORDER } from '@/modules/order/enums';
import { useGetOrders } from '@/modules/order/hooks/useGetOrders';

export default function Order() {
    const { dataFilter, onChangePage } = useFilter(deFaultOrderParams);

    const { data: orders, isFetching } = useGetOrders(dataFilter);

    const { typeModal } = useModalStore();

    return (
        <div className="w-full">
            <OrderHeader />
            <OrderTable
                dataSource={orders.items}
                loading={isFetching}
                pagination={{
                    pageSize: dataFilter.pageSize,
                    current: dataFilter.page,
                }}
            />
            <AppPagination
                onChange={onChangePage}
                total={orders.metadata.totalItems}
                pageSize={deFaultOrderParams.pageSize}
                align="center"
            />

            {(typeModal === TYPE_MODAL_ORDER.UPDATE ||
                typeModal === TYPE_MODAL_ORDER.CREATE) && <OrderModal />}

            {typeModal === TYPE_MODAL_ORDER.UPLOAD && <UploadModal />}
            {typeModal === TYPE_MODAL_ORDER.DELETE && <DeleteModal />}
            {typeModal === TYPE_MODAL_ORDER.DETAIL && <DetailModal />}
        </div>
    );
}
