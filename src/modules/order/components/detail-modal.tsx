import { useModalStore } from '@/hooks/useModal';
import { Form, Image, Input, Modal, Select } from 'antd';
import { useTranslations } from 'next-intl';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import ReactPlayer from 'react-player';
import { ORDER_TYPE_PRODUCT } from '../enums';
import { Order } from '../types';

export default function DetailModal() {
    const closeModal = useModalStore((state) => state.closeModal);
    const dataEdit = useModalStore((state) => state.dataEdit as Order | null);
    console.log('🚀 ~ DetailModal ~ dataEdit:', dataEdit);
    const message = useTranslations();

    return (
        <div>
            <Modal open onCancel={closeModal} footer={null}>
                <span className="text-lg font-bold">
                    {message('common.detail')}
                </span>
                <Form
                    variant={'outlined'}
                    layout="vertical"
                    style={{ maxWidth: 600, marginTop: 20 }}
                    initialValues={dataEdit !== null ? { ...dataEdit } : {}}
                >
                    <Form.Item
                        label={message('order.orderName')}
                        name="orderName"
                        rules={[
                            {
                                required: true,
                                message: 'Order name is required!',
                            },
                        ]}
                    >
                        <Input disabled />
                    </Form.Item>

                    <Form.Item
                        label={message('product.label')}
                        name="productType"
                        rules={[
                            {
                                required: true,
                                message: 'Product type is required!',
                            },
                        ]}
                    >
                        <Select disabled>
                            <Select.Option value="image">Image</Select.Option>
                            <Select.Option value="audio">Mp3</Select.Option>
                        </Select>
                    </Form.Item>

                    {dataEdit?.productType === ORDER_TYPE_PRODUCT.IMAGE &&
                        dataEdit.resourceUrl && (
                            <Form.Item
                                label={message('order.type.image')}
                                name="resuourceUrl"
                                rules={[{ required: true }]}
                            >
                                <Image
                                    src={dataEdit?.resourceUrl ?? ''}
                                    alt={dataEdit?.orderName ?? ''}
                                />
                            </Form.Item>
                        )}

                    {dataEdit?.productType === ORDER_TYPE_PRODUCT.AUDIO &&
                        dataEdit.resourceUrl && (
                            <Form.Item
                                label={message('order.type.audio')}
                                name="resuourceUrl"
                                rules={[{ required: true }]}
                            >
                                <AudioPlayer
                                    src={dataEdit?.resourceUrl ?? ''}
                                    showJumpControls={false}
                                    layout="horizontal"
                                    customAdditionalControls={[]}
                                    style={{ marginTop: 10 }}
                                />
                            </Form.Item>
                        )}

                    {dataEdit?.productType === ORDER_TYPE_PRODUCT.VIDEO &&
                        dataEdit.resourceUrl && (
                            <Form.Item
                                label={message('order.type.video')}
                                name="resuourceUrl"
                                rules={[{ required: true }]}
                            >
                                <ReactPlayer
                                    url={dataEdit?.resourceUrl ?? ''}
                                    controls
                                    width="100%"
                                    height="300px"
                                    playing
                                    loop
                                    muted
                                />
                            </Form.Item>
                        )}
                </Form>
            </Modal>
        </div>
    );
}
