import { ListComment } from "../comments/list-comment";
import { ListFile } from "../files/list-file";
import { ListProduct } from "../products/list-product";
import { ListSize } from "../sizes/list-size";

export interface ListProductVariant extends ListProduct {
    colorName: string;
    active: boolean;
    ratingCount: number;
    rating: number;
    productSizes: ListSize[];
    productComments: ListComment[]; 
    productFiles: ListFile[];
}
