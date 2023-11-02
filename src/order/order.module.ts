import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './order.controller';
import { ProductService } from './order.service';
import { OrderSchema } from './schema/order.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Order', schema: OrderSchema }
    ])
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class OrderModule { }
