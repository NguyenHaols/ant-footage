'use client';

import HeaderLayout from '@/components/header/header';
import SideBar from '@/components/sideBar/sideBar';
import { Layout } from 'antd';
import { PropsWithChildren, useState } from 'react';

export default function AdminLayout({ children }: PropsWithChildren) {
    const { Content } = Layout;
    const [collapsed, setCollapsed] = useState(true);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    return (
        <Layout hasSider={true}>
            <SideBar open={!collapsed} />
            <Layout>
                <HeaderLayout
                    collapsed={collapsed}
                    setCollapsed={toggleCollapsed}
                />
                <Content className="w-full bg-white">{children}</Content>
            </Layout>
        </Layout>
    );
}
