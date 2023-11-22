
import { BadRequestException, Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';
import { UserDecorator } from 'src/decorators/user.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Get('forgot-password')
  async recoveryPass(
    @Body() body: { email: string },
  ): Promise<{ success: boolean }> {
    return this.usersService.recoveryPass(body.email);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getProfile(@UserDecorator() user: PayloadDto) {
    return this.usersService.getProfileInfo(user.userId);
  }

  @Post('register')
  async register(@Body() user: User): Promise<User> {
    const existingUser = await this.usersService.findByEmail(user.email);
    if (existingUser) {
      throw new BadRequestException('Користувач з такою поштою вже існує');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = {
      name: user.name,
      email: user.email,
      password: hashedPassword,
    };

    return this.usersService.create(newUser as User);
  }
}
