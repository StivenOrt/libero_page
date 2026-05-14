import { expect } from 'chai';
import sinon from 'sinon';

import { NotFoundException } from '@nestjs/common';

import { NoticiasService } from '../../src/modules/noticias/noticias.service';

describe('NoticiasService', () => {

  afterEach(() => {
    sinon.restore();
  });

  it('testDeberiaRetornarNotFoundCuandoNoticiaNoExiste', async () => {

    const noticiasRepository = {
      findOne: sinon.stub().resolves(null),
    };

    const noticiasService = new NoticiasService(
      noticiasRepository as any,
    );

    try {

      await noticiasService.findOne(999);

      expect.fail('Debió lanzar NotFoundException');

    } catch (error) {

      expect(error).to.be.instanceOf(NotFoundException);

      expect((error as Error).message).to.equal(
        'Noticia con ID 999 no encontrada'
      );

    }

  });

  it('testDeberiaCrearNoticiaCorrectamente', async () => {

    const createNoticiaDto = {
      titulo: 'Nueva sede empresarial',
      contenido: 'La empresa inaugura una nueva sede para ampliar cobertura nacional.',
      imagen: 'https://cdn.libero.com/sede.jpg',
    };

    const noticiaGuardada = {
      id: 1,
      ...createNoticiaDto,
      autorId: 5,
      fechaPublicacion: new Date(),
    };

    const noticiasRepository = {
      create: sinon.stub().returns(noticiaGuardada),
      save: sinon.stub().resolves(noticiaGuardada),
    };

    const noticiasService = new NoticiasService(
      noticiasRepository as any,
    );

    const result = await noticiasService.create(
      createNoticiaDto,
      5,
    );

    expect(result.titulo).to.equal(
      'Nueva sede empresarial'
    );

    expect(result.autorId).to.equal(5);

    expect(noticiasRepository.create.calledOnce).to.equal(true);

    expect(noticiasRepository.save.calledOnce).to.equal(true);

  });

});