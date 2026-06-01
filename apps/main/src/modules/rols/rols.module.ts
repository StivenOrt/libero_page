import { Module } from '@nestjs/common';
import { RolsEntity } from './entities/rol.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesSeederService } from './rols-seeder';

@Module({
  imports: [TypeOrmModule.forFeature([RolsEntity])],
  providers: [RolesSeederService],
  exports: [TypeOrmModule],

})
export class RolModule { }