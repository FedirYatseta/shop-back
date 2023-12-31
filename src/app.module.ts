import { Module, ValidationPipe } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './product/product.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { CloudinaryProvider } from './cloudinary/cloudinary.provider';
import { ShopModule } from './shop/shop.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { CompressionMiddleware } from './middleware/compression.middleware';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.get<string>('mongoUri'),
          dbName: configService.get<string>('dbName')
        };
      },
      inject: [ConfigService],
    }
    ),
    AuthModule,
    UserModule,
    CloudinaryModule,
    ShopModule,
    OrderModule,
    ConfigurationModule,

  ],
  controllers: [],
  providers: [CloudinaryProvider, {
    provide: APP_PIPE,
    useClass: ValidationPipe,
  }, CompressionMiddleware],
})
export class AppModule { }
