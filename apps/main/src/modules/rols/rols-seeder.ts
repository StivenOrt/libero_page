import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolsEntity } from 'src/modules/rols/entities/rol.entity';
import { ROL_LABELS, RolEnum } from 'src/common/enums/rols.enum';

@Injectable()
export class RolesSeederService implements OnModuleInit {
  private readonly logger = new Logger(RolesSeederService.name);

  constructor(
    @InjectRepository(RolsEntity)
    private readonly rolesRepository: Repository<RolsEntity>,
  ) {}

  async onModuleInit() {
    const roles = [
      { id: RolEnum.ADMIN, nombre: ROL_LABELS[RolEnum.ADMIN] },
      { id: RolEnum.EDITOR, nombre: ROL_LABELS[RolEnum.EDITOR] },
      { id: RolEnum.USER, nombre: ROL_LABELS[RolEnum.USER] },
      { id: RolEnum.SUPERADMIN, nombre: ROL_LABELS[RolEnum.SUPERADMIN] },
    ];

    await this.rolesRepository.upsert(roles, ['id']);
    this.logger.log('Roles asegurados en la base de datos');
  }
}