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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const bcrypt = require("bcrypt");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../../Schemas/user.schema");
let UserService = class UserService {
    userModel;
    jwtService;
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async register(createUserDto) {
        const { email } = createUserDto;
        try {
            const user = await this.userModel.findOne({ email });
            if (user) {
                throw new common_1.HttpException({ statusCode: 400, message: 'Email already exists' }, common_1.HttpStatus.BAD_REQUEST);
            }
            const newUser = new this.userModel(createUserDto);
            await newUser.save();
            const payload = { user: { id: newUser.id, role: newUser.role } };
            const token = this.jwtService.sign(payload);
            return { user: newUser, token };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: 500, message: 'Internal Server Error' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async login(login) {
        const { email, password } = login;
        try {
            const user = await this.userModel.findOne({
                email,
            });
            if (!user) {
                throw new common_1.HttpException({ statusCode: 400, message: 'Invalid credentials' }, common_1.HttpStatus.BAD_REQUEST);
            }
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                throw new common_1.HttpException({ statusCode: 400, message: 'Invalid credentials' }, common_1.HttpStatus.BAD_REQUEST);
            }
            const payload = { user: { id: user.id, role: user.role } };
            const token = this.jwtService.sign(payload);
            return { user: user, token };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: 500, message: 'Internal Server Error' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getCurrentUser(req) {
        return req.currentUser;
    }
    async getUserById(id) {
        const user = await this.userModel.findById(id);
        return user;
    }
    async getAllUser() {
        const users = await this.userModel.find();
        return users;
    }
    async createUser(createUserDto) {
        const { email } = createUserDto;
        try {
            const user = await this.userModel.findOne({ email });
            if (user) {
                throw new common_1.HttpException({ statusCode: 400, message: 'Email already exists' }, common_1.HttpStatus.BAD_REQUEST);
            }
            const newUser = await this.userModel.create(createUserDto);
            return newUser;
        }
        catch (err) {
            console.log('err', err);
            throw new common_1.HttpException({ statusCode: 500, message: 'Internal Server Error' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateUser(id, userDto) {
        try {
            const user = await this.userModel.findById(id);
            if (user) {
                const updateData = {
                    name: userDto.name || user.name,
                    email: userDto.email || user.email,
                    role: userDto.role || user.role,
                };
                if (userDto.password) {
                    const salt = await bcrypt.genSalt(10);
                    updateData.password = await bcrypt.hash(userDto.password, salt);
                }
                const updatedUser = await this.userModel.findByIdAndUpdate(id, { $set: updateData }, { new: true });
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
        }
        catch (err) {
            console.error('Error updating user:', err);
            return {
                status: 400,
                message: err.message || 'Internal server error',
            };
        }
    }
    async deleteUser(id) {
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
        }
        catch (err) {
            console.error('Error deleting user:', err);
            return {
                status: 400,
                message: err.message || 'Internal server error',
            };
        }
    }
};
exports.UserService = UserService;
__decorate([
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "getCurrentUser", null);
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map