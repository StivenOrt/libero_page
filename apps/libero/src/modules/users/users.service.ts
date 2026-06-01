import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UsersEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolService } from '../roles/rol.service';
import { enumRole } from 'src/common/enums/rols.enum';

@Injectable()
export class UsersService {
    private readonly saltRounds = 10;
    constructor(
        @InjectRepository(UsersEntity)
        private readonly userRepository: Repository<UsersEntity>,

        private readonly rolService: RolService
    ) { }

    async findAll(): Promise<UsersEntity[]> {
        const clientes = await this.userRepository.find();
        return clientes;
    }

    async findOne(id: number): Promise<UsersEntity> {
        const cliente = await this.userRepository.findOneBy({ id });
        if (!cliente) {
            throw new Error(`Cliente con ID ${id} no encontrado`);
        }
        return cliente;
    }

    async findOneName(username: string) {
        return await this.userRepository.findOneBy({ username })
    }

    async findOneEmail(email: string) {
        return await this.userRepository.findOneBy({ email })
    }

    async create(createUserDto: CreateUserDto): Promise<UsersEntity> {

        const { password, rolNombre, email, username, ...userData } = createUserDto;

        const newData: Partial<UsersEntity> = { ...userData };

        const existe = await this.userRepository.findOne({
            where: [ { username }, { email } ]
        })
        if (existe) throw new ConflictException('Este usuario ya existe')


        newData.email = email;
        newData.username = username;
        newData.passwordHash = await bcrypt.hash(password, this.saltRounds);
        newData.rol = await this.rolService.findOne(rolNombre ?? enumRole.USER)

        const nuevoCliente = this.userRepository.create(newData);

        return await this.userRepository.save(nuevoCliente);
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<UsersEntity> {
        const cliente = await this.findOne(id);
        if (!cliente) {
            throw new Error(`Cliente con ID ${id} no encontrado`);
        }

        const { password, code, ...userData } = updateUserDto;
        Object.assign(cliente, userData);

        if (password) {
            cliente.passwordHash = await bcrypt.hash(password, this.saltRounds);
        }

        if (code) {
            cliente.codeHash = await bcrypt.hash(code, 10)
        }

        return await this.userRepository.save(cliente);
    }

    async remove(id: number): Promise<void> {
        const cliente = await this.findOne(id);
        if (!cliente) {
            throw new Error(`Cliente con ID ${id} no encontrado`);
        }
        await this.userRepository.remove(cliente);
    }
}
