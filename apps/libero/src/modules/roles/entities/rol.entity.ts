import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { UsersEntity } from 'src/modules/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('roles')
export class RolEntity {


  @PrimaryGeneratedColumn()
  id: number;
  

  @Column({ unique: true })
  nombre: string;


  //////

  @ApiHideProperty()
  @Exclude()
  @OneToMany( () => UsersEntity, (user) => user.rol)
  users: UsersEntity[];

}