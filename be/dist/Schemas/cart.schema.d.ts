import { Document, Types } from 'mongoose';
export declare class CartItems extends Document {
    productId: Types.ObjectId;
    name: string;
    image: string;
    price: string;
    size: string;
    color: string;
    quantity: number;
}
export declare const CartItemsSchema: import("mongoose").Schema<CartItems, import("mongoose").Model<CartItems, any, any, any, Document<unknown, any, CartItems> & CartItems & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CartItems, Document<unknown, {}, import("mongoose").FlatRecord<CartItems>> & import("mongoose").FlatRecord<CartItems> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare class Cart extends Document {
    user: Types.ObjectId;
    guestId?: string;
    products: Types.DocumentArray<CartItems>;
    totalPrice: number;
}
export declare const CartSchema: import("mongoose").Schema<Cart, import("mongoose").Model<Cart, any, any, any, Document<unknown, any, Cart> & Cart & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Cart, Document<unknown, {}, import("mongoose").FlatRecord<Cart>> & import("mongoose").FlatRecord<Cart> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
