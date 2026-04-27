import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';
import {
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsString,
	Length,
	MaxLength,
	Min,
} from 'class-validator';

@Entity('noticias')
export class NoticiaEntity {
	@PrimaryGeneratedColumn({ type: 'int' })
	id: number;

	@Column({ type: 'varchar', length: 200 })
	@IsString()
	@IsNotEmpty()
	@Length(3, 200)
	titulo: string;

	@Column({ type: 'text' })
	@IsString()
	@IsNotEmpty()
	@Length(20, 5000)
	contenido: string;

	@Column({ type: 'varchar', length: 255, nullable: true })
	@IsOptional()
	@IsString()
	@MaxLength(255)
	imagen?: string;

	@Column({ name: 'autor_id', type: 'int', nullable: true })
	@IsOptional()
	@IsInt()
	@Min(1)
	autorId?: number;

	@CreateDateColumn({ name: 'fecha_publicacion', type: 'datetime' })
	fechaPublicacion: Date;
}
