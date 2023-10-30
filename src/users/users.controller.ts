import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { User } from '../decorators/user.decorator';
import { PayloadDto } from 'src/auth/dto/payload.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('forgot-password')
  async recoveryPass(
    @Body() body: { email: string },
  ): Promise<{ success: boolean }> {
    return this.usersService.recoveryPass(body.email);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getProfile(@User() user: PayloadDto) {
    return this.usersService.getProfileInfo(user.userId);
  }
}
