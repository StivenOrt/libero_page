import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { LoginModule } from './modules/login.module';
import { RoutesModule } from './routes/routes/routes.module';
import { UsersModule } from './modules/users.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    UsersModule,
    LoginModule,
    RoutesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
