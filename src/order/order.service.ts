import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './interface/order.interface';
import { CreateOrderDTO } from './dto/create-order.dto';
import { ConfigService } from '@nestjs/config';
import { CreateMessageDto } from './dto/message.dto';
import * as nodemailer from 'nodemailer';
@Injectable()
export class ProductService {
    constructor(@InjectModel('Order')
    private productModel: Model<Order>,
        private configService: ConfigService,
    ) { }
    async createProduct(createProductDTO: CreateOrderDTO): Promise<Order> {
        const product = new this.productModel(createProductDTO);

        try {
            await product.save();
            // Викликати функцію для відправки листа тут
            this.sendSupportMessage(product);
            return product;
        } catch (error) {
            // Обробка помилки
            throw new Error('Failed to save order');
        }
    }
    async sendSupportMessage(order: any) {
        const orderDetails = order.order.map(item => {
            return `<b>Товар:</b> ${item.name} <br/>
            <b>Клькість:</b> ${item.count} <br/>
            <b>Ціна:</b> ${item.price} <br/>
            <img src='${item.imageSrc}' alt="itemProd" style="width: 100px; height: 100px;"> <br/>
            `;
        });

        // Потім додайте ці рядки до повідомлення
        const message = `
            <b>Ім'я:</b> ${order.name} <br/>
            <b>Телефон:</b> ${order.phone} <br/>
            <b>Замовлення:</b> ${orderDetails.join('<br/>')}
          `;

        const transporter = nodemailer.createTransport({
            host: this.configService.get<string>('nodemailerHost'),
            port: this.configService.get<number>('nodemailerPort'),
            secure: true,
            auth: {
                user: this.configService.get<string>('nodemailerUser'),
                pass: this.configService.get<string>('nodemailerPass'),
            },
        });

        try {
            transporter.sendMail({
                to: this.configService.get<string>('supportEmail'),
                from: this.configService.get<string>('nodemailerUser'),
                text: 'Магазин',
                subject: "Замовлення",
                html: message,
            });
        } catch (error) {
            console.log(error);
            return error.save()
        }
    }


    async getProduct(productID: string): Promise<Order> {
        const product = await this.productModel.findById(productID);
        return product;
    }

    async getProducts(idShop: string): Promise<Order[]> {
        const product = await this.productModel.find({ idShop });
        return product;
    }

    async updateProduct(productID: string, createProductDTO: CreateOrderDTO): Promise<Order> {
        const updatedProduct = await this.productModel.findByIdAndUpdate(productID,
            createProductDTO,
            { new: true });
        return updatedProduct;
    }
}
