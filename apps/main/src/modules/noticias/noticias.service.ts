import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoticiaDto } from './dto/create-noticia.dto';
import { UpdateNoticiaDto } from './dto/update-noticia.dto';
import { NoticiaEntity } from './entities/noticia.entity';

@Injectable()
export class NoticiasService {
  constructor(
    @InjectRepository(NoticiaEntity)
    private readonly noticiasRepository: Repository<NoticiaEntity>,
  ) {}

  async create(createNoticiaDto: CreateNoticiaDto, autorId?: number) {
    const noticia = this.noticiasRepository.create({
      ...createNoticiaDto,
      autorId,
    });

    return this.noticiasRepository.save(noticia);
  }

  async findAll() {
    return this.noticiasRepository.find({
      order: { fechaPublicacion: 'DESC' },
    });
  }

  async findOne(id: number) {
    const noticia = await this.noticiasRepository.findOne({ where: { id } });

    if (!noticia) {
      throw new NotFoundException(`Noticia con ID ${id} no encontrada`);
    }

    return noticia;
  }

  async update(id: number, updateNoticiaDto: UpdateNoticiaDto) {
    const noticia = await this.findOne(id);
    Object.assign(noticia, updateNoticiaDto);

    return this.noticiasRepository.save(noticia);
  }

  async remove(id: number) {
    const noticia = await this.findOne(id);
    await this.noticiasRepository.remove(noticia);

    return { message: `Noticia ${id} eliminada` };
  }
}
