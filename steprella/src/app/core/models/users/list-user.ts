import { ListAddress } from "../addresses/list-address";

export interface ListUser {
    id: number;
    email: string;
    fullName: string;
    phone: string;
    gender: string;
    addresses: ListAddress[];
}
