import { ProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ProductService } from './product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getAllProducts(category?: string, brand?: string, material?: string, gender?: string, color?: string, size?: string, minReviews?: number, minPrice?: number, maxPrice?: number, sortBy?: string, order?: 'asc' | 'desc', page?: number, limit?: number, accessPublic?: boolean): Promise<(import("mongoose").Document<unknown, {}, import("../../Schemas/product.schema").Product> & import("../../Schemas/product.schema").Product & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getProductById(id: string): Promise<import("../../Schemas/product.schema").Product>;
    getSimilarProducts(id: string): Promise<import("../../Schemas/product.schema").Product[]>;
    getBestSellerProducts(): Promise<(import("mongoose").Document<unknown, {}, import("../../Schemas/product.schema").Product> & import("../../Schemas/product.schema").Product & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | undefined>;
    getNewArrivalProducts(): Promise<(import("mongoose").Document<unknown, {}, import("../../Schemas/product.schema").Product> & import("../../Schemas/product.schema").Product & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    createProduct(prod: ProductDTO): Promise<{
        statusCode: number;
        message: string;
        product: import("mongoose").Document<unknown, {}, import("../../Schemas/product.schema").Product> & import("../../Schemas/product.schema").Product & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    updateProduct(prod: UpdateProductDTO, id: string): Promise<{
        statusCode: number;
        message: string;
        product: (import("mongoose").Document<unknown, {}, import("../../Schemas/product.schema").Product> & import("../../Schemas/product.schema").Product & Required<{
            _id: unknown;
        }> & {
            __v: number;
        }) | null;
    }>;
    deleteProductById(id: string): Promise<{
        statusCode: number;
        message: string;
        product: (import("mongoose").Document<unknown, {}, import("../../Schemas/product.schema").Product> & import("../../Schemas/product.schema").Product & Required<{
            _id: unknown;
        }> & {
            __v: number;
        }) | null;
    }>;
}
