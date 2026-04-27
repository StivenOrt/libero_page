import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsInt,
  MinLength,
  IsOptional,
  IsBoolean,
  Min,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(3)
  @ApiProperty({ example: 'john_doe', description: 'Nombre de usuario único' })
  username: string;

  @IsEmail()
  @ApiProperty({ example: 'john@libero.com', description: 'Correo electrónico único' })
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ example: 'password123', description: 'Contraseña (mínimo 6 caracteres)' })
  password: string;

  @IsInt()
  @Min(1)
  @ApiProperty({ example: 2, description: 'ID del rol asignado al usuario' })
  idRol: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ example: true, description: 'Estado del usuario (activo/inactivo)', required: false })
  activo?: boolean;
}
