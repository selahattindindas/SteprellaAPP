import { ListProductVariantDetail } from "../product-variants/list-product-variant-detail";

export interface ListOrderItem{
    id: number;
    orderId: number;
    productVariantSizeValue: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    productVariant: ListProductVariantDetail;
}