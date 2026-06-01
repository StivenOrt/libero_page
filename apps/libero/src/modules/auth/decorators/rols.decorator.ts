import { enumRole } from '../../../common/enums/rols.enum';
import { Reflector } from '@nestjs/core';

export const Roles = Reflector.createDecorator<enumRole[]>()