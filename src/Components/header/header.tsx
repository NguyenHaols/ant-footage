import { Button } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { PanelLeftClose, PanelRightClose } from 'lucide-react';
import LanguageSelect from '../language';
import HeaderProfile from './headerProfile';

interface HeaderLayoutProps {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
}

export default function HeaderLayout({
    collapsed,
    setCollapsed,
}: HeaderLayoutProps) {
    return (
        <div>
            <Header
                className="flex w-full items-center justify-between"
                style={{
                    padding: 16,
                    backgroundColor: '#fff',
                    borderBottom: '1px solid hsl(var(--border))',
                }}
            >
                <Button
                    type="text"
                    icon={
                        collapsed ? (
                            <PanelLeftClose size={18} />
                        ) : (
                            <PanelRightClose size={18} />
                        )
                    }
                    onClick={() => setCollapsed(!collapsed)}
                />

                <div className="flex items-center gap-2">
                    <LanguageSelect />
                    <HeaderProfile />
                </div>
            </Header>
        </div>
    );
}
