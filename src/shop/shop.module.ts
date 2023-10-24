import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './shop.controller';
import { ShopService } from './shop.service';
import { ShopSchema } from './schema/shop.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Shop', schema: ShopSchema }
    ])
  ],
  controllers: [UserController],
  providers: [ShopService]
})
export class UserModule { }
