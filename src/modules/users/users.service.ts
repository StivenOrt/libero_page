import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UsersEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private readonly saltRounds = 10;
    constructor(
        @InjectRepository(UsersEntity)
        private readonly clienteRepository: Repository<UsersEntity>,
    ) { }

    async findAll(): Promise<UsersEntity[]> {
        const clientes = await this.clienteRepository.find();
        return clientes;
    }

    async findOne(id: number): Promise<UsersEntity> {
        const cliente = await this.clienteRepository.findOneBy({ id });
        if (!cliente) {
            throw new Error(`Cliente con ID ${id} no encontrado`);
        }
        return cliente;
    }

    async create(createUserDto: CreateUserDto): Promise<UsersEntity> {
        const { password, ...userData } = createUserDto;
        const passwordHash = await bcrypt.hash(password, this.saltRounds);
        const nuevoCliente = this.clienteRepository.create({
            ...userData,
            passwordHash,
        });
        return await this.clienteRepository.save(nuevoCliente);
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<UsersEntity> {
        const cliente = await this.findOne(id);
        if (!cliente) {
            throw new Error(`Cliente con ID ${id} no encontrado`);
        }

        const { password, ...userData } = updateUserDto;
        Object.assign(cliente, userData);

        if (password) {
            cliente.passwordHash = await bcrypt.hash(password, this.saltRounds);
        }

        return await this.clienteRepository.save(cliente);
    }

    async remove(id: number): Promise<void> {
        const cliente = await this.findOne(id);
        if (!cliente) {
            throw new Error(`Cliente con ID ${id} no encontrado`);
        }
        await this.clienteRepository.remove(cliente);
    }
}
