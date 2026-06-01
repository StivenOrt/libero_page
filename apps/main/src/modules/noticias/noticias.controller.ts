import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NoticiasService } from './noticias.service';
import { CreateNoticiaDto } from './dto/create-noticia.dto';
import { UpdateNoticiaDto } from './dto/update-noticia.dto';
import { enumRole } from 'src/common/enums/rols.enum';
import { CurrentUser } from '../auth/decorators/users.decorator';
import { Roles } from '../auth/decorators/rols.decorator';

@ApiTags('Noticias')
@ApiBearerAuth()
@Controller('noticias')
export class NoticiasController {
  constructor(private readonly noticiasService: NoticiasService) {}


  @ApiOperation({
    summary: 'Crear noticia',
    description: 'Crea una noticia publicada por el usuario autenticado.',
  })
  @ApiBody({ type: CreateNoticiaDto })
  @ApiResponse({ status: 201, description: 'Noticia creada exitosamente.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  @ApiResponse({ status: 403, description: 'No tiene permisos para crear noticias.' })
  @Post() @Roles([ enumRole.ADMIN, enumRole.EDITOR ])
  create(@CurrentUser('sub') autorId: number, @Body() createNoticiaDto: CreateNoticiaDto) {
    return this.noticiasService.create(createNoticiaDto, autorId);
  }


  @ApiOperation({
    summary: 'Listar noticias',
    description: 'Retorna todas las noticias ordenadas de la más reciente a la más antigua.',
  })
  @ApiResponse({ status: 200, description: 'Lista de noticias retornada exitosamente.' })
  @Get()
  findAll() {
    return this.noticiasService.findAll();
  }


  @ApiOperation({ summary: 'Obtener noticia por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Identificador de la noticia' })
  @ApiResponse({ status: 200, description: 'Noticia encontrada.' })
  @ApiResponse({ status: 404, description: 'Noticia no encontrada.' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.noticiasService.findOne(id);
  }

  @ApiOperation({ summary: 'Actualizar noticia' })
  @ApiParam({ name: 'id', type: Number, description: 'Identificador de la noticia' })
  @ApiBody({ type: UpdateNoticiaDto })
  @ApiResponse({ status: 200, description: 'Noticia actualizada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Noticia no encontrada.' })
  @Patch(':id') @Roles([ enumRole.ADMIN, enumRole.EDITOR ])
  update(@Param('id', ParseIntPipe) id: number, @Body() updateNoticiaDto: UpdateNoticiaDto) {
    return this.noticiasService.update(id, updateNoticiaDto);
  }

  @ApiOperation({ summary: 'Eliminar noticia' })
  @ApiParam({ name: 'id', type: Number, description: 'Identificador de la noticia' })
  @ApiResponse({ status: 200, description: 'Noticia eliminada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Noticia no encontrada.' })
  @Delete(':id') @Roles([ enumRole.ADMIN, enumRole.EDITOR ])
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.noticiasService.remove(id);
  }
}
