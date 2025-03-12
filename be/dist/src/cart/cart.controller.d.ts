import { CartService } from './cart.service';
import { CreateCartItemDTO } from './dto/create-cart.dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getCart(userId: string, guestId: string): Promise<{
        status: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../../Schemas/cart.schema").Cart> & import("../../Schemas/cart.schema").Cart & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    createCart(cart: CreateCartItemDTO): Promise<{
        status: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../../Schemas/cart.schema").Cart> & import("../../Schemas/cart.schema").Cart & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    mergeCart(cart: CreateCartItemDTO, curuserId: any): Promise<{
        status: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../../Schemas/cart.schema").Cart> & import("../../Schemas/cart.schema").Cart & Required<{
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
    updateCart(cart: CreateCartItemDTO): Promise<{
        status: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../../Schemas/cart.schema").Cart> & import("../../Schemas/cart.schema").Cart & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    deleteCart(cart: CreateCartItemDTO): Promise<{
        status: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../../Schemas/cart.schema").Cart> & import("../../Schemas/cart.schema").Cart & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
}
