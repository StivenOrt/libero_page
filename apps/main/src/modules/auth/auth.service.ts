import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,

    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(dto: LoginDto) {

    const usuario = await this.userService.findOneName(dto.identifier)
      || await this.userService.findOneEmail(dto.identifier)


    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    if (!usuario.activo) throw new UnauthorizedException('Usuario inactivo');

    const valid = await bcrypt.compare(dto.password, usuario.passwordHash);
    if (!valid) throw new UnauthorizedException('Contraseña incorrecta');

    const payload = {
      sub: usuario.id,
      username: usuario.username,
      rol: usuario.rol,
    };

    const token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });

    return {
      access_token: token,
      usuario: {
        id: usuario.id,
        username: usuario.username,
        email: usuario.email,
        rol: usuario.rol,
      },
    };
  }


}