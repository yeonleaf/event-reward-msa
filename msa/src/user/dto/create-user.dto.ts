import { IsString, IsEmpty, IsEnum } from 'class-validator';
import { Role } from '../user.schema';

export class CreateUserDto {
    @IsString()
    user_id: string;

    @IsString()
    password: string;

    @IsEnum(Role)
    role: Role;
}
