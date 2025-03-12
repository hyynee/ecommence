import mongoose, { Document } from 'mongoose';
declare class Image {
    url: string;
    altText: string;
}
export declare class Product extends Document {
    name: string;
    description: string;
    price: number;
    discountPrice: number;
    countInStock: number;
    sku: string;
    category: string;
    brand: string;
    sizes: string[];
    colors: string[];
    collections: string;
    material: string;
    gender: string;
    images: Image[];
    isFeatured: boolean;
    isPublished: boolean;
    rating: number;
    numReviews: number;
    tags: string[];
    user: {
        type: mongoose.Schema.Types.ObjectId;
        ref: 'User';
        required: true;
    };
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    dimensions: {
        length: number;
        width: number;
        height: number;
    };
    weight: number;
}
export declare const ProductSchema: mongoose.Schema<Product, mongoose.Model<Product, any, any, any, mongoose.Document<unknown, any, Product> & Product & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Product, mongoose.Document<unknown, {}, mongoose.FlatRecord<Product>> & mongoose.FlatRecord<Product> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export {};
