import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { PostulacionModule } from './modules/postulaciones/postulacion.module';
import { UsersModule } from './modules/users/users.module';
import { RoutesModule } from './routes/route.module';
import { RolModule } from './modules/rols/rols.module';
import { NoticiasModule } from './modules/noticias/noticias.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    AuthModule,
    PostulacionModule,
    UsersModule,
    RoutesModule,
    RolModule,
    NoticiasModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }