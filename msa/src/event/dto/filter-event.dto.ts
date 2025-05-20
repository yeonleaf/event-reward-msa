import { IsOptional, IsDateString, IsBoolean } from 'class-validator';

export class FilterEventDto {
  @IsOptional()
  @IsDateString()
  start_date?: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}