import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from '../../services/login/login.service';
import { LoginDto } from '../../dto/login/login.dto';

@Controller('auth')
export class LoginController {
    constructor(private readonly loginService: LoginService) { }

    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.loginService.login(dto);
    }
}