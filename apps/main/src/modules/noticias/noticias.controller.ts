import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NoticiasService } from './noticias.service';
import { CreateNoticiaDto } from './dto/create-noticia.dto';
import { UpdateNoticiaDto } from './dto/update-noticia.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/rols.guard';
import { Public } from '../auth/decorators/public.decorator';
import { Rols } from '../auth/decorators/rols.decorator';
import { RolEnum } from 'src/common/enums/rols.enum';
import { CurrentUser } from '../auth/decorators/users.decorator';

@ApiTags('Noticias')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('noticias')
export class NoticiasController {
  constructor(private readonly noticiasService: NoticiasService) {}

  @Post()
  @Rols(RolEnum.ADMIN, RolEnum.EDITOR)
  @ApiOperation({
    summary: 'Crear noticia',
    description: 'Crea una noticia publicada por el usuario autenticado.',
  })
  @ApiBody({ type: CreateNoticiaDto })
  @ApiResponse({ status: 201, description: 'Noticia creada exitosamente.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  @ApiResponse({ status: 403, description: 'No tiene permisos para crear noticias.' })
  create(@CurrentUser('sub') autorId: number, @Body() createNoticiaDto: CreateNoticiaDto) {
    return this.noticiasService.create(createNoticiaDto, autorId);
  }

  @Get()
  @Public()
  @ApiOperation({
    summary: 'Listar noticias',
    description: 'Retorna todas las noticias ordenadas de la más reciente a la más antigua.',
  })
  @ApiResponse({ status: 200, description: 'Lista de noticias retornada exitosamente.' })
  findAll() {
    return this.noticiasService.findAll();
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Obtener noticia por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Identificador de la noticia' })
  @ApiResponse({ status: 200, description: 'Noticia encontrada.' })
  @ApiResponse({ status: 404, description: 'Noticia no encontrada.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.noticiasService.findOne(id);
  }

  @Patch(':id')
  @Rols(RolEnum.ADMIN, RolEnum.EDITOR)
  @ApiOperation({ summary: 'Actualizar noticia' })
  @ApiParam({ name: 'id', type: Number, description: 'Identificador de la noticia' })
  @ApiBody({ type: UpdateNoticiaDto })
  @ApiResponse({ status: 200, description: 'Noticia actualizada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Noticia no encontrada.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateNoticiaDto: UpdateNoticiaDto) {
    return this.noticiasService.update(id, updateNoticiaDto);
  }

  @Delete(':id')
  @Rols(RolEnum.ADMIN, RolEnum.EDITOR)
  @ApiOperation({ summary: 'Eliminar noticia' })
  @ApiParam({ name: 'id', type: Number, description: 'Identificador de la noticia' })
  @ApiResponse({ status: 200, description: 'Noticia eliminada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Noticia no encontrada.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.noticiasService.remove(id);
  }
}
