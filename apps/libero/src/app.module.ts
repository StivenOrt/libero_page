import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { PostulacionModule } from './modules/postulaciones/postulacion.module';
import { UsersModule } from './modules/users/users.module';
import { RoutesModule } from './routes/route.module';
import { RolModule } from './modules/roles/rol.module';
import { NoticiasModule } from './modules/noticias/noticias.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from './modules/auth/guards/rols.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule, AuthModule,
    PostulacionModule, UsersModule,
    RoutesModule, RolModule,
    NoticiasModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
})
export class AppModule { }