export interface TopicData {
    id: string;
    parentId: string;
    code: string;
    decription: string;
    note: string;
    order: number;
    children?: TopicData[];
    dateCreated: string;
    dateUpdated: string;
}
