import { omit } from 'lodash';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { PasswordsService } from 'src/password/password.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private usersModel: Model<User>,
    private passwordsService: PasswordsService,
  ) { }


  async create(user: User): Promise<User> {
    const newUser = new this.usersModel(user);
    return await newUser.save();
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.usersModel.findOne({ email });

    return user && user.toObject();
  }

  async findById(userId: string): Promise<User> {
    const user = await this.usersModel.findById(userId);

    return user && user.toObject();
  }

  async recoveryPass(email: string): Promise<{ success: boolean }> {
    const user = await this.findByEmail(email);
    await this.passwordsService.forgotPass(user.id, user.email, user.name);

    return { success: true };
  }

  async updateUserPass(userId: string, newPassword: string) {
    return this.usersModel.findByIdAndUpdate(
      userId,
      {
        password: newPassword,
      },
      { new: true },
    );
  }


  async getProfileInfo(userId: string) {
    const user = await this.usersModel.findById(userId);

    return omit(user.toObject(), ['password', '_id']);
  }
}
