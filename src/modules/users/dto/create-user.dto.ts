import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import {
  IsBoolean, IsEmail, IsInt, IsOptional, IsString, MinLength
} from 'class-validator';

export class CreateUserDto {

  @ApiProperty({
    description: 'Nombre de usuario único',
    example: 'juanperez'
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Correo electrónico',
    example: 'juan@libero.com'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: '********'
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'ID del rol asignado',
    example: 1
  })
  @IsInt()
  idRol: number;

  @ApiPropertyOptional({
    description: 'Estado activo del usuario',
    example: true
  })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}