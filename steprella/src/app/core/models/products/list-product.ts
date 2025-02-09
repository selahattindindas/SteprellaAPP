import { ListCategory } from "../categories/list-category";
import { ListComment } from "../comments/list-comment";
import { ListFeature } from "../features/list-feature";
import { ListProductVariant } from "../product-variants/list-product-variant";

export interface ListProduct {
    id: number;
    price: number;
    ratingCount: number;
    rating: number;
    description: string;
    brandName: string;
    shoeModelName: string;
    materialName: string;
    usageAreaName: string;
    category: ListCategory;
    productComments: ListComment[]; 
    productVariants: ListProductVariant[];
    features: ListFeature[];
    createdDate?: string;
    updatedDate?: string;
}
