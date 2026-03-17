import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { NotFoundFilter } from './filters/notfound.filter'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api', {
    exclude: ['/', 'login']
  });
  app.enableCors();
  app.useStaticAssets( join(process.cwd(), 'src', 'public'), {
    prefix: '/',
    index: false
  });

  app.useGlobalFilters(new NotFoundFilter())

  await app.listen(3001);
  console.log('NestJS corriendo en puerto 3001');


}
bootstrap();
