declare class Image {
    url: string;
    altText: string;
}
declare class Dimensions {
    length: number;
    width: number;
    height: number;
}
export declare class UpdateProductDTO {
    _id: string;
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
    user: string;
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    dimensions: Dimensions;
    weight: number;
}
export {};
