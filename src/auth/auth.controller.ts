import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDecorator } from '../decorators/user.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { PayloadDto } from './dto/payload.dto';
import { LoginResponse } from './types/login-response.types';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    console.log("=>(auth.controller.ts:17) loginDto", loginDto);
    return this.authService.login(loginDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('logout')
  async logout(@UserDecorator() user: PayloadDto): Promise<{ success: boolean }> {
    return this.authService.logout(user.userId);
  }

  @Post('refresh')
  refreshToken(
    @Body() token: { refresh_token: string },
  ): Promise<LoginResponse> {
    return this.authService.refresh(token.refresh_token);
  }
}
