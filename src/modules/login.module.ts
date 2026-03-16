import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersEntity } from '../entities/user.entity';
import { RolesEntity } from '../entities/rol.entity';
import { LoginService } from '../services/login.service';
import { LoginController } from '../controllers/login.controller';
import { UsersModule } from './users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, RolesEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule, UsersModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [LoginService],
  controllers: [LoginController],
})
export class LoginModule { }