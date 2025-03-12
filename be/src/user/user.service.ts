import { HttpException, HttpStatus, Injectable, Request } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from 'Schemas/user.schema';
import { UserDto } from './dto/create-user.dto';
import { LoginDTO } from './dto/login.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(
    createUserDto: UserDto,
  ): Promise<{ user: User; token: string }> {
    const { email } = createUserDto;
    try {
      const user = await this.userModel.findOne({ email });
      if (user) {
        throw new HttpException(
          { statusCode: 400, message: 'Email already exists' },
          HttpStatus.BAD_REQUEST,
        );
      }
      const newUser = new this.userModel(createUserDto);
      await newUser.save();
      // create jwt payload
      const payload = { user: { id: newUser.id, role: newUser.role } };
      // sign and return the token
      const token = this.jwtService.sign(payload);
      // console.log("token",token);
      return { user: newUser, token };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { statusCode: 500, message: 'Internal Server Error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async login(login: LoginDTO): Promise<{ user: User; token: string }> {
    const { email, password } = login;
    try {
      const user = await this.userModel.findOne({
        email,
      });
      if (!user) {
        throw new HttpException(
          { statusCode: 400, message: 'Invalid credentials' },
          HttpStatus.BAD_REQUEST,
        );
      }
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        throw new HttpException(
          { statusCode: 400, message: 'Invalid credentials' },
          HttpStatus.BAD_REQUEST,
        );
      }
      const payload = { user: { id: user.id, role: user.role } };
      // sign and return the token
      const token = this.jwtService.sign(payload);
      return { user: user, token };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { statusCode: 500, message: 'Internal Server Error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getCurrentUser(@Request() req) {
    return req.currentUser;
  }
  async getUserById(id: string) {
    const user = await this.userModel.findById(id);
    return user;
  }

  // Admin
  async getAllUser() {
    const users = await this.userModel.find();
    return users;
  }
  async createUser(createUserDto: UserDto) {
    const { email } = createUserDto;
    try {
      const user = await this.userModel.findOne({ email });
      if (user) {
        throw new HttpException(
          { statusCode: 400, message: 'Email already exists' },
          HttpStatus.BAD_REQUEST,
        );
      }
      const newUser = await this.userModel.create(createUserDto);
      return newUser;
    } catch (err) {
      console.log('err', err);
      throw new HttpException(
        { statusCode: 500, message: 'Internal Server Error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async updateUser(id: string, userDto: UserDto) {
    try {
      const user = await this.userModel.findById(id);
      if (user) {
        const updateData: any = {
          name: userDto.name || user.name,
          email: userDto.email || user.email,
          role: userDto.role || user.role,
        };
        if (userDto.password) {
          const salt = await bcrypt.genSalt(10);
          updateData.password = await bcrypt.hash(userDto.password, salt);
        }
        const updatedUser = await this.userModel.findByIdAndUpdate(
          id,
          { $set: updateData }, //  updateData
          { new: true }, // cập nhật data liền
        );
        return {
          status: 200,
          message: 'User updated successfully',
          user: updatedUser,
        };
      }
      return {
        status: 404,
        message: 'User not found',
      };
    } catch (err) {
      console.error('Error updating user:', err);
      return {
        status: 400,
        message: err.message || 'Internal server error',
      };
    }
  }

  async deleteUser(id: string) {
    try {
      const deletedUser = await this.userModel.findById(id);
      if (deletedUser) {
        await deletedUser.deleteOne();
        return {
          status: 200,
          message: 'User deleted successfully',
        };
      }
      return {
        status: 404,
        message: 'User not found',
      };
    } catch (err) {
      console.error('Error deleting user:', err);
      return {
        status: 400,
        message: err.message || 'Internal server error',
      };
    }
  }
}
