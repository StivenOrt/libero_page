import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api', {
    exclude: ['/', 'login' ]
  });
  app.enableCors();
  app.useStaticAssets( join(process.cwd(), 'src', 'public'), {
    prefix: '/',
  });

  await app.listen(3001);
  console.log('NestJS corriendo en puerto 3001');
}
bootstrap();
