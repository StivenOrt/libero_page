import { Injectable } from '@nestjs/common';

@Injectable()
export class MailerService {


  send(data) {
    console.log(data)
  }
}
