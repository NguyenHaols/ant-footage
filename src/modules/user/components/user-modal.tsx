import { TYPE_ACTION, TYPE_MODAL_USER } from '@/enums';
import { useModalStore } from '@/hooks/useModal';
import { Form, Input, Modal, ModalProps, Select, Switch } from 'antd';
import { useTranslations } from 'next-intl';
import { useCreateUsers } from '../hooks/useCreateUsers';
import useUpdateUser from '../hooks/useUpdateUser';
import { UpdateUser, User } from '../types';

interface Props extends ModalProps {}
export default function UserModal({ ...props }: Props) {
    const closeModal = useModalStore((state) => state.closeModal);
    const typeModal = useModalStore((state) => state.typeModal);
    const dataEdit = useModalStore((state) => state.dataEdit as User | null);

    const messsage = useTranslations();

    const [form] = Form.useForm();

    const handleError = (errors: any) => {
        form.setFields(errors);
    };

    const handleSuccess = () => {
        form.resetFields();
        closeModal();
    };

    const { updateUser, isPending: isPendingUpdate } =
        useUpdateUser(handleError);

    const { createUser, isPending: isPendingCreate } = useCreateUsers(
        handleError,
        handleSuccess
    );

    const isUpdate = Boolean(dataEdit);

    const onFinish = (values: User) => {
        if (dataEdit) {
            const newData: UpdateUser = {
                data: { ...values },
                id: dataEdit.id,
            };
            updateUser(newData);
        } else {
            createUser(values);
        }
    };

    return (
        <div>
            <Modal
                {...props}
                open
                onCancel={closeModal}
                onOk={() => form.submit()}
                confirmLoading={isPendingUpdate || isPendingCreate}
            >
                <span className="text-lg font-bold">
                    {typeModal === TYPE_MODAL_USER.UPDATE
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
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Email is required!' },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    {!isUpdate && (
                        <>
                            <Form.Item
                                label={messsage('common.password')}
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Password is required!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                        </>
                    )}

                    <Form.Item
                        label={messsage('common.name')}
                        name="firstName"
                        rules={[
                            { required: true, message: 'Name is required!' },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={messsage('common.phoneNumber')}
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
                        label={messsage('common.role')}
                        name="role"
                        rules={[
                            { required: true, message: 'Role is required!' },
                        ]}
                    >
                        <Select>
                            <Select.Option value="admin">Admin</Select.Option>
                            <Select.Option value="user">user</Select.Option>
                            <Select.Option value="viewer">viewer</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label={messsage('common.department')}
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
                    <Form.Item label={messsage('status.active')} name="status">
                        <Switch checked={dataEdit?.isActive} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
