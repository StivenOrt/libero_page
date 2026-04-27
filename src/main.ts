import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { NotFoundFilter } from './filters/notfound.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  // ── Swagger ────────────────────────────────────────────────────────────────
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
  SwaggerModule.setup('api/docs', app, document);
  // ──────────────────────────────────────────────────────────────────────────

  await app.listen(82);
  console.log('NestJS corriendo en http://localhost:82');
  console.log('Swagger UI disponible en http://localhost:82/api/docs');
}
bootstrap();
