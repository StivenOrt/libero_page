import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { enumRole } from 'src/common/enums/rols.enum';

export class CreateUserDto {
  @ApiProperty({ description: 'Nombre de usuario único', example: 'juanperez' })
  username: string;

  @ApiProperty({ description: 'Correo electrónico', example: 'juan@libero.com' })
  email: string;

  @ApiProperty({ description: 'Contraseña del usuario', example: '********' })
  password: string;

  @ApiProperty({ description: 'Nombre del rol asignado', example: enumRole.USER })
  rolNombre?: string;

  @ApiPropertyOptional({ description: 'Estado activo del usuario', example: true })
  activo?: boolean;

  @ApiHideProperty()
  code: string;
}
