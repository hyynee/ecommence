import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from 'Schemas/user.schema';
import { UserDto } from './dto/create-user.dto';
import { LoginDTO } from './dto/login.dto';
export declare class UserService {
    private readonly userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    register(createUserDto: UserDto): Promise<{
        user: User;
        token: string;
    }>;
    login(login: LoginDTO): Promise<{
        user: User;
        token: string;
    }>;
    getCurrentUser(req: any): Promise<any>;
    getUserById(id: string): Promise<(import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    getAllUser(): Promise<(import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    createUser(createUserDto: UserDto): Promise<import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateUser(id: string, userDto: UserDto): Promise<{
        status: number;
        message: string;
        user: (import("mongoose").Document<unknown, {}, User> & User & Required<{
            _id: unknown;
        }> & {
            __v: number;
        }) | null;
    } | {
        status: number;
        message: any;
        user?: undefined;
    }>;
    deleteUser(id: string): Promise<{
        status: number;
        message: any;
    }>;
}
