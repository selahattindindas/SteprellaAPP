import { ListProductVariantDetail } from "../product-variants/list-product-variant-detail";

export interface ListCartItem{
    id: number;
    cartId: number;
    inStock: boolean;
    productVariantSizeValue: number;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    productVariant: ListProductVariantDetail;
}