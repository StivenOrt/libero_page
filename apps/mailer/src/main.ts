import { NestFactory } from '@nestjs/core';
import { MailerModule } from './mailer.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MailerModule,
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
