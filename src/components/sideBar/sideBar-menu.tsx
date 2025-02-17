import { Link, usePathname } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { Menu } from 'antd';
import { ItemType, MenuItemType } from 'antd/es/menu/interface';
import { FileText, ListCollapse, User } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface SideBarMenuProps {
    open: boolean;
}

export default function SideBarMenu({ open }: SideBarMenuProps) {
    const message = useTranslations();

    const items: ItemType<MenuItemType>[] = [
        {
            key: 'Management',
            type: 'group',
            label: (
                <p className={cn(open ? 'hidden' : 'block')}>
                    {message('common.management')}
                </p>
            ),
            children: [
                {
                    key: '/order',
                    icon: <FileText size={18} />,
                    label: (
                        <Link className="font-medium" href={'/order'}>
                            {message('order.label')}
                        </Link>
                    ),
                },
                {
                    key: '/user',
                    icon: <User size={18} />,
                    label: (
                        <Link className="font-medium" href={'/user'}>
                            {message('common.user')}
                        </Link>
                    ),
                },
                {
                    key: '/topic',
                    icon: <ListCollapse size={18} />,
                    label: (
                        <Link className="font-medium" href={'/topic'}>
                            {message('common.topic')}
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
