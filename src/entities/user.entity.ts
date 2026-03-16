import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('usuarios')
export class UsersEntity {
	@PrimaryGeneratedColumn({ type: 'int' })
	id: number;

	@Column({ type: 'varchar', length: 100, unique: true })
	username: string;

	@Column({ type: 'varchar', length: 150, unique: true })
	email: string;

	@Column({ name: 'password_hash', type: 'varchar', length: 255 })
	passwordHash: string;

	@Column({ name: 'id_rol', type: 'int' })
	idRol: number;

	@Column({ type: 'boolean', default: true })
	activo: boolean;

	@CreateDateColumn({ name: 'created_at', type: 'timestamp' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
	updatedAt: Date;
}