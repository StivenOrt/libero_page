import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UsersEntity } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usuarioRepo: Repository<UsersEntity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

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

    const token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });

    return {
      access_token: token,
      usuario: {
        id: usuario.id,
        username: usuario.username,
        email: usuario.email,
        idRol: usuario.idRol,
      },
    };
  }

  async register(dto: RegisterDto) {
    const existe = await this.usuarioRepo.findOne({
      where: [{ username: dto.username }, { email: dto.email }],
    });

    if (existe) throw new ConflictException('El username o email ya está registrado');

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const nuevoUsuario = this.usuarioRepo.create({
      username: dto.username,
      email: dto.email,
      passwordHash,
      idRol: dto.idRol,
      activo: dto.activo ?? true,
    });

    const guardado = await this.usuarioRepo.save(nuevoUsuario);

    return {
      message: 'Usuario registrado exitosamente',
      usuario: {
        id: guardado.id,
        username: guardado.username,
        email: guardado.email,
        idRol: guardado.idRol,
        activo: guardado.activo,
      },
    };
  }
}