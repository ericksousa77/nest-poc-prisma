import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

interface User {
  name: string;
  email: string;
}

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User) {
    await this.mailerService.sendMail({
      to: user.email,

      subject: 'Olá, seja bem-vindo 💟',
      template: '../../mail/templates/hello',
      context: {
        name: user.name,
      },
    });
  }
}
