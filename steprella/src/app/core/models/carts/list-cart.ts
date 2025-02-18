import { ListCartItem } from "../cart-items/list-cart-item";

export interface ListCart{
    id: number;
    totalPrice: number;
    totalItems: number;
    cartItems: ListCartItem[];
}