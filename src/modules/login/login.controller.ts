import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class LoginController {
    constructor(private readonly loginService: LoginService) { }

    @Post('login')
    @ApiOperation({ summary: 'Iniciar sesión', description: 'Autentica al usuario con username/email y contraseña. Retorna un token JWT.' })
    @ApiResponse({ status: 201, description: 'Login exitoso. Retorna el access_token.', schema: { example: { access_token: 'eyJhbGci...' } } })
    @ApiResponse({ status: 401, description: 'Credenciales inválidas.' })
    login(@Body() dto: LoginDto) {
        return this.loginService.login(dto);
    }
}
