import { ListCategory } from "../categories/list-category";
import { ListFeature } from "../features/list-feature";

export interface ListProduct {
    id: number;
    description: string;
    brandName: string;
    shoeModelName: string;
    materialName: string;
    usageAreaName: string;
    category: ListCategory;
    features: ListFeature[];
    price: number;
    createdDate?: string;
    updatedDate?: string;
}
