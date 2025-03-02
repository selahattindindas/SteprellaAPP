import { ListProductVariantDetail } from "../product-variants/list-product-variant-detail";

export interface ListCartItem {
    id: number;
    inStock: boolean;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    sizeId: number;
    sizeValue: number;
    product: ListProductVariantDetail;
}