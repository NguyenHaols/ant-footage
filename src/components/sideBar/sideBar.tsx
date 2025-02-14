import Sider from 'antd/es/layout/Sider';
import SideBarHeader from './sideBar-header';
import SideBarMenu from './sideBar-menu';

interface SideBarProps {
    open: boolean;
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
        borderRight: '1px solid hsl(var(--border))',
        backgroundColor: 'var(--sidebar-background)',
        color: 'var(--sidebar-foreground)',
    };
    return (
        <Sider
            style={siderStyle}
            theme="light"
            trigger={null}
            collapsible
            collapsed={open}
            width={'255px'}
            collapsedWidth={'3rem'}
        >
            <div className="flex h-full flex-col justify-between text-sidebar-foreground">
                <div>
                    <SideBarHeader open={open} />
                    <SideBarMenu open={open} />
                </div>
            </div>
        </Sider>
    );
}
