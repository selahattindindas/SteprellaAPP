import { ListFile } from "../files/list-file";

export interface ListProductVariantDetail {
    variantId: number;
    colorName: string;
    rating: number;
    ratingCount: number;
    description: string;
    brandName: string;
    shoeModelName: string;
    materialName: string;
    usageAreaName: string;
    productImages: ListFile[];
}
