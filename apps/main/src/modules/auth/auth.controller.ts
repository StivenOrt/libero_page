import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @ApiOperation({ summary: 'Iniciar sesión', description: 'Autentica al usuario con username/email y contraseña. Retorna un token JWT.' })
    @ApiResponse({ status: 201, description: 'Login exitoso. Retorna el access_token.', schema: { example: { access_token: 'eyJhbGci...' } } })
    @ApiResponse({ status: 401, description: 'Credenciales inválidas.' })
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    @Post('register')
    @ApiOperation({ summary: 'Registrar usuario', description: 'Crea un nuevo usuario en el sistema con username, email y contraseña.' })
    @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente.', schema: { example: { message: 'Usuario registrado exitosamente', usuario: { id: 1, username: 'john_doe', email: 'john@libero.com', idRol: 2, activo: true } } } })
    @ApiResponse({ status: 409, description: 'El username o email ya está registrado.' })
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }
}