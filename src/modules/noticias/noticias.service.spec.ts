import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NoticiasService } from './noticias.service';
import { NoticiaEntity } from './entities/noticia.entity';

describe('NoticiasService', () => {
  let service: NoticiasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NoticiasService,
        {
          provide: getRepositoryToken(NoticiaEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<NoticiasService>(NoticiasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
