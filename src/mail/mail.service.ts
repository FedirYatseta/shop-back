import { Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { MAILGEN } from './mail.constants';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    @Inject(MAILGEN) private MailgenTemplates,
  ) {}

  async emailResetPassword(
    email: string,
    name: string,
    link: string,
  ): Promise<void> {
    return this.mailerService
      .sendMail({
        to: email,
        from: this.configService.get<string>('authUserNodemailer'),
        subject: 'Welcome to GymCRM!',
        html: await this.MailgenTemplates.createResetPasswordTemplate(
          name,
          link,
        ),
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
