'use client'

import SideBar from '@/Components/sideBar'
import { Button, Layout } from 'antd'
import { Header } from 'antd/es/layout/layout'
import { PanelLeftClose, PanelRightClose } from 'lucide-react'
import { PropsWithChildren, useState } from 'react'

export default function AdminLayout({ children }: PropsWithChildren) {
  const { Content } = Layout
  const [collapsed, setCollapsed] = useState(true)
  return (
    <Layout hasSider={true}>
      <SideBar open={!collapsed} />
      <Layout>
        <Header
          style={{
            width: '100%',
            backgroundColor: 'white',
            padding: 0
          }}
        >
          <Button
            className='ml-4'
            type='text'
            icon={
              collapsed ? (
                <PanelRightClose size={18} />
              ) : (
                <PanelLeftClose size={18} />
              )
            }
            onClick={() => setCollapsed(!collapsed)}
          />
        </Header>
        <Content className='w-full bg-white'>{children}</Content>
      </Layout>
    </Layout>
  )
}
