import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postulacion } from './entities/postulacion.entity';
import { PostulacionService } from './postulacion.service';
import { PostulacionController } from './postulacion.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Postulacion])],
    providers: [PostulacionService],
    controllers: [PostulacionController],
})
export class PostulacionModule { }