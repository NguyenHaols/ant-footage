import { Button, Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import Title from 'antd/es/typography/Title'
import clsx from 'clsx'
import { LayoutDashboard, List, LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface SideBarProps {
  open: boolean
}

export default function SideBar({ open }: SideBarProps) {
  const siderStyle: React.CSSProperties = {
    overflow: 'auto',
    height: '100vh',
    position: 'sticky',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    borderRight: '1px solid #ccc'
  }
  return (
    <Sider
      style={siderStyle}
      theme='light'
      trigger={null}
      collapsible
      collapsed={open}
      width={'255px'}
      collapsedWidth={'3rem'}
    >
      <div className='flex h-full flex-col justify-between'>
        <div>
          <Link
            href={'/dashboard'}
            className='flex h-14 w-full items-center gap-2 p-2 hover:cursor-pointer'
          >
            <Image
              className='transition-all'
              src='/logo128.png'
              alt='logo'
              style={{
                objectFit: 'contain'
              }}
              width={open ? 32 : 50}
              height={open ? 32 : 50}
            />
            <div
              className={clsx(
                `w-full' ${open} ? 'hidden' : 'block transition-all`
              )}
            >
              <Title
                level={2}
                style={{
                  fontFamily: 'boston',
                  color: 'var(--title-color)',
                  fontSize: '24px',
                  display: open ? 'none' : 'block',
                  textWrap: 'nowrap',
                  marginBottom: 0
                }}
              >
                ANT GROUP
              </Title>
            </div>
          </Link>

          <Menu
            className='bg-bgSidebar'
            style={{ borderInlineEnd: 'none' }}
            mode='inline'
            defaultSelectedKeys={['0']}
            items={[
              {
                key: 'Management',
                type: 'group',
                label: (
                  <p className={clsx(open ? 'hidden' : 'block')}>Management</p>
                ),
                children: [
                  {
                    key: '0',
                    icon: <List size={18} />,
                    label: (
                      <Link className='font-medium' href={'/dashboard'}>
                        Dashboard
                      </Link>
                    )
                  },
                  {
                    key: '1',
                    icon: <LayoutDashboard size={18} />,
                    label: (
                      <Link className='font-medium' href={'/platform'}>
                        Platform
                      </Link>
                    )
                  }
                ]
              }
            ]}
          />
        </div>
        <div className={clsx(`mb-4 px-2 ${open ? 'hidden' : 'block'}`)}>
          <Link href={'/login'}>
            <Button
              type='default'
              block
              className='w-full'
              icon={<LogOut size={18} />}
            >
              LogOut
            </Button>
          </Link>
        </div>
      </div>
    </Sider>
  )
}
