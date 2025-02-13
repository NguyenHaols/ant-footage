import { uploadApi } from '@/apis';
import FileUpload from '@/components/file-upload';
import { useModalStore } from '@/hooks/useModal';
import { Form, Modal } from 'antd';
import { useTranslations } from 'next-intl';
import { ORDER_TYPE_PRODUCT } from '../enums';
import { useUploadOrder } from '../hooks/useUpload';
import { ConfirmUploadParams, Order, PayloadUploadFile } from '../types';
import DndImageUpload from './dnd-Image-upload';

export default function UploadModal() {
    const closeModal = useModalStore((state) => state.closeModal);
    const editData = useModalStore((state) => state.dataEdit as Order | null);
    const message = useTranslations();

    const [form] = Form.useForm();

    const handleUploadSuccess = () => {
        form.resetFields();
        closeModal();
    };

    const { uploadOrder, isPending } = useUploadOrder(handleUploadSuccess);

    const onFinish = async () => {
        const file = form.getFieldValue('file');
        console.log(file.fileList[0]);
        const payload: PayloadUploadFile = {
            fileName: file.fileList[0].originFileObj.name,
            contentType: file.fileList[0].type,
            fileSize: file.fileList[0].size,
            folderName: editData?.productType ?? '',
        };
        const res = await uploadApi.uploadFile(
            payload,
            file.fileList[0].originFileObj
        );
        if (res && editData) {
            const uploadData: ConfirmUploadParams = {
                orderId: editData?.id,
                submitKey: res.submitKey,
            };
            uploadOrder(uploadData);
        }
    };

    return (
        <div>
            <Modal
                open
                onOk={onFinish}
                onCancel={() => closeModal()}
                confirmLoading={isPending}
            >
                <p className="text-lg font-bold">{message('common.upload')}</p>
                <div className="mt-4">
                    <Form form={form} layout="vertical">
                        {editData?.productType === ORDER_TYPE_PRODUCT.AUDIO && (
                            <Form.Item
                                label="File"
                                name="file"
                                rules={[
                                    {
                                        required: true,
                                        message: 'File audio is required!',
                                    },
                                ]}
                            >
                                <FileUpload accept="audio/*" />
                            </Form.Item>
                        )}
                        {/* <Form.Item
                            label="Image"
                            name="image"
                            rules={[
                                {
                                    required: true,
                                    message: 'Image is required!',
                                },
                            ]}
                        >
                            <ImageUpload />
                        </Form.Item> */}
                        {editData?.productType === ORDER_TYPE_PRODUCT.IMAGE && (
                            <Form.Item
                                label={message('order.type.image')}
                                name="file"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Image is required!',
                                    },
                                ]}
                            >
                                <DndImageUpload
                                    accept={editData?.productType}
                                />
                            </Form.Item>
                        )}
                        {editData?.productType === ORDER_TYPE_PRODUCT.VIDEO && (
                            <Form.Item
                                label={'Video'}
                                name="file"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Video is required!',
                                    },
                                ]}
                            >
                                {/* video */}
                            </Form.Item>
                        )}
                    </Form>
                </div>
            </Modal>
        </div>
    );
}
