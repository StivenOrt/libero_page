import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from 'src/modules/users/users.controller';
import { UsersEntity } from 'src/modules/users/entities/user.entity';
import { UsersService } from 'src/modules/users/users.service';
import { RolModule } from '../roles/rol.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity]),

    RolModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }
