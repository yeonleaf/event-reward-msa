// create-reward.dto.ts
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRewardDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  event_id: string;

  @IsNumber()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  reward_id: string;
}