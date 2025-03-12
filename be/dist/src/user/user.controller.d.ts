import { UserDto } from './dto/create-user.dto';
import { LoginDTO } from './dto/login.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(createUserDto: UserDto): Promise<{
        user: import("../../Schemas/user.schema").User;
        token: string;
    }>;
    login(login: LoginDTO): Promise<{
        user: import("../../Schemas/user.schema").User;
        token: string;
    }>;
    getCurrentUser(CurrentUser: any): Promise<(import("mongoose").Document<unknown, {}, import("../../Schemas/user.schema").User> & import("../../Schemas/user.schema").User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    getAllUser(headers: any): Promise<(import("mongoose").Document<unknown, {}, import("../../Schemas/user.schema").User> & import("../../Schemas/user.schema").User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    createUser(createUserDto: UserDto): Promise<import("mongoose").Document<unknown, {}, import("../../Schemas/user.schema").User> & import("../../Schemas/user.schema").User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateUser(user: UserDto, id: string): Promise<{
        status: number;
        message: string;
        user: (import("mongoose").Document<unknown, {}, import("../../Schemas/user.schema").User> & import("../../Schemas/user.schema").User & Required<{
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
