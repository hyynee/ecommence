"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_schema_1 = require("../../Schemas/product.schema");
let ProductService = class ProductService {
    productModel;
    constructor(productModel) {
        this.productModel = productModel;
    }
    async getAllProducts(filters) {
        const query = {};
        if (filters.category)
            query.category = filters.category;
        if (filters.brand)
            query.brand = filters.brand;
        if (filters.gender)
            query.gender = filters.gender;
        if (filters.color)
            query.colors = { $in: [filters.color] };
        if (filters.size)
            query.sizes = { $in: [filters.size] };
        if (filters.material)
            query.material = filters.material;
        if (filters.minPrice !== undefined)
            query.price = { $gte: filters.minPrice };
        if (filters.maxPrice !== undefined) {
            query.price = query.price || {};
            query.price.$lte = filters.maxPrice;
        }
        if (filters.accessPublic)
            query.isPublished = true;
        let sortOptions = {};
        if (filters.sortBy) {
            if (filters.sortBy === 'priceAsc') {
                sortOptions.price = 1;
            }
            else if (filters.sortBy === 'priceDesc') {
                sortOptions.price = -1;
            }
            else if (filters.sortBy === 'popularity') {
                sortOptions.popularity = -1;
            }
            else {
                sortOptions[filters.sortBy] = filters.order === 'desc' ? -1 : 1;
            }
        }
        const page = Math.max(1, filters.page || 1);
        const limit = Math.max(1, filters.limit || 10);
        const skip = (page - 1) * limit;
        return await this.productModel
            .find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(limit)
            .exec();
    }
    async getProductById(id) {
        try {
            const product = await this.productModel.findById(id);
            if (!product) {
                throw new common_1.HttpException({
                    statusCode: 404,
                    message: `Product with ID ${id} not found`,
                }, common_1.HttpStatus.NOT_FOUND);
            }
            return product;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: 500, message: 'Internal Server Error' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getSimilarProducts(id) {
        try {
            const product = await this.productModel.findById(id);
            if (!product) {
                throw new common_1.HttpException({
                    statusCode: 404,
                    message: `Product with ID ${id} not found`,
                }, common_1.HttpStatus.NOT_FOUND);
            }
            const similarProducts = await this.productModel
                .find({
                _id: { $ne: id },
                gender: product.gender,
                category: product.category,
            })
                .limit(4);
            return similarProducts;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: 500, message: 'Internal Server Error' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getBestSellerProducts() {
        try {
            const bestseller = await this.productModel.findOne().sort({
                rating: -1,
            });
            if (bestseller) {
                return bestseller;
            }
            else {
                throw new common_1.HttpException({
                    statusCode: 404,
                    message: `No BestSeller Product not found`,
                }, common_1.HttpStatus.NOT_FOUND);
            }
        }
        catch (error) { }
    }
    async getNewArrivalProducts() {
        try {
            const newArrivalProducts = await this.productModel
                .find()
                .sort({
                createdAt: -1,
            })
                .limit(8);
            return newArrivalProducts;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: 500, message: 'Internal Server Error' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createProduct(prod) {
        const createdProduct = new this.productModel(prod);
        return {
            statusCode: 200,
            message: 'Create success',
            product: await createdProduct.save(),
        };
    }
    async updateProduct(prod, id) {
        const product = await this.productModel.findById(id);
        if (!product) {
            throw new Error('Product not found');
        }
        const updateData = {};
        Object.keys(prod).forEach((key) => {
            if (prod[key] !== undefined && prod[key] !== null && prod[key] !== '') {
                updateData[key] = prod[key];
            }
        });
        return {
            statusCode: 200,
            message: 'Update success',
            product: await this.productModel.findByIdAndUpdate(id, updateData, {
                new: true,
            }),
        };
    }
    async deleteProductById(id) {
        try {
            const existProd = await this.productModel.findById(id);
            if (!existProd) {
                throw new common_1.HttpException({
                    statusCode: 404,
                    message: `Product with ID ${id} not found`,
                }, common_1.HttpStatus.NOT_FOUND);
            }
            return {
                statusCode: 200,
                message: 'Delete success',
                product: await this.productModel.findByIdAndDelete(id),
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: 500, message: 'Internal Server Error' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductService);
//# sourceMappingURL=product.service.js.map