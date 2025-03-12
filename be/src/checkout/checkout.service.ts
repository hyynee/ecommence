import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from 'Schemas/cart.schema';
import { Checkout } from 'Schemas/checkout.schema';
import { Order } from 'Schemas/order.shema';
import { Product } from 'Schemas/product.schema';
import { CheckoutDTO, CreateCheckoutDTO } from './dto/create-checkout.dto';

@Injectable()
export class CheckoutService {
  constructor(
    @InjectModel(Checkout.name) private readonly checkoutModel: Model<Checkout>,
    @InjectModel(Cart.name) private readonly cartModel: Model<Cart>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Order.name) private orderModel: Model<Order>,
  ) {}

  async checkout(checkoutDTO: CreateCheckoutDTO, userId: string) {
    const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
      checkoutDTO;
    if (!checkoutItems || checkoutItems.length === 0) {
      throw new HttpException('no items in checkout', HttpStatus.NOT_FOUND);
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
    } catch (error) {
      throw new HttpException('checkout failed', HttpStatus.BAD_REQUEST);
    }
  }

  async payCheckout(checkoutDTO: CheckoutDTO, id: string) {
    const { paymentStatus, paymentDetails } = checkoutDTO;
    try {
      const checkout = await this.checkoutModel.findById({
        _id: id,
      });
      if (!checkout) {
        throw new HttpException('Checkout not found', HttpStatus.NOT_FOUND);
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
      } else {
        throw new HttpException(
          'Invalid payment status',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException('payment failed', HttpStatus.BAD_REQUEST);
    }
  }

  async finalizeCheckout(id: string) {
    console.log('finalId', id);
    try {
      const checkout = await this.checkoutModel.findById(id);
      if (!checkout) {
        throw new HttpException('Checkout not found', HttpStatus.NOT_FOUND);
      }
      if (checkout.isPaid && !checkout.isFinallized) {
        // create final order, check out details
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
        // mark the chekout final
        checkout.isFinallized = true;
        checkout.finallizedAt = new Date();
        await checkout.save();
        // delete cart
        await this.cartModel.findOneAndDelete({
          user: checkout.userId,
        });
        return {
          status: 200,
          message: 'finalize successful',
          checkout: checkout,
        };
      } else if (checkout.isFinallized) {
        return {
          status: 400,
          message: 'check out is already finalized',
        };
      } else {
        throw new HttpException('Checkout not paid', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      console.error('Finalize error:', error);
      throw new HttpException('Finalize failed', HttpStatus.BAD_REQUEST);
    }
  }

  
}
