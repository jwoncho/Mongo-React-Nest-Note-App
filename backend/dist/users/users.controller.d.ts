import { HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDto, LoginDto } from './user.dto';
import { Request } from 'express';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAuthenticatedUser(req: Request): Promise<import("./user.schema").User>;
    signUp(signUpDto: SignUpDto): Promise<import("./user.schema").User>;
    login(loginDto: LoginDto, session: Record<string, any>): Promise<import("./user.schema").User>;
    logout(req: Request): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
