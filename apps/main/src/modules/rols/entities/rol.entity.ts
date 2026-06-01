import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('rols')
export class RolsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;
}