import { ListFile } from "../files/list-file";

export interface ListProductVariantDetail {
    id: number;
    ratingCount: number;
    rating: number;
    description: string;
    brandName: string;
    shoeModelName: string;
    materialName: string;
    usageAreaName: string;
    colorName: string;
    active: boolean;
    productFiles: ListFile[];
}
