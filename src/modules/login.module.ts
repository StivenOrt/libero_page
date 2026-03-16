import { Module } from '@nestjs/common';
import { LoginController } from '../controllers/login.controller';
import { LoginService } from '../services/login.service';
import { UsersModule } from './users.module';

@Module({
  controllers: [LoginController],
  providers: [LoginService],
  imports: [UsersModule]
})
export class LoginModule { }
