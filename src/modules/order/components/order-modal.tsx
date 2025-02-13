import { useModalStore } from '@/hooks/useModal';
import { Form, Input, Modal, ModalProps, Select } from 'antd';
import { useTranslations } from 'next-intl';
import { ORDER_TYPE_PRODUCT, TYPE_MODAL_ORDER } from '../enums';
import { useCreateOrder } from '../hooks/useCreateOrder';
import { useUpdateOrder } from '../hooks/useUpdateOrder';
import { Order, UpdateOrder } from '../types';

interface Props extends ModalProps {}

export default function OrderModal({ ...props }: Props) {
    const closeModal = useModalStore((state) => state.closeModal);
    const typeModal = useModalStore((state) => state.typeModal);
    const dataEdit = useModalStore((state) => state.dataEdit as Order | null);

    const messsage = useTranslations();

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
                        ? messsage('common.update')
                        : messsage('common.create')}
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
                        label={messsage('order.orderName')}
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
                        label={messsage('product.label')}
                        name="productType"
                        rules={[
                            {
                                required: true,
                                message: 'Product type is required!',
                            },
                        ]}
                    >
                        <Select>
                            <Select.Option value={ORDER_TYPE_PRODUCT.IMAGE}>
                                Image
                            </Select.Option>
                            <Select.Option value={ORDER_TYPE_PRODUCT.AUDIO}>
                                Audio
                            </Select.Option>
                            <Select.Option value={ORDER_TYPE_PRODUCT.VIDEO}>
                                Video
                            </Select.Option>
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
