import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MailerService } from './mailer.service';

@Controller()
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @MessagePattern('send_email')
  async handleSendEmail(@Payload() data) {
    return await this.mailerService.send(data);
  }
}