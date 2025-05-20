
import { Body, Controller, Post, Get } from '@nestjs/common';
import { CreateUserDto} from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService} from './user.service';

@Controller('user')
export class UserController {
    @Post('create')
    createUser(@Body() createUserDto: CreateUserDto): string {
        // 중복 체크
        // 비밀번호 해싱
        // 유저 생성
        return "User created";
    }
    @Post('login')
    loginUser(@Body() loginUserDto: LoginUserDto): string {
        // id로 유저를 찾고 비밀번호 확인
        // 비밀번호가 맞으면 JWT 발급
        // 비밀번호가 틀리면 에러
        return "User logged in";
    }
    @Get("one")
    findOne(@Body() body: { user_id: string }): string {
        // user_id로 유저 조회
        // user_id가 없으면 에러
        return "One user";
    }
}
