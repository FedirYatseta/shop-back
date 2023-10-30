import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Password, PasswordDocument } from './schemas/password.schema';
import { ConfigService } from '@nestjs/config';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class PasswordsService {
  constructor(
    @InjectModel(Password.name) private passwordModel: Model<PasswordDocument>,
    private configService: ConfigService,
    private mailService: MailService,
  ) {}

  async findById(passwordId: string): Promise<Password> {
    return this.passwordModel.findById(passwordId);
  }

  async removeById(passwordId: string): Promise<void> {
    await this.passwordModel.deleteOne({ _id: passwordId });
  }

  async initPasswordId(userId: string) {
    const passwordTable = await this.passwordModel.create({
      userId: userId,
    });

    return passwordTable.id;
  }

  async createLink(passwordId: string, config: string) {
    return {
      url: `${this.configService.get<string>(`${config}`)}${passwordId}`,
    };
  }

  async forgotPass(userId: string, email: string, name: string) {
    const passwordId = await this.initPasswordId(userId);
    const { url } = await this.createLink(passwordId, 'forgotPassLink');

    return this.mailService.emailResetPassword(email, name, url);
  }
}
