import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';
import { NotFoundFilter } from './filters/notfound.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api', {
    exclude: ['/', 'login'],
  });

  app.enableCors();

  app.useStaticAssets(join(process.cwd(), 'src', 'public'), {
    prefix: '/',
    index: false,
  });

  app.useGlobalFilters(new NotFoundFilter());
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Libero Page API')
    .setDescription('Documentación de la API REST del proyecto Libero Page')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Ingresa el token JWT obtenido en /api/auth/login',
      },
      'access-token',
    )
    .build();
    const document = SwaggerModule.createDocument(app, config);
      Object.values(document.paths).forEach((path: any) => {
      Object.values(path).forEach((method: any) => {
      method.security = [{ 'access-token': [] }];
    });
  });
  SwaggerModule.setup('api/docs', app, document);

  const PORT = process.env.PORT ?? "3000"
  await app.listen(PORT);
  console.log(`NestJS corriendo en http://localhost:${PORT}`);
  console.log(`Swagger UI disponible en http://localhost:${PORT}/api/docs`);
}
bootstrap();
