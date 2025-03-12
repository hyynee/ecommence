import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/middleware/roles.guard';
import { CurrentUser } from 'src/user/decorator/currentUser.decorator';
import { OrderDTO } from './dto/create-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // Admin
  // @Get
  @UseGuards(new RolesGuard(['admin']))
  @UseGuards(AuthGuard('jwt'))
  @Get('/all')
  getAllOrders() {
    return this.orderService.getAllOrders();
  }
  @UseGuards(new RolesGuard(['admin']))
  @UseGuards(AuthGuard('jwt'))
  @Put('/update/:id')
  updateOrder(@Param('id') id: string, @Body() orderDTO: OrderDTO) {
    return this.orderService.updateOrder(id, orderDTO);
  }

  @UseGuards(new RolesGuard(['admin']))
  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete/:id')
  deleteOrder(@Param('id') id: string) {
    return this.orderService.deleteOrder(id);
  }

  // @Get /myorders
  @UseGuards(AuthGuard('jwt'))
  @Get('myorders')
  getMyOrders(@CurrentUser() data) {
    const userId = data.user.id;
    return this.orderService.getMyOrders(userId);
  }

  // GET /:id
  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.orderService.orDerById(id);
  }
}
