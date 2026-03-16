import {
    Controller, Get, Post, Put, Delete,
    Body, Param, UploadedFile, UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PostulacionService } from '../services/postulacion.service';
import { CreatePostulacionDto } from '../dto/postulacion/postulacion.dto';

@Controller('postulaciones')
export class PostulacionController {
    constructor(private readonly service: PostulacionService) { }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(+id);
    }

    @Post()
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
    update(@Param('id') id: string, @Body() dto: CreatePostulacionDto) {
        return this.service.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(+id);
    }
}
