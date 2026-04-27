import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NoticiasController } from './noticias.controller';
import { NoticiasService } from './noticias.service';
import { NoticiaEntity } from './entities/noticia.entity';

describe('NoticiasController', () => {
  let controller: NoticiasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoticiasController],
      providers: [
        NoticiasService,
        {
          provide: getRepositoryToken(NoticiaEntity),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<NoticiasController>(NoticiasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
