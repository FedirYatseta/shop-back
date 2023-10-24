import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './product/product.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { CloudinaryProvider } from './cloudinary/cloudinary.provider';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.get<string>('mongoUri'),
        };
      },
      inject: [ConfigService],
    }
    ),
    UserModule,
    CloudinaryModule
  ],
  controllers: [],
  providers: [CloudinaryProvider],
})
export class AppModule { }
