import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UsersEntity } from '../users/entities/user.entity';
import { LoginDto } from '../login/dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usuarioRepo: Repository<UsersEntity>,
    private readonly jwtService: JwtService,
  ) { }

  async login(dto: LoginDto) {
    const usuario = await this.usuarioRepo.findOne({
      where: [{ username: dto.identifier }, { email: dto.identifier }],
    });

    if (!usuario) throw new UnauthorizedException('Usuario no encontrado');
    if (!usuario.activo) throw new UnauthorizedException('Usuario inactivo');

    const valid = await bcrypt.compare(dto.password, usuario.passwordHash);
    if (!valid) throw new UnauthorizedException('Contraseña incorrecta');

    const payload = {
      sub: usuario.id,
      username: usuario.username,
      idRol: usuario.idRol,
    };

    return {
      access_token: this.jwtService.sign(payload),
      usuario: {
        id: usuario.id,
        username: usuario.username,
        email: usuario.email,
        idRol: usuario.idRol,
      },
    };
  }
}
