import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { SignUpDto, LoginDto } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAuthenticatedUser(userId: string): Promise<User> {
    if (!userId) {
      throw new NotFoundException('User not authenticated');
    }
    const user = await this.userModel.findById(userId).select('+email').exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const { username, email, password } = signUpDto;

    const existingUser = await this.userModel
      .findOne({ $or: [{ username }, { email }] })
      .exec();
    if (existingUser) {
      throw new Error('Username or email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      username,
      email,
      password: hashedPassword,
    });

    return newUser.save();
  }

  async login(loginDto: LoginDto): Promise<User> {
    const { username, password } = loginDto;
    const user = await this.userModel
      .findOne({ username })
      .select('+password +email')
      .exec();
    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new NotFoundException('Invalid credentials');
    }

    return user;
  }
}
