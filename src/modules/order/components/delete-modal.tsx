import { useModalStore } from '@/hooks/useModal';
import { Form, Modal } from 'antd';
import { useTranslations } from 'next-intl';
import { useDeleteOrder } from '../hooks/useDeleteOrder';
import { Order } from '../types';

export default function DeleteModal() {
    const dataEdit = useModalStore((state) => state.dataEdit as Order | null);
    const closeModal = useModalStore((state) => state.closeModal);
    const message = useTranslations();

    const { deleteOrder, isPending } = useDeleteOrder();

    const handleDelete = () => {
        deleteOrder(dataEdit?.id ?? '');
        closeModal();
    };

    const [form] = Form.useForm();

    return (
        <div>
            <Modal
                open
                onCancel={closeModal}
                onOk={() => form.submit()}
                confirmLoading={isPending}
            >
                <Form form={form} onFinish={handleDelete}>
                    <div className="mb-4 text-lg font-bold">
                        {message('common.delete')}
                    </div>
                    <div>
                        <p>
                            <span>
                                {message('order.message.delete', {
                                    orderName: dataEdit?.orderName,
                                })}
                            </span>
                            <span className="font-bold">
                                {dataEdit?.orderName}{' '}
                            </span>
                            ?
                        </p>
                    </div>
                </Form>
            </Modal>
        </div>
    );
}
