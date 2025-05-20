 // reward.controller.ts
import { Body, Controller, Post, ForbiddenException } from '@nestjs/common';
import { RewardService } from './reward.service';
import { CreateRewardDto } from './dto/create-reward.dto';
import { Reward } from './reward.schema';

@Controller('reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Post('create')
  async createReward(@Body() dto: CreateRewardDto): Promise<Reward> {
    return this.rewardService.create(dto);
  }
}