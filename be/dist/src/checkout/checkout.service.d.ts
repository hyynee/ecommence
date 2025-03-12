import { Model } from 'mongoose';
import { Cart } from 'Schemas/cart.schema';
import { Checkout } from 'Schemas/checkout.schema';
import { Order } from 'Schemas/order.shema';
import { Product } from 'Schemas/product.schema';
import { CheckoutDTO, CreateCheckoutDTO } from './dto/create-checkout.dto';
export declare class CheckoutService {
    private readonly checkoutModel;
    private readonly cartModel;
    private productModel;
    private orderModel;
    constructor(checkoutModel: Model<Checkout>, cartModel: Model<Cart>, productModel: Model<Product>, orderModel: Model<Order>);
    checkout(checkoutDTO: CreateCheckoutDTO, userId: string): Promise<{
        status: number;
        message: string;
        checkout: import("mongoose").Document<unknown, {}, Checkout> & Checkout & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    payCheckout(checkoutDTO: CheckoutDTO, id: string): Promise<{
        status: number;
        message: string;
        checkout: import("mongoose").Document<unknown, {}, Checkout> & Checkout & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    finalizeCheckout(id: string): Promise<{
        status: number;
        message: string;
        checkout: import("mongoose").Document<unknown, {}, Checkout> & Checkout & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    } | {
        status: number;
        message: string;
        checkout?: undefined;
    }>;
}
