import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MailService } from './mailer.service';

@Controller()
export class MailerController {
  constructor(private readonly mailerService: MailService) {}

  @MessagePattern('send_email')
  async handleSendEmail(@Payload() data) {
    return await this.mailerService.sendCode(data);
  }
}