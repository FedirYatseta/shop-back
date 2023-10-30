import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';
import { MailgenTemplates } from './temlates';
import { MAILGEN } from './mail.constants';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: 'smtp.meta.ua',
          port: 465,
          secure: true,
          auth: {
            user: configService.get<string>('authUserNodemailer'),
            pass: configService.get<string>('authPassNodemailer'),
          },
        },
        defaults: {
          from: configService.get<string>('authUserNodemailer'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    MailService,
    {
      provide: MAILGEN,
      useClass: MailgenTemplates,
    },
  ],
  exports: [MailService],
})
export class MailModule {}
