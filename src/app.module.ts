import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './modules/login.module';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { RoutesModule } from './routes/routes/routes.module';

@Module({
  imports: [TypeOrmModule.forFeature([]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),LoginModule, DatabaseModule, RoutesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
