import { Model } from 'mongoose';
import { Cart } from 'Schemas/cart.schema';
import { Product } from 'Schemas/product.schema';
import { CreateCartItemDTO } from './dto/create-cart.dto';
export declare class CartService {
    private readonly cartModel;
    private productModel;
    constructor(cartModel: Model<Cart>, productModel: Model<Product>);
    createCart(cartDTO: CreateCartItemDTO): Promise<{
        status: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, Cart> & Cart & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    updateCart(cartDTO: CreateCartItemDTO): Promise<{
        status: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, Cart> & Cart & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    deleteCart(cartDTO: CreateCartItemDTO): Promise<{
        status: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, Cart> & Cart & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    getCart(cartDTO: {
        userId?: string;
        guestId?: string;
    }): Promise<{
        status: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, Cart> & Cart & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    mergeCart(cartDTO: CreateCartItemDTO, curuserId: any): Promise<{
        status: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, Cart> & Cart & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    } | {
        status: number;
        message: string;
        data: {
            products: never[];
            totalPrice: number;
        };
    }>;
}
