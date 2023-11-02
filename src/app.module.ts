import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './product/product.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { CloudinaryProvider } from './cloudinary/cloudinary.provider';
import { ShopModule } from './shop/shop.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
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
    AuthModule,
    UserModule,
    CloudinaryModule,
    ShopModule,
    OrderModule
  ],
  controllers: [],
  providers: [CloudinaryProvider],
})
export class AppModule { }
