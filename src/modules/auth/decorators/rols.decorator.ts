import { SetMetadata } from '@nestjs/common';
import { RolEnum } from '../../../common/enums/rols.enum';

export const ROLS_KEY = 'rols';

export const Rols = (...rols: RolEnum[]) => SetMetadata(ROLS_KEY, rols);