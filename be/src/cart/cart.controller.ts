import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/user/decorator/currentUser.decorator';
import { CartService } from './cart.service';
import { CreateCartItemDTO } from './dto/create-cart.dto';

@Controller('cart')
@ApiTags('Cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('')
  getCart(@Query('userId') userId: string, @Query('guestId') guestId: string) {
    return this.cartService.getCart({ userId, guestId });
  }

  @Post('')
  createCart(@Body() cart: CreateCartItemDTO) {
    return this.cartService.createCart(cart);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/merge')
  mergeCart(@Body() cart: CreateCartItemDTO, @CurrentUser() curuserId) {
    const userId = curuserId.user.id;
    return this.cartService.mergeCart(cart, userId);
  }

  @Put('')
  updateCart(@Body() cart: CreateCartItemDTO) {
    return this.cartService.updateCart(cart);
  }

  @Delete('')
  deleteCart(@Body() cart: CreateCartItemDTO) {
    return this.cartService.deleteCart(cart);
  }
}
