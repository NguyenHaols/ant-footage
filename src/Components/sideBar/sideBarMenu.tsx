import { Link, usePathname } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { Menu } from 'antd';
import { ItemType, MenuItemType } from 'antd/es/menu/interface';
import { FileText, User } from 'lucide-react';

interface SideBarMenuProps {
    open: boolean;
}

export default function SideBarMenu({ open }: SideBarMenuProps) {
    const items: ItemType<MenuItemType>[] = [
        {
            key: 'Management',
            type: 'group',
            label: <p className={cn(open ? 'hidden' : 'block')}>Management</p>,
            children: [
                {
                    key: '/order',
                    icon: <FileText size={18} />,
                    label: (
                        <Link className="font-medium" href={'/order'}>
                            Order
                        </Link>
                    ),
                },
                {
                    key: '/user',
                    icon: <User size={18} />,
                    label: (
                        <Link className="font-medium" href={'/user'}>
                            User
                        </Link>
                    ),
                },
            ],
        },
    ];
    const pathname = usePathname();
    return (
        <div>
            <Menu
                className="text-sidebar"
                style={{
                    borderInlineEnd: 'none',
                    backgroundColor: 'var(--sidebar-background)',
                }}
                mode="inline"
                items={items}
                selectedKeys={[pathname]}
            />
        </div>
    );
}
