import * as mongoose from 'mongoose';
import { Document, Types } from 'mongoose';
export declare class CheckoutItem {
    productId: Types.ObjectId;
    name: string;
    image: string;
    price: number;
    quantity: number;
    size: string;
    color: string;
}
export declare const CheckoutItemSchema: mongoose.Schema<CheckoutItem, mongoose.Model<CheckoutItem, any, any, any, mongoose.Document<unknown, any, CheckoutItem> & CheckoutItem & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, CheckoutItem, mongoose.Document<unknown, {}, mongoose.FlatRecord<CheckoutItem>> & mongoose.FlatRecord<CheckoutItem> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare class Checkout extends Document {
    userId: Types.ObjectId;
    checkoutItems: CheckoutItem[];
    shippingAddress: {
        address: string;
        city: string;
        postalCode: string;
        country: string;
    };
    paymentMethod: string;
    totalPrice: number;
    isPaid: boolean;
    paidAt?: Date;
    paymentStatus: string;
    paymentDetails?: any;
    isFinallized: boolean;
    finallizedAt?: Date;
}
export declare const CheckoutSchema: mongoose.Schema<Checkout, mongoose.Model<Checkout, any, any, any, mongoose.Document<unknown, any, Checkout> & Checkout & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Checkout, mongoose.Document<unknown, {}, mongoose.FlatRecord<Checkout>> & mongoose.FlatRecord<Checkout> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
