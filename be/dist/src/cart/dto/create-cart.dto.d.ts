import { Types } from 'mongoose';
export declare class CreateCartItemDTO {
    productId: Types.ObjectId;
    quantity: number;
    price: string;
    size: string;
    color: string;
    guestId?: Types.ObjectId;
    userId?: Types.ObjectId;
}
