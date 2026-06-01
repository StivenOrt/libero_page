import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { requestCodeDto } from './dto/request-code.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }


    @Post('test')
    @ApiOperation({ summary: 'Iniciar sesión', description: 'Autentica al usuario con username/email y contraseña. Retorna un token JWT.' })
    @ApiResponse({ status: 201, description: 'Login exitoso. Retorna el access_token.', schema: { example: { access_token: 'eyJhbGci...' } } })
    @ApiResponse({ status: 401, description: 'Credenciales inválidas.' })
    async login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    @Post('test/code')
    async requestCode(@Body() dto: requestCodeDto) {
        return this.authService.requestCode(dto)
    }

}