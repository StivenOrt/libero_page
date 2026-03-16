import { Module } from '@nestjs/common';
import { LoginController } from '../../controllers/login/login.controller';
import { LoginService } from '../../services/login/login.service';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [LoginController],
  providers: [LoginService],
  imports: [UsersModule]
})
export class LoginModule { }
