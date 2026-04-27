import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Postulacion } from './entities/postulacion.entity';
import { CreatePostulacionDto } from './dto/create-postulacion.dto';

@Injectable()
export class PostulacionService {
    constructor(
        @InjectRepository(Postulacion)
        private readonly repo: Repository<Postulacion>,
    ) { }

    findAll() {
        return this.repo.find();
    }

    findOne(id: number) {
        return this.repo.findOne({ where: { id } });
    }

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