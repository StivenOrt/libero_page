import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	IsNotEmpty,
	IsOptional,
	IsString,
	Length,
	MaxLength,
} from 'class-validator';

export class CreateNoticiaDto {
	@ApiProperty({
		example: 'La empresa inaugura nueva sede',
		description: 'Titulo de la noticia',
	})
	@IsString()
	@IsNotEmpty()
	@Length(3, 200)
	titulo: string;

	@ApiProperty({
		example:
			'La empresa anuncia la apertura de una nueva sede para ampliar su cobertura...',
		description: 'Contenido completo de la noticia',
	})
	@IsString()
	@IsNotEmpty()
	@Length(20, 5000)
	contenido: string;

	@ApiPropertyOptional({
		example: 'https://cdn.libero.com/noticias/sede.jpg',
		description: 'Imagen principal de la noticia',
	})
	@IsOptional()
	@IsString()
	@MaxLength(255)
	imagen?: string;
}
