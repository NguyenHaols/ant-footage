import { uploadApi } from '@/apis';
import FileUpload from '@/components/file-upload';
import ImageUpload from '@/components/image-upload';
import { useModalStore } from '@/hooks/useModal';
import { Form, Modal } from 'antd';
import { Order } from '../types';
import DndImageUpload from './dnd-Image-upload';

export default function UploadModal() {
    const closeModal = useModalStore((state) => state.closeModal);
    const editData = useModalStore((state) => state.dataEdit as Order | null);

    const [form] = Form.useForm();

    // const { uploadOrder } = useUploadOrder();

    const onFinish = async () => {
        const file = form.getFieldValue('file');
        const payload = {
            orderId: editData?.id,
            fileName: file.fileList[0].originFileObj.name,
            contentType: file.fileList[0].type,
            fileSize: file.fileList[0].size,
        };
        const res = await uploadApi.uploadFile(
            payload,
            file.fileList[0].originFileObj
        );
        // if (res) {
        //     const uploadData = {
        //         orderId: editData?.id,
        //         key: res.key,
        //     }
        //     uploadOrder(uploadData);
        // } waiting api...
        console.log('🚀 ~ onFinish ~ res:', res);
    };

    return (
        <div>
            <Modal open onOk={onFinish} onCancel={() => closeModal()}>
                <p className="text-lg font-bold">Upload File</p>
                <div className="mt-4">
                    <Form form={form} layout="vertical">
                        {/* <MyDropzone
                        acceptFiles={{ 'image/*': [] }}
                        uploadProgress={0}
                        name={'upload'}
                        uploadTitle={'Upload Image'}
                    /> */}
                        <Form.Item
                            label="File"
                            name="file"
                            rules={[
                                {
                                    required: true,
                                    message: 'File is required!',
                                },
                            ]}
                        >
                            <FileUpload accept="image/*" />
                        </Form.Item>
                        <Form.Item
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
                        </Form.Item>
                        <Form.Item
                            label="Image 2"
                            name="image2"
                            rules={[
                                {
                                    required: true,
                                    message: 'Image is required!',
                                },
                            ]}
                        >
                            <DndImageUpload />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </div>
    );
}
