import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Postulacion } from 'src/modules/postulaciones/entities/postulacion.entity';
import { RolEnum } from 'src/common/enums/rols.enum';

@Injectable()
export class PostulacionGuard implements CanActivate {
  constructor(
    @InjectRepository(Postulacion)
    private readonly postulacionRepository: Repository<Postulacion>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user?.sub) {
      throw new UnauthorizedException('Debe autenticarse para continuar');
    }

    const postulacionId = Number(request.params.id);
    if (!Number.isInteger(postulacionId)) {
      throw new NotFoundException('Postulacion no encontrada');
    }

    const postulacion = await this.postulacionRepository.findOne({
      where: { id: postulacionId },
    });

    if (!postulacion) {
      throw new NotFoundException('Postulacion no encontrada');
    }

    if (
      user.idRol === RolEnum.ADMIN ||
      user.idRol === RolEnum.EDITOR ||
      postulacion.createdById === user.sub
    ) {
      return true;
    }

    throw new ForbiddenException('No tiene permisos para modificar esta postulacion');
  }
}