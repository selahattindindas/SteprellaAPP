import { ListFile } from "../files/list-file";

export interface ListProductVariantDetail {
    productId: number;
    variantId: number;
    colorName: string;
    price: number;
    rating: number;
    ratingCount: number;
    description: string;
    brandName: string;
    shoeModelName: string;
    usageAreaName: string;
    productImages: ListFile[];
}
