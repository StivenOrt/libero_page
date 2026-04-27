import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostulacionDto {
  @ApiProperty({ description: 'Nombre completo del postulante', example: 'Juan Pérez' })
  nombre: string;

  @ApiProperty({ description: 'Correo electrónico de contacto', example: 'juan@email.com' })
  correo: string;

  @ApiPropertyOptional({ description: 'Número de teléfono', example: '+57 300 123 4567' })
  telefono?: string;

  @ApiPropertyOptional({ description: 'Ruta del archivo CV (se asigna automáticamente al subir)', example: 'uploads/cv-123456.pdf' })
  archivo_cv?: string;
}