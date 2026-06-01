import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('postulaciones')
export class Postulacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  nombre: string;

  @Column({ length: 150 })
  correo: string;

  @Column({ length: 20, nullable: true })
  telefono: string;

  @Column({ length: 255, nullable: true })
  archivo_cv: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @Column()
  createdById: number;
}