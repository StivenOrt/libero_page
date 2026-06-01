import { NestFactory } from '@nestjs/core';
import { MailModule } from './mailer.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MailModule,
    {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 1111
      }
    }
  )

  await app.listen();
}
bootstrap();
