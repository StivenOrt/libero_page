import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Postulacion } from './entities/postulacion.entity';
import { CreatePostulacionDto } from './dto/create-postulacion.dto';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Get, Post } from '@nestjs/common';

@Injectable()
export class PostulacionService {
    constructor(
        @InjectRepository(Postulacion)
        private readonly repo: Repository<Postulacion>,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Listar todas las postulaciones' })
    @ApiResponse({ status: 200, description: 'Lista de postulaciones retornada exitosamente.' })
    @ApiResponse({ status: 401, description: 'No autorizado.' })
    findAll() {
        return this.repo.find();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener una postulacion por ID' })
    @ApiParam({ name: 'id', type: Number, description: 'ID de la postulacion' })
    @ApiResponse({ status: 200, description: 'Postulacion encontrada.' })
    @ApiResponse({ status: 404, description: 'Postulacion no encontrada.' })
    findOne(id: number) {
        return this.repo.findOne({ where: { id } });
    }

    @Post()
    @ApiOperation({ summary: 'Crear una nueva postulacion' })
    @ApiResponse({ status: 201, description: 'Postulacion creada exitosamente.' })
    @ApiResponse({ status: 400, description: 'Datos inválidos.' })
    create(dto: CreatePostulacionDto) {
        const postulacion = this.repo.create(dto);
        return this.repo.save(postulacion);
    }

    async update(id: number, dto: CreatePostulacionDto) {
        await this.repo.update(id, dto);
        return this.findOne(id);
    }

    async remove(id: number) {
        await this.repo.delete(id);
        return { message: `Postulacion ${id} eliminada` };
    }
}