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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const roles_guard_1 = require("../middleware/roles.guard");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const product_service_1 = require("./product.service");
let ProductController = class ProductController {
    productService;
    constructor(productService) {
        this.productService = productService;
    }
    async getAllProducts(category, brand, material, gender, color, size, minReviews, minPrice, maxPrice, sortBy, order = 'asc', page = 1, limit = 10, accessPublic) {
        return await this.productService.getAllProducts({
            category,
            brand,
            gender,
            color,
            size,
            material,
            minPrice,
            maxPrice,
            sortBy,
            order,
            page,
            limit,
            accessPublic,
        });
    }
    getProductById(id) {
        return this.productService.getProductById(id);
    }
    getSimilarProducts(id) {
        return this.productService.getSimilarProducts(id);
    }
    getBestSellerProducts() {
        return this.productService.getBestSellerProducts();
    }
    getNewArrivalProducts() {
        return this.productService.getNewArrivalProducts();
    }
    createProduct(prod) {
        return this.productService.createProduct(prod);
    }
    updateProduct(prod, id) {
        return this.productService.updateProduct(prod, id);
    }
    deleteProductById(id) {
        return this.productService.deleteProductById(id);
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Get)('/get-products'),
    __param(0, (0, common_1.Query)('category')),
    __param(1, (0, common_1.Query)('brand')),
    __param(2, (0, common_1.Query)('material')),
    __param(3, (0, common_1.Query)('gender')),
    __param(4, (0, common_1.Query)('color')),
    __param(5, (0, common_1.Query)('size')),
    __param(6, (0, common_1.Query)('minReviews')),
    __param(7, (0, common_1.Query)('minPrice')),
    __param(8, (0, common_1.Query)('maxPrice')),
    __param(9, (0, common_1.Query)('sortBy')),
    __param(10, (0, common_1.Query)('order')),
    __param(11, (0, common_1.Query)('page')),
    __param(12, (0, common_1.Query)('limit')),
    __param(13, (0, common_1.Query)('accessPublic')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, Number, Number, Number, String, String, Number, Number, Boolean]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAllProducts", null);
__decorate([
    (0, common_1.Get)('/get-product/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getProductById", null);
__decorate([
    (0, common_1.Get)('/similar/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getSimilarProducts", null);
__decorate([
    (0, common_1.Get)('/best-seller'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getBestSellerProducts", null);
__decorate([
    (0, common_1.Get)('/new-arrivals'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getNewArrivalProducts", null);
__decorate([
    (0, common_1.UseGuards)(new roles_guard_1.RolesGuard(['admin'])),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/create-product'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.ProductDTO]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, common_1.UseGuards)(new roles_guard_1.RolesGuard(['admin'])),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.HttpCode)(200),
    (0, common_1.Put)('/update-product/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_product_dto_1.UpdateProductDTO, String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.UseGuards)(new roles_guard_1.RolesGuard(['admin'])),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.HttpCode)(200),
    (0, common_1.Delete)('/delete-product/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "deleteProductById", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)('product'),
    (0, swagger_1.ApiTags)('Product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
//# sourceMappingURL=product.controller.js.map