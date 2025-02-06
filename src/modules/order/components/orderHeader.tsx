import { Button } from 'antd';
import { Plus } from 'lucide-react';

export default function OrderHeader() {
    return (
        <div
            className="flex items-center justify-between gap-2 px-2 py-1"
            // style={{ padding: '8px 4px' }}
        >
            <div>filter</div>
            <div>
                <Button
                    type="primary"
                    style={{ padding: '4px 8px', height: '40px' }}
                >
                    <Plus size={18} />
                    Create
                </Button>
            </div>
        </div>
    );
}
