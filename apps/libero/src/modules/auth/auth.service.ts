import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { ClientProxy } from '@nestjs/microservices';
import { requestCodeDto } from './dto/request-code.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('MAILER')
    private client: ClientProxy,

    private readonly userService: UsersService,

    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}


  async requestCode(dto: requestCodeDto) {

    const usuario = await this.userService.findOneEmail(dto.email)
    if (!usuario) throw new NotFoundException('Usuario no encontrado')

    const code = Math.floor( 100_000 + Math.random() * 900_000).toString()

    await this.userService.update(usuario.id, { code })

    const data = {
      code,
      email: dto.email,
      username: usuario.username
    }

    this.client.emit('send_email', data)
  }


  async login(dto: LoginDto) {

    const usuario = await this.userService.findOneName(dto.identifier)
      || await this.userService.findOneEmail(dto.identifier)


    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    if (!usuario.activo) throw new UnauthorizedException('Usuario inactivo');

    const pass = dto.password ? await bcrypt.compare(dto.password, usuario.passwordHash) : null;
    const code = dto.code ? await bcrypt.compare(dto.code, usuario.codeHash) : null;
    if (!pass && !code) throw new UnauthorizedException('Credenciales incorrectas');

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