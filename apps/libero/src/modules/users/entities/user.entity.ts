import { RolEntity } from 'src/modules/roles/entities/rol.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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

	@ManyToOne( () => RolEntity, (role) => role.users)
	@JoinColumn({ name: 'rol' })
	rol: RolEntity;

	@Column({ type: 'boolean', default: true })
	activo: boolean;

	@CreateDateColumn({ name: 'created_at', type: 'timestamp' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
	updatedAt: Date;
}