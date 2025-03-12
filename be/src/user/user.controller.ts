import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/middleware/roles.guard';
import { CurrentUser } from './decorator/currentUser.decorator';
import { UserDto } from './dto/create-user.dto';
import { LoginDTO } from './dto/login.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(200)
  @Post('register')
  async register(@Body() createUserDto: UserDto) {
    return await this.userService.register(createUserDto);
  }
  @HttpCode(200)
  @Post('login')
  async login(@Body() login: LoginDTO) {
    return await this.userService.login(login);
  }

  @Get('/currentUser')
  @UseGuards(AuthGuard('jwt'))
  getCurrentUser(@CurrentUser() CurrentUser) {
    const userId = CurrentUser.user.id;
    const user = this.userService.getUserById(userId);
    return user;
  }

  // Admin
  @UseGuards(new RolesGuard(['admin']))
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Get('/getAllUser')
  getAllUser(@Headers('token') headers) {
    return this.userService.getAllUser();
  }

  @UseGuards(new RolesGuard(['admin']))
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Post('/createUser')
  createUser(@Body() createUserDto: UserDto) {
    return this.userService.createUser(createUserDto);
  }

  @UseGuards(new RolesGuard(['admin']))
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Put('updateUser/:id')
  updateUser(@Body() user: UserDto, @Param('id') id: string) {
    return this.userService.updateUser(id, user);
  }

  @UseGuards(new RolesGuard(['admin']))
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Delete('deleteUser/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
