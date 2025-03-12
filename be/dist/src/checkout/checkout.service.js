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
exports.CheckoutService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cart_schema_1 = require("../../Schemas/cart.schema");
const checkout_schema_1 = require("../../Schemas/checkout.schema");
const order_shema_1 = require("../../Schemas/order.shema");
const product_schema_1 = require("../../Schemas/product.schema");
let CheckoutService = class CheckoutService {
    checkoutModel;
    cartModel;
    productModel;
    orderModel;
    constructor(checkoutModel, cartModel, productModel, orderModel) {
        this.checkoutModel = checkoutModel;
        this.cartModel = cartModel;
        this.productModel = productModel;
        this.orderModel = orderModel;
    }
    async checkout(checkoutDTO, userId) {
        const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = checkoutDTO;
        if (!checkoutItems || checkoutItems.length === 0) {
            throw new common_1.HttpException('no items in checkout', common_1.HttpStatus.NOT_FOUND);
        }
        try {
            const newCheckout = await this.checkoutModel.create({
                userId: userId,
                checkoutItems: checkoutItems,
                shippingAddress: shippingAddress,
                paymentMethod: paymentMethod,
                totalPrice: totalPrice,
                paymentStatus: 'Pending',
                isPaid: false,
            });
            console.log('check out created for user: ', userId);
            return {
                status: 200,
                message: 'checkout successful',
                checkout: newCheckout,
            };
        }
        catch (error) {
            throw new common_1.HttpException('checkout failed', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async payCheckout(checkoutDTO, id) {
        const { paymentStatus, paymentDetails } = checkoutDTO;
        try {
            const checkout = await this.checkoutModel.findById({
                _id: id,
            });
            if (!checkout) {
                throw new common_1.HttpException('Checkout not found', common_1.HttpStatus.NOT_FOUND);
            }
            if (paymentStatus === 'paid') {
                checkout.isPaid = true;
                checkout.paymentStatus = paymentStatus;
                checkout.paymentDetails = paymentDetails;
                checkout.paidAt = new Date();
                await checkout.save();
                return {
                    status: 200,
                    message: 'payment successful',
                    checkout: checkout,
                };
            }
            else {
                throw new common_1.HttpException('Invalid payment status', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        catch (error) {
            throw new common_1.HttpException('payment failed', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async finalizeCheckout(id) {
        console.log('finalId', id);
        try {
            const checkout = await this.checkoutModel.findById(id);
            if (!checkout) {
                throw new common_1.HttpException('Checkout not found', common_1.HttpStatus.NOT_FOUND);
            }
            if (checkout.isPaid && !checkout.isFinallized) {
                const finalOrder = await this.orderModel.create({
                    userId: checkout.userId,
                    items: checkout.checkoutItems,
                    shippingAddress: checkout.shippingAddress,
                    paymentMethod: checkout.paymentMethod,
                    totalPrice: checkout.totalPrice,
                    isPaid: true,
                    paidAt: checkout.paidAt,
                    isDelivery: false,
                    paymentStatus: 'paid',
                    paymentDetails: checkout.paymentDetails,
                });
                checkout.isFinallized = true;
                checkout.finallizedAt = new Date();
                await checkout.save();
                await this.cartModel.findOneAndDelete({
                    user: checkout.userId,
                });
                return {
                    status: 200,
                    message: 'finalize successful',
                    checkout: checkout,
                };
            }
            else if (checkout.isFinallized) {
                return {
                    status: 400,
                    message: 'check out is already finalized',
                };
            }
            else {
                throw new common_1.HttpException('Checkout not paid', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        catch (error) {
            console.error('Finalize error:', error);
            throw new common_1.HttpException('Finalize failed', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.CheckoutService = CheckoutService;
exports.CheckoutService = CheckoutService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(checkout_schema_1.Checkout.name)),
    __param(1, (0, mongoose_1.InjectModel)(cart_schema_1.Cart.name)),
    __param(2, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __param(3, (0, mongoose_1.InjectModel)(order_shema_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], CheckoutService);
//# sourceMappingURL=checkout.service.js.map