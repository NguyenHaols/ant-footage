import { useModalStore } from '@/hooks/useModal';
import { Form, Modal } from 'antd';
import { useDeleteOrder } from '../hooks/useDeleteOrder';
import { Order } from '../types';

export default function DeleteModal() {
    const dataEdit = useModalStore((state) => state.dataEdit as Order | null);
    const closeModal = useModalStore((state) => state.closeModal);

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
                    <div className="mb-4 text-lg font-bold">Delete</div>
                    <div>
                        <p>
                            <span>Are you sure you want to delete order </span>
                            <span className="font-bold">
                                {dataEdit?.orderName}
                            </span>
                            ?
                        </p>
                    </div>
                </Form>
            </Modal>
        </div>
    );
}
