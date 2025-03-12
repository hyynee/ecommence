import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from 'Schemas/cart.schema';
import { Product } from 'Schemas/product.schema';
import { CreateCartItemDTO } from './dto/create-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<Cart>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async createCart(cartDTO: CreateCartItemDTO) {
    const { productId, quantity, price, size, color, guestId, userId } =
      cartDTO;
    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    // tìm giỏ hàng
    const query = userId
      ? { user: userId }
      : { guestId: guestId || `guest_${new Date().getTime()}` };
    // giỏ hàng hiện tại
    let cart = await this.cartModel.findOne(query).exec();
    if (cart) {
      const prodIndex = cart.products.findIndex(
        (prod) =>
          prod.productId.toString() === productId.toString() &&
          prod.size === size &&
          prod.color === color,
      );
      if (prodIndex > -1) {
        cart.products[prodIndex].quantity += quantity;
      } else {
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
      cart.totalPrice = Number(
        cart.products.reduce(
          (acc, item) => acc + Number(item.price) * item.quantity,
          0,
        ),
      );
      await cart.save();
    } else {
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

  async updateCart(cartDTO: CreateCartItemDTO) {
    const { productId, quantity, size, color, guestId, userId } = cartDTO;
    try {
      const query = userId ? { user: userId } : { guestId };
      let cart = await this.cartModel.findOne(query);
      if (!cart) {
        throw new HttpException('Cart not found', HttpStatus.NOT_FOUND);
      }
      const productIndex = await cart.products.findIndex(
        (prod) =>
          prod.productId.toString() === productId.toString() &&
          prod.size === size &&
          prod.color === color,
      );
      if (productIndex > -1) {
        if (quantity > 0) {
          cart.products[productIndex].quantity = quantity;
        } else {
          cart.products.splice(productIndex, 1); // remove if quantity = 0
        }
      }
      cart.totalPrice = Number(
        cart.products.reduce(
          (acc, item) => acc + Number(item.price) * item.quantity,
          0,
        ),
      );
      await cart.save();
      return {
        status: 200,
        message: 'Product updated in cart',
        data: cart,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async deleteCart(cartDTO: CreateCartItemDTO) {
    const { productId, quantity, size, color, guestId, userId } = cartDTO;
    try {
      const query = userId ? { user: userId } : { guestId };
      let cart = await this.cartModel.findOne(query);
      if (!cart) {
        throw new HttpException('Cart not found', HttpStatus.NOT_FOUND);
      }
      const prodIndex = cart.products.findIndex(
        (prod) =>
          prod.productId.toString() === productId.toString() &&
          prod.size === size &&
          prod.color === color,
      );
      if (prodIndex > -1) {
        cart.products.splice(prodIndex, 1);
        cart.totalPrice = Number(
          cart.products.reduce(
            (acc, item) => acc + Number(item.price) * item.quantity,
            0,
          ),
        );
      }
      await cart.save();
      return {
        status: 200,
        message: 'Product removed from cart',
        data: cart,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getCart(cartDTO: { userId?: string; guestId?: string }) {
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
      } else {
        throw new HttpException('Cart not found', HttpStatus.NOT_FOUND);
      }
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async mergeCart(cartDTO: CreateCartItemDTO, curuserId) {
    const { guestId } = cartDTO;
    try {
      // Tìm giỏ hàng của guest và user
      const guestCart = await this.cartModel.findOne({ guestId });
      const userCart = await this.cartModel.findOne({ user: curuserId });
      // Không có guest cart
      if (!guestCart) {
        // có userCart => trả về userCart
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
      // Guest cart rỗng => không merge
      if (guestCart.products.length === 0) {
        throw new HttpException('Guest cart is empty', HttpStatus.NOT_FOUND);
      }
      // Có user cart => merge guest cart vào user cart
      if (userCart) {
        guestCart.products.forEach((guestItem) => {
          const prodIndex = userCart.products.findIndex(
            (item) =>
              item.productId.toString() === guestItem.productId.toString() &&
              item.size === guestItem.size &&
              item.color === guestItem.color,
          );
          if (prodIndex > -1) {
            userCart.products[prodIndex].quantity += guestItem.quantity;
          } else {
            userCart.products.push(guestItem);
          }
        });
        userCart.totalPrice = Number(
          userCart.products.reduce(
            (acc, item) => acc + Number(item.price) * item.quantity,
            0,
          ),
        );
        await userCart.save();
        // Xóa guest cart sau khi merge
        try {
          await this.cartModel.findOneAndDelete({ guestId });
        } catch (err) {
          console.log('Error deleting guest cart: ', err);
        }
        return {
          status: 200,
          message: 'Cart merged successfully',
          data: userCart,
        };
      } else {
        // Không có user cart => chuyển guest cart thành user cart
        if (!curuserId) {
          throw new HttpException(
            'User ID is required to assign guest cart',
            HttpStatus.BAD_REQUEST,
          );
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
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
