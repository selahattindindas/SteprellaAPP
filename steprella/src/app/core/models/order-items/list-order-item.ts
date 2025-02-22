import { ListProductVariantDetail } from "../product-variants/list-product-variant-detail";

export interface ListOrderItem{
    id: number;
    orderId: number;
    sizeValue: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    variant: ListProductVariantDetail;
}