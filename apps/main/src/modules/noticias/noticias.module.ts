import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/rols.guard';
import { NoticiaEntity } from './entities/noticia.entity';
import { NoticiasService } from './noticias.service';
import { NoticiasController } from './noticias.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NoticiaEntity])],
  controllers: [NoticiasController],
  providers: [NoticiasService, JwtAuthGuard, RolesGuard],
})
export class NoticiasModule {}
