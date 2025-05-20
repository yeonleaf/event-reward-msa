import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const existing = await this.userModel.findOne({ user_id: dto.user_id });
    if (existing) {
      throw new ConflictException('이미 존재하는 사용자입니다.');
    }
    const createdUser = new this.userModel(dto);
    return createdUser.save();
  }

  async findById(user_id: string): Promise<User | null> {
    return this.userModel.findOne({ user_id });
  }
}