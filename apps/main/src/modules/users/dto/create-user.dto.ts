import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Nombre de usuario único', example: 'juanperez' })
  username: string;

  @ApiProperty({ description: 'Correo electrónico', example: 'juan@libero.com' })
  email: string;

  @ApiProperty({ description: 'Contraseña del usuario', example: '********' })
  password: string;

  @ApiProperty({ description: 'ID del rol asignado', example: 1 })
  idRol: number;

  @ApiPropertyOptional({ description: 'Estado activo del usuario', example: true })
  activo?: boolean;
}
