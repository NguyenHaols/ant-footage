'use client';

import { useActive } from '@/hooks/useActive';
import useAuth from '@/modules/auth/hooks/useAuth';
import { Button, Form, Input, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import Title from 'antd/es/typography/Title';
import Image from 'next/image';

export default function Login() {
    const { login } = useAuth();
    const [form] = useForm();

    const { isActive, active, inActive } = useActive();

    async function onSubmit() {
        active();
        const payload = {
            email: form.getFieldValue('email'),
            password: form.getFieldValue('password'),
        };
        await login(payload).finally(() => inActive());
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
                <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0 dark:border dark:border-gray-700 dark:bg-gray-800">
                    <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                        <div className="flex items-center justify-center gap-2">
                            <div>
                                <Image
                                    src={'/logo128.png'}
                                    alt="logo"
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <div>
                                <Title
                                    level={2}
                                    className="text-3xl font-bold"
                                    style={{ margin: 0 }}
                                >
                                    ANT GROUP
                                </Title>
                                <Typography className="font-bold">
                                    Together we will succeed
                                </Typography>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <Title style={{ margin: 0 }} level={4}>
                                WELCOME TO ANT TEAM
                            </Title>
                            <Typography>Sign in to your account </Typography>
                        </div>
                        <Form form={form} layout="vertical" onFinish={onSubmit}>
                            <Form.Item name="email" label="Email">
                                <Input />
                            </Form.Item>
                            <Form.Item name="password" label="Password">
                                <Input.Password />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    loading={isActive}
                                    className="w-full"
                                    type="primary"
                                    htmlType="submit"
                                >
                                    Sign in
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    );
}
