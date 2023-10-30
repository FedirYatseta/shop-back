import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Password, PasswordSchema } from '../password/schemas/password.schema';
import { PasswordsService } from './password.service';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Password.name, schema: PasswordSchema },
    ]),
    MailModule,
  ],
  providers: [PasswordsService],
  exports: [PasswordsService],
})
export class PasswordsModule {}
