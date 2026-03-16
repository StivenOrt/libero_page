import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

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


  app.use((req, res, next) => {
    if (!req.url.startsWith('/api')) {
      return res.status(404).sendFile(
        join(process.cwd(), 'src', 'public', 'error.html')
      );
    }
    next();
  });

  await app.listen(3001);
  console.log('NestJS corriendo en puerto 3001');


}
bootstrap();
