import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', 'src', 'public'), {
    prefix: '/',
  });
  await app.listen(3000);
  console.log('NestJS corriendo en puerto 3000');
}
bootstrap();
