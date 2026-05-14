import { expect } from 'chai';
import sinon from 'sinon';
import * as bcrypt from 'bcrypt';

import { UnauthorizedException } from '@nestjs/common';

import { AuthService } from '../../src/modules/auth/auth.service';

describe('AuthService', () => {

  afterEach(() => {
    sinon.restore();
  });

  it('testDeberiaLanzarUnauthorizedCuandoPasswordEsIncorrecta', async () => {

    const passwordHash = await bcrypt.hash('passwordCorrecta', 10);

    const fakeUser = {
      id: 1,
      username: 'juan',
      email: 'juan@test.com',
      passwordHash,
      idRol: 1,
      activo: true,
    };

    const usuarioRepo = {
      findOne: sinon.stub().resolves(fakeUser),
    };

    const jwtService = {
      sign: sinon.stub(),
    };

    const configService = {
      get: sinon.stub(),
    };

    const authService = new AuthService(
      usuarioRepo as any,
      jwtService as any,
      configService as any,
    );

    try {

      await authService.login({
        identifier: 'juan',
        password: 'passwordIncorrecta',
      });

      expect.fail('Debió lanzar UnauthorizedException');

    } catch (error) {

      expect(error).to.be.instanceOf(UnauthorizedException);

      expect((error as Error).message).to.equal(
        'Contraseña incorrecta'
      );

    }

  });

  it('testDeberiaGenerarTokenJWTCuandoLoginEsCorrecto', async () => {

    const passwordHash = await bcrypt.hash('passwordCorrecta', 10);

    const fakeUser = {
      id: 1,
      username: 'juan',
      email: 'juan@test.com',
      passwordHash,
      idRol: 1,
      activo: true,
    };

    const usuarioRepo = {
      findOne: sinon.stub().resolves(fakeUser),
    };

    const jwtService = {
      sign: sinon.stub().returns('fake-jwt-token'),
    };

    const configService = {
      get: sinon.stub().returns('secretKey'),
    };

    const authService = new AuthService(
      usuarioRepo as any,
      jwtService as any,
      configService as any,
    );

    const result = await authService.login({
      identifier: 'juan',
      password: 'passwordCorrecta',
    });

    expect(result).to.have.property('access_token');

    expect(result.access_token).to.equal('fake-jwt-token');

    expect(result.usuario.username).to.equal('juan');

    expect(jwtService.sign.calledOnce).to.equal(true);

  });

});