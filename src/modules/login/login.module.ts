import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersEntity } from '../../entities/users/user.entity';
import { RolesEntity } from '../../entities/roles/rol.entity';
import { LoginService } from '../../services/login/login.service';
import { LoginController } from '../../controllers/login/login.controller';
import { UsersModule } from '../users/users.module';

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