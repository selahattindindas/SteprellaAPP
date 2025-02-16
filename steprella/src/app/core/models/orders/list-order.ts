import { ListAddress } from "../addresses/list-address";
import { ListOrderItem } from "../order-items/list-order-item";

export interface ListOrder{
    id: number;
    totalPrice: string;
    orderNumber: string;
    status: string;
    createdDate: string;
    shippingAddress: ListAddress;
    items: ListOrderItem[];
}