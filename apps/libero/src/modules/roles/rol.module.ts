import { Module } from '@nestjs/common';
import { RolEntity } from './entities/rol.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolsSeederService } from '../../seeders/rols-seeder';
import { RolService } from './rol.service';

@Module({
  imports: [TypeOrmModule.forFeature([RolEntity])],
  providers: [RolService, RolsSeederService],
  exports: [RolService],

})
export class RolModule { }