import { ListAddress } from "../addresses/list-address";

export interface ListOrder{
    id: number;
    totalPrice: string;
    status: string;
    shippingAddress: ListAddress;
}