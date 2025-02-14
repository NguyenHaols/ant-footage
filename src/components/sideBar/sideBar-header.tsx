import { ROUTES } from '@/constants';
import { Link } from '@/i18n/routing';
import Title from 'antd/es/typography/Title';
import clsx from 'clsx';
import Image from 'next/image';

interface SideBarHeaderProps {
    open: boolean;
}
export default function SideBarHeader({ open }: SideBarHeaderProps) {
    return (
        <div>
            <Link
                href={ROUTES.USER}
                className="flex h-14 w-full items-center gap-2 p-2 hover:cursor-pointer"
            >
                <Image
                    className="transition-all"
                    src="/logo128.png"
                    alt="logo"
                    style={{
                        objectFit: 'contain',
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
                            marginBottom: 0,
                        }}
                    >
                        ANT GROUP
                    </Title>
                </div>
            </Link>
        </div>
    );
}
