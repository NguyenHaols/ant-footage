import { Pagination, PaginationProps } from 'antd';

interface AppPaginationProps extends PaginationProps {}

export default function AppPagination({ ...props }: AppPaginationProps) {
    return (
        <div className={'py-4'}>
            <Pagination {...props} />
        </div>
    );
}
