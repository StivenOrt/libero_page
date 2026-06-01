import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MailerController } from './mailer.controller';
import { MailService } from './mailer.service';
import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/adapters/handlebars.adapter'
import { join } from 'node:path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Esto hace que esté disponible en toda la app
      envFilePath: '.env', // Asegura que lea el archivo .env
    }),

    MailerModule.forRootAsync({

      imports: [ConfigModule], 
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.getOrThrow('MAIL_HOST'),
          port: Number( config.getOrThrow('MAIL_PORT') ),
          secure: false,
          auth: {
            user: config.getOrThrow('MAIL_USER'),
            pass: config.getOrThrow('MAIL_PASSWORD')
          },
        },
        defaults: {
          from: `Libero Cobre <${config.getOrThrow('MAIL_FROM')}>`
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true
          }
        }
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [MailerController],
  providers: [MailService],
})
export class MailModule {}
