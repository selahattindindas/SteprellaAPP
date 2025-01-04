import { ListCategory } from "../categories/list-category";

export interface ListProduct {
    id: number;
    description: string;
    brandName: string;
    shoeModelName: string;
    category: ListCategory;
    price: number;
    createdDate?: string;
    updatedDate?: string;
}
