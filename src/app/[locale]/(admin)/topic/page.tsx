'use client';
import TopicHeader from '@/modules/topic/components/topic-header';
import TopicTable from '@/modules/topic/components/topic-table';
import { TopicData } from '@/modules/topic/types';

export default function Topic() {
    const data: TopicData[] = [
        {
            id: '1',
            parentId: '0',
            code: 'A',
            decription: 'Parent 1',
            note: 'Note for Parent 1',
            order: 1,
            dateCreated: '2023-08-31',
            dateUpdated: '2023-09-01',
            children: [
                {
                    id: '2',
                    parentId: '1',
                    code: 'A.1',
                    decription: 'Child 1.1',
                    note: 'Note for Child 1.1',
                    order: 1,
                    dateCreated: '2023-09-01',
                    dateUpdated: '2023-09-02',
                },
                {
                    id: '3',
                    parentId: '1',
                    code: 'A.2',
                    decription: 'Child 1.2',
                    note: 'Note for Child 1.2',
                    order: 2,
                    dateCreated: '2023-09-03',
                    dateUpdated: '2023-09-04',
                },
            ],
        },
        {
            id: '4',
            parentId: '0',
            code: 'B',
            decription: 'Parent 2',
            note: 'Note for Parent 2',
            order: 2,
            dateCreated: '2023-09-05',
            dateUpdated: '2023-09-06',
            children: [
                {
                    id: '5',
                    parentId: '4',
                    code: 'B.1',
                    decription: 'Child 2.1',
                    note: 'Note for Child 2.1',
                    order: 1,
                    dateCreated: '2023-09-07',
                    dateUpdated: '2023-09-08',
                    children: [
                        {
                            id: '6',
                            parentId: '5',
                            code: 'B.1.1',
                            decription: 'Child 2.1.1',
                            note: 'Note for Child 2.1.1',
                            order: 1,
                            dateCreated: '2023-09-09',
                            dateUpdated: '2023-09-10',
                        },
                    ],
                },
            ],
        },
    ];

    const onDragEnd = () => {};

    return (
        <div>
            <TopicHeader />
            <TopicTable dataSource={data} onDragEnd={onDragEnd} />
        </div>
    );
}
