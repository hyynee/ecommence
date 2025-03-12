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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cart_schema_1 = require("../../Schemas/cart.schema");
const product_schema_1 = require("../../Schemas/product.schema");
let CartService = class CartService {
    cartModel;
    productModel;
    constructor(cartModel, productModel) {
        this.cartModel = cartModel;
        this.productModel = productModel;
    }
    async createCart(cartDTO) {
        const { productId, quantity, price, size, color, guestId, userId } = cartDTO;
        const product = await this.productModel.findById(productId);
        if (!product) {
            throw new common_1.HttpException('Product not found', common_1.HttpStatus.NOT_FOUND);
        }
        const query = userId
            ? { user: userId }
            : { guestId: guestId || `guest_${new Date().getTime()}` };
        let cart = await this.cartModel.findOne(query).exec();
        if (cart) {
            const prodIndex = cart.products.findIndex((prod) => prod.productId.toString() === productId.toString() &&
                prod.size === size &&
                prod.color === color);
            if (prodIndex > -1) {
                cart.products[prodIndex].quantity += quantity;
            }
            else {
                cart.products.push({
                    productId,
                    quantity,
                    size,
                    color,
                    price: product.price,
                    name: product.name,
                    image: product.images[0].url,
                });
            }
            cart.totalPrice = Number(cart.products.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0));
            await cart.save();
        }
        else {
            cart = await this.cartModel.create({
                user: userId ? userId : undefined,
                guestId: guestId || `guest_${new Date().getTime()}`,
                products: [
                    {
                        productId,
                        quantity,
                        size,
                        color,
                        price: product.price,
                        name: product.name,
                        image: product.images[0].url,
                    },
                ],
                totalPrice: Number(product.price) * quantity,
            });
        }
        return {
            status: 200,
            message: cart ? 'Product updated in cart' : 'Product added to cart',
            data: cart,
        };
    }
    async updateCart(cartDTO) {
        const { productId, quantity, size, color, guestId, userId } = cartDTO;
        try {
            const query = userId ? { user: userId } : { guestId };
            let cart = await this.cartModel.findOne(query);
            if (!cart) {
                throw new common_1.HttpException('Cart not found', common_1.HttpStatus.NOT_FOUND);
            }
            const productIndex = await cart.products.findIndex((prod) => prod.productId.toString() === productId.toString() &&
                prod.size === size &&
                prod.color === color);
            if (productIndex > -1) {
                if (quantity > 0) {
                    cart.products[productIndex].quantity = quantity;
                }
                else {
                    cart.products.splice(productIndex, 1);
                }
            }
            cart.totalPrice = Number(cart.products.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0));
            await cart.save();
            return {
                status: 200,
                message: 'Product updated in cart',
                data: cart,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteCart(cartDTO) {
        const { productId, quantity, size, color, guestId, userId } = cartDTO;
        try {
            const query = userId ? { user: userId } : { guestId };
            let cart = await this.cartModel.findOne(query);
            if (!cart) {
                throw new common_1.HttpException('Cart not found', common_1.HttpStatus.NOT_FOUND);
            }
            const prodIndex = cart.products.findIndex((prod) => prod.productId.toString() === productId.toString() &&
                prod.size === size &&
                prod.color === color);
            if (prodIndex > -1) {
                cart.products.splice(prodIndex, 1);
                cart.totalPrice = Number(cart.products.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0));
            }
            await cart.save();
            return {
                status: 200,
                message: 'Product removed from cart',
                data: cart,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getCart(cartDTO) {
        const { guestId, userId } = cartDTO;
        const query = userId ? { user: userId } : { guestId };
        try {
            const cart = await this.cartModel.findOne(query).exec();
            if (cart) {
                return {
                    status: 200,
                    message: 'Cart retrieved successfully',
                    data: cart,
                };
            }
            else {
                throw new common_1.HttpException('Cart not found', common_1.HttpStatus.NOT_FOUND);
            }
        }
        catch (err) {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async mergeCart(cartDTO, curuserId) {
        const { guestId } = cartDTO;
        try {
            const guestCart = await this.cartModel.findOne({ guestId });
            const userCart = await this.cartModel.findOne({ user: curuserId });
            if (!guestCart) {
                if (userCart) {
                    return {
                        status: 200,
                        message: 'Guest cart has already been merged, returning user cart',
                        data: userCart,
                    };
                }
                return {
                    status: 200,
                    message: 'No guest cart, returning empty cart',
                    data: { products: [], totalPrice: 0 },
                };
            }
            if (guestCart.products.length === 0) {
                throw new common_1.HttpException('Guest cart is empty', common_1.HttpStatus.NOT_FOUND);
            }
            if (userCart) {
                guestCart.products.forEach((guestItem) => {
                    const prodIndex = userCart.products.findIndex((item) => item.productId.toString() === guestItem.productId.toString() &&
                        item.size === guestItem.size &&
                        item.color === guestItem.color);
                    if (prodIndex > -1) {
                        userCart.products[prodIndex].quantity += guestItem.quantity;
                    }
                    else {
                        userCart.products.push(guestItem);
                    }
                });
                userCart.totalPrice = Number(userCart.products.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0));
                await userCart.save();
                try {
                    await this.cartModel.findOneAndDelete({ guestId });
                }
                catch (err) {
                    console.log('Error deleting guest cart: ', err);
                }
                return {
                    status: 200,
                    message: 'Cart merged successfully',
                    data: userCart,
                };
            }
            else {
                if (!curuserId) {
                    throw new common_1.HttpException('User ID is required to assign guest cart', common_1.HttpStatus.BAD_REQUEST);
                }
                guestCart.user = curuserId;
                guestCart.guestId = undefined;
                await guestCart.save();
                return {
                    status: 200,
                    message: 'Guest cart assigned to user successfully',
                    data: guestCart,
                };
            }
        }
        catch (err) {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(cart_schema_1.Cart.name)),
    __param(1, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CartService);
//# sourceMappingURL=cart.service.js.map