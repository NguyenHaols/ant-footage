import { TYPE_ACTION } from '@/enums';
import { useModalStore } from '@/hooks/useModal';
import { Form, Input, Modal, ModalProps, Select } from 'antd';
import { TYPE_MODAL_ORDER } from '../enums';
import { useCreateOrder } from '../hooks/useCreateOrder';
import { useUpdateOrder } from '../hooks/useUpdateOrder';
import { Order, UpdateOrder } from '../types';

interface Props extends ModalProps {}

export default function OrderModal({ ...props }: Props) {
    const closeModal = useModalStore((state) => state.closeModal);
    const typeModal = useModalStore((state) => state.typeModal);
    const dataEdit = useModalStore((state) => state.dataEdit as Order | null);

    const [form] = Form.useForm();

    const handleError = (errors: any) => {
        form.setFields(errors);
    };

    const handleSuccess = () => {
        closeModal();
        form.resetFields();
    };

    const { createOrder, isPending: isPendingCreate } = useCreateOrder(
        handleSuccess,
        handleError
    );
    const { updateOrder, isPending: isPendingUpdate } = useUpdateOrder(
        handleSuccess,
        handleError
    );

    const onFinish = (values: Order) => {
        if (typeModal === TYPE_MODAL_ORDER.CREATE) {
            const dataSubmit = { ...values };
            createOrder(dataSubmit);
        } else {
            if (dataEdit) {
                const dataSubmit: UpdateOrder = {
                    id: dataEdit.id,
                    data: values,
                };
                updateOrder(dataSubmit);
            }
        }
    };

    return (
        <div>
            <Modal
                {...props}
                open
                onCancel={closeModal}
                onOk={() => form.submit()}
                confirmLoading={isPendingCreate || isPendingUpdate}
            >
                <span className="text-lg font-bold">
                    {typeModal === TYPE_MODAL_ORDER.UPDATE
                        ? TYPE_ACTION.UPDATE
                        : TYPE_ACTION.CREATE}
                </span>
                <Form
                    form={form}
                    variant={'outlined'}
                    layout="vertical"
                    style={{ maxWidth: 600, marginTop: 20 }}
                    initialValues={dataEdit !== null ? { ...dataEdit } : {}}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Order name"
                        name="orderName"
                        rules={[
                            {
                                required: true,
                                message: 'Order name is required!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Product Type"
                        name="productType"
                        rules={[
                            {
                                required: true,
                                message: 'Product type is required!',
                            },
                        ]}
                    >
                        <Select>
                            <Select.Option value="image">Image</Select.Option>
                            <Select.Option value="mp3">Mp3</Select.Option>
                            <Select.Option value="mp4">Mp4</Select.Option>
                        </Select>
                    </Form.Item>

                    {/* <Form.Item
                        label="Created date"
                        name="createdAt"
                        rules={[
                            {
                                required: true,
                                message: 'Created date is required!',
                            },
                        ]}
                    >
                        <DatePicker />
                    </Form.Item> */}
                </Form>
            </Modal>
        </div>
    );
}
