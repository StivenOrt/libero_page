import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';


@Injectable()
export class MailService {
    private readonly logger = new Logger(MailService.name);


  constructor(
    private readonly mailerService: MailerService
  ){}

  async sendCode(data: { code, email, username }) {

    console.log(data)
    
    try {
      await this.mailerService.sendMail({
        to: data.email,
        subject: 'Código de Verificación - Inicio de Sesión',
        template: 'login',
        context: {
          name: data.username,
          verificationCode: data.code,
        },
      });
      this.logger.log(`Login verification email sent to: ${data.email}`);
    } catch (error) {
      this.logger.error('Failed to send login verification email', error as Error);
      throw new ServiceUnavailableException('No se pudo enviar el código de verificación. Verifica la configuración SMTP.');
    }
    
  }
}
