import useAuth from '@/modules/auth/hooks/useAuth';
import { Avatar, Dropdown, MenuProps } from 'antd';
import { LogOutIcon, Settings, User2Icon } from 'lucide-react';

export default function HeaderProfile() {
    const { logout } = useAuth();

    const handleLogOut = () => {
        logout();
    };

    const items: MenuProps['items'] = [
        {
            label: (
                <p className="flex items-center justify-start gap-2 font-bold">
                    Nguyễn Đình Hào
                </p>
            ),
            key: '0',
        },
        {
            type: 'divider',
        },
        {
            label: (
                <p className="flex items-center justify-start gap-2">
                    <User2Icon size={18} />
                    Profile
                </p>
            ),
            key: '1',
        },
        {
            label: (
                <p className="flex items-center justify-start gap-2">
                    <Settings size={18} />
                    Setting
                </p>
            ),
            key: '2',
        },
        {
            type: 'divider',
        },
        {
            label: (
                <p
                    onClick={handleLogOut}
                    className="flex items-center justify-start gap-2"
                >
                    <LogOutIcon size={18} />
                    Logout
                </p>
            ),
            key: '3',
        },
    ];
    return (
        <div style={{ marginLeft: '.5rem' }}>
            <Dropdown menu={{ items }} trigger={['click']}>
                <Avatar
                    style={{ cursor: 'pointer', backgroundColor: '#f56a00' }}
                    size="default"
                >
                    H
                </Avatar>
            </Dropdown>
        </div>
    );
}
