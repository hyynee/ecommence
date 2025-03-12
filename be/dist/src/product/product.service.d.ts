import { Model } from 'mongoose';
import { Product } from 'Schemas/product.schema';
import { ProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
export declare class ProductService {
    private readonly productModel;
    constructor(productModel: Model<Product>);
    getAllProducts(filters: any): Promise<(import("mongoose").Document<unknown, {}, Product> & Product & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getProductById(id: string): Promise<Product>;
    getSimilarProducts(id: string): Promise<Product[]>;
    getBestSellerProducts(): Promise<(import("mongoose").Document<unknown, {}, Product> & Product & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | undefined>;
    getNewArrivalProducts(): Promise<(import("mongoose").Document<unknown, {}, Product> & Product & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    createProduct(prod: ProductDTO): Promise<{
        statusCode: number;
        message: string;
        product: import("mongoose").Document<unknown, {}, Product> & Product & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    updateProduct(prod: UpdateProductDTO, id: string): Promise<{
        statusCode: number;
        message: string;
        product: (import("mongoose").Document<unknown, {}, Product> & Product & Required<{
            _id: unknown;
        }> & {
            __v: number;
        }) | null;
    }>;
    deleteProductById(id: string): Promise<{
        statusCode: number;
        message: string;
        product: (import("mongoose").Document<unknown, {}, Product> & Product & Required<{
            _id: unknown;
        }> & {
            __v: number;
        }) | null;
    }>;
}
