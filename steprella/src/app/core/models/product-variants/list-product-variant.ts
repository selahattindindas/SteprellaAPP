import { ListFile } from "../files/list-file";
import { ListSize } from "../sizes/list-size";

export interface ListProductVariant {
    id: number;
    colorName: string;
    active: boolean;
    isFavorite: boolean;
    productSizes: ListSize[];
    productFiles: ListFile[];
}
