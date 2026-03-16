import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postulacion } from '../../entities/postulaciones/postulacion.entity';
import { PostulacionService } from '../../services/postulaciones/postulacion.service';
import { PostulacionController } from '../../controllers/postulaciones/postulacion.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Postulacion])],
    providers: [PostulacionService],
    controllers: [PostulacionController],
})
export class PostulacionModule { }