import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BCRYPT, MOMENT } from './auth.constants';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { RefreshToken, RefreshTokenShema } from './schemas/refreshToken.schema';
import { PasswordsModule } from 'src/password/password.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RefreshToken.name, schema: RefreshTokenShema },
    ]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('jwtSecret'),
          signOptions: {
            expiresIn: configService.get<number>('jwtExpiresInt'),
          },
        };
      },
      inject: [ConfigService],
    }),
    PassportModule,
    UsersModule,
    PasswordsModule,
  ],
  providers: [
    {
      provide: BCRYPT,
      useValue: bcrypt,
    },
    {
      provide: MOMENT,
      useValue: moment,
    },
    AuthService,
    JwtStrategy,
    LocalStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
