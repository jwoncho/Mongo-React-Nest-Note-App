import {
  Controller,
  Get,
  Post,
  Req,
  Body,
  Session,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDto, LoginDto } from './user.dto';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAuthenticatedUser(@Req() req: Request) {
    if (!req.session || !req.session.userId) {
      throw new Error('User not authenticated');
    }
    return this.usersService.getAuthenticatedUser(
      req.session.userId.toString(),
    );
  }

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.usersService.signUp(signUpDto);
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Session() session: Record<string, any>,
  ) {
    const user = await this.usersService.login(loginDto);
    session.userId = user._id;
    return user;
  }

  @Post('logout')
  async logout(@Req() req: Request) {
    req.session.destroy((err) => {
      if (err) {
        throw new Error('Logout failed');
      }
    });
    return { statusCode: HttpStatus.OK, message: 'Logged out successfully' };
  }
}
