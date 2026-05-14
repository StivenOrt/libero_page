import { expect } from 'chai';
import { validate } from 'class-validator';

import { CreateUserDto } from '../../src/modules/users/dto/create-user.dto';

describe('CreateUserDto', () => {

  it('testNoDeberiaAceptarEmailInvalidoEnCreateUserDto', async () => {

    const dto = new CreateUserDto();

    dto.username = 'juan';
    dto.email = 'correo-invalido';
    dto.password = '123456';
    dto.idRol = 1;

    const errors = await validate(dto);

    expect(errors.length).to.be.greaterThan(0);

  });

});