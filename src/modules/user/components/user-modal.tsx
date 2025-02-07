import { TYPE_MODAL_USER } from '@/enums';
import { useModalStore } from '@/hooks/useModal';
import { Form, Input, Modal, ModalProps, Select } from 'antd';
import useUpdateUser from '../hooks/useUpdateUser';
import { User } from '../types';

interface Props extends ModalProps {}
export default function UserModal({ ...props }: Props) {
    const { closeModal } = useModalStore();

    const { typeModal } = useModalStore();

    const { dataEdit } = useModalStore();

    const [form] = Form.useForm();

    const { updateUser } = useUpdateUser();

    // update
    const isUpdate = Boolean(dataEdit?.id);

    const onFinish = (values: User) => {
        updateUser({ id: dataEdit?.id, data: values });
        console.log('🚀 ~ onFinish ~ values:', values);
    };
    return (
        <div>
            <Modal
                {...props}
                open
                onCancel={closeModal}
                onOk={() => form.submit()}
            >
                <span className="text-lg font-bold">
                    {typeModal === TYPE_MODAL_USER.UPDATE ? 'Update' : 'Create'}
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
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Email is required!' },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Phone number"
                        name="phoneNumber"
                        rules={[
                            {
                                required: true,
                                message: 'Phone number is required!',
                            },
                            {
                                type: 'number',
                                message: 'Phone number must be a number!',
                                transform: (value) => Number(value),
                            },
                        ]}
                    >
                        <Input style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Name"
                        name="firstName"
                        rules={[
                            { required: true, message: 'Name is required!' },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Role"
                        name="role"
                        rules={[
                            { required: true, message: 'Role is required!' },
                        ]}
                    >
                        <Select>
                            <Select.Option value="staff">Staff</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Department"
                        name="department"
                        rules={[
                            {
                                required: true,
                                message: 'Department is required!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
