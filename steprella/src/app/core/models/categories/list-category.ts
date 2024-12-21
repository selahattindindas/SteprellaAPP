export interface ListCategory {
    id: number;
    name: string;
    parentId: number;
    children: ListCategory[];
}
