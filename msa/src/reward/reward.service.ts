import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reward, RewardDocument } from './reward.schema';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UserService } from '../user/user.service';
import { Role } from '../user/user.schema';

@Injectable()
export class RewardService {
  constructor(
    @InjectModel(Reward.name) private rewardModel: Model<RewardDocument>,
    private readonly userService: UserService,
  ) {}

  async create(dto: CreateRewardDto): Promise<Reward> {
    const user = await this.userService.findById(dto.user_id);
    if (!user || user.role === Role.USER) {
      throw new ForbiddenException('USER는 보상 등록 불가');
    }
    const created = new this.rewardModel(dto);
    return created.save();
  }
}
