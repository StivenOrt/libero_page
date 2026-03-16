import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from '../entities/usuario.entity';
import { LoginDto } from '../dto/login/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepo: Repository<Usuario>,
        private readonly jwtService: JwtService,
    ) { }

    async login(dto: LoginDto) {
        const usuario = await this.usuarioRepo.findOne({
            where: [{ username: dto.identifier }, { email: dto.identifier }],
            relations: ['rol'],
        });

        if (!usuario) throw new UnauthorizedException('Usuario no encontrado');
        if (!usuario.activo) throw new UnauthorizedException('Usuario inactivo');

        const valid = await bcrypt.compare(dto.password, usuario.password_hash);
        if (!valid) throw new UnauthorizedException('Contraseña incorrecta');

        const payload = {
            sub: usuario.id,
            username: usuario.username,
            rol: usuario.rol?.nombre,
        };

        return {
            access_token: this.jwtService.sign(payload),
            usuario: {
                id: usuario.id,
                username: usuario.username,
                email: usuario.email,
                rol: usuario.rol?.nombre,
            },
        };
    }
}