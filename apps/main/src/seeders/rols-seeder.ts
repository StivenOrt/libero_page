import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolEntity } from 'src/modules/roles/entities/rol.entity';
import { enumRole } from 'src/common/enums/rols.enum';


@Injectable()
export class RolsSeederService implements OnModuleInit {
  private readonly logger = new Logger(RolsSeederService.name);

  constructor(
    @InjectRepository(RolEntity)
    private readonly roleRepository: Repository<RolEntity>,
  ) {}


  async onModuleInit() {
    await this.seedRoles()
  }


  async seedRoles() {
    const rolesToCreate = Object.values(enumRole);

    for (const role of rolesToCreate) {
        const exist = await this.roleRepository.findOneBy({ nombre: role })

      if (!exist) {
          const newRole = this.roleRepository.create({ nombre: role })
          await this.roleRepository.save(newRole)
      }
    }

  }
}