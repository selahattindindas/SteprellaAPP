import { ListProductVariantDetail } from "../product-variants/list-product-variant-detail";

export interface ListCartItem {
    id: number;
    inStock: boolean;
    productVariantSizeId: number;
    productVariantSizeValue: number;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    productVariant: ListProductVariantDetail;
}