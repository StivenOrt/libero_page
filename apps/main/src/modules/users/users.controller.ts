import { Body, Controller, Delete, Get, Param, ParseIntPipe,
    Post, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiParam, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/rols.decorator';
import { enumRole } from 'src/common/enums/rols.enum';
import { Private } from '../auth/decorators/jwt.decorator';



@Controller('users')
@ApiTags('Usuarios')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @ApiOperation({ summary: 'Listar todos los usuarios' })
    @ApiResponse({ status: 200, description: 'Lista de usuarios retornada exitosamente.' })
    @ApiResponse({ status: 401, description: 'No autorizado.' })
    @Roles([enumRole.ADMIN])
    @Get() @Private() @ApiBearerAuth()
    findAll() {
        return this.usersService.findAll();
    }


    @ApiOperation({ summary: 'Obtener un usuario por ID' })
    @ApiParam({ name: 'id', type: Number, description: 'ID del usuario' })
    @ApiResponse({ status: 200, description: 'Usuario encontrado.' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
    @Roles([enumRole.ADMIN])
    @Get(':id') @Private() @ApiBearerAuth()
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id);
    }


    @ApiOperation({ summary: 'Crear un nuevo usuario' })
    @ApiResponse({ status: 201, description: 'Usuario creado exitosamente.' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }


    @ApiOperation({ summary: 'Actualizar parcialmente un usuario' })
    @ApiParam({ name: 'id', type: Number, description: 'ID del usuario a actualizar' })
    @ApiResponse({ status: 200, description: 'Usuario actualizado exitosamente.' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
    @Roles([enumRole.ADMIN, enumRole.EDITOR, enumRole.MOD])
    @Patch(':id') @Private() @ApiBearerAuth()
    update( @Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto ) {
        return this.usersService.update(id, updateUserDto);
    }


    @ApiOperation({ summary: 'Eliminar un usuario' })
    @ApiParam({ name: 'id', type: Number, description: 'ID del usuario a eliminar' })
    @ApiResponse({ status: 200, description: 'Usuario eliminado exitosamente.' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
    @Roles([enumRole.ADMIN])
    @Delete(':id') @Private() @ApiBearerAuth()
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.remove(id);
    }
}
