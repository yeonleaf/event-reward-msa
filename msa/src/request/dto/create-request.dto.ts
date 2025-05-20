import { IsString, IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreateRequestDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  event_id: string;

  @IsNumber()
  quantity: number;

  @IsDateString()
  request_date: string;
}
