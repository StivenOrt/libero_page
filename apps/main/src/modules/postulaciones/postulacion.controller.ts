import {
    Controller, Get, Post, Put, Delete,
    Body, Param, UploadedFile, UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { PostulacionService } from './postulacion.service';
import { CreatePostulacionDto } from './dto/create-postulacion.dto';

@ApiTags('Postulaciones')
@Controller('postulaciones')
export class PostulacionController {
    constructor(private readonly service: PostulacionService) { }

    @Get()
    @ApiOperation({ summary: 'Listar todas las postulaciones' })
    @ApiResponse({ status: 200, description: 'Lista de postulaciones retornada exitosamente.' })
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener una postulación por ID' })
    @ApiParam({ name: 'id', type: String, description: 'ID de la postulación' })
    @ApiResponse({ status: 200, description: 'Postulación encontrada.' })
    @ApiResponse({ status: 404, description: 'Postulación no encontrada.' })
    findOne(@Param('id') id: string) {
        return this.service.findOne(+id);
    }

    @Post()
    @ApiOperation({ summary: 'Crear una nueva postulación (con CV en PDF)' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Datos de la postulación más el archivo CV en PDF',
        schema: {
            type: 'object',
            required: ['nombre', 'correo'],
            properties: {
                nombre:     { type: 'string', example: 'Juan Pérez' },
                correo:     { type: 'string', example: 'juan@email.com' },
                telefono:   { type: 'string', example: '+57 300 123 4567' },
                archivo_cv: { type: 'string', format: 'binary', description: 'Archivo PDF del CV' },
            },
        },
    })
    @ApiResponse({ status: 201, description: 'Postulación creada exitosamente.' })
    @ApiResponse({ status: 400, description: 'Solo se permiten archivos PDF.' })
    @UseInterceptors(
        FileInterceptor('archivo_cv', {
            storage: diskStorage({
                destination: './src/public/uploads',
                filename: (req, file, cb) => {
                    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    cb(null, `cv-${unique}${extname(file.originalname)}`);
                },
            }),
            fileFilter: (req, file, cb) => {
                if (file.mimetype !== 'application/pdf') {
                    return cb(new Error('Solo se permiten archivos PDF'), false);
                }
                cb(null, true);
            },
        }),
    )
    create(@Body() dto: CreatePostulacionDto, @UploadedFile() file: Express.Multer.File) {
        if (file) dto.archivo_cv = `uploads/${file.filename}`;
        return this.service.create(dto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar una postulación completa' })
    @ApiParam({ name: 'id', type: String, description: 'ID de la postulación a actualizar' })
    @ApiResponse({ status: 200, description: 'Postulación actualizada exitosamente.' })
    @ApiResponse({ status: 404, description: 'Postulación no encontrada.' })
    update(@Param('id') id: string, @Body() dto: CreatePostulacionDto) {
        return this.service.update(+id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar una postulación' })
    @ApiParam({ name: 'id', type: String, description: 'ID de la postulación a eliminar' })
    @ApiResponse({ status: 200, description: 'Postulación eliminada exitosamente.' })
    @ApiResponse({ status: 404, description: 'Postulación no encontrada.' })
    remove(@Param('id') id: string) {
        return this.service.remove(+id);
    }
}

