import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './interface/order.interface';
import { CreateOrderDTO } from './dto/create-order.dto';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { SendMessageToEmailDTO } from './dto/messageofuser.dto';
import { MessageToEmail } from './interface/messageofuser.interface';
@Injectable()
export class OrderService {
    constructor(@InjectModel('Order')
    private orderModel: Model<Order>,
        private configService: ConfigService,

    ) { }
    async createOrder(createOrderDTO: CreateOrderDTO): Promise<Order> {
        const order = new this.orderModel(createOrderDTO);

        try {
            await order.save();
            // Викликати функцію для відправки листа тут
            this.sendSupportMessage(order);
            return order;
        } catch (error) {
            // Обробка помилки
            throw new Error('Failed to save order');
        }
    }
    async sendMessage(sendMessageDTO: SendMessageToEmailDTO): Promise<MessageToEmail> {
        console.log('SendMessageToEmailDTO', sendMessageDTO)

        try {
            // Викликати функцію для відправки листа тут
            this.sendMessageFromUser(sendMessageDTO);
            return
        } catch (error) {
            // Обробка помилки
            throw new Error('Failed to save message');
        }
    }

    async sendSupportMessage(order: any) {
        console.log('sendSupportMessage', order)

        const orderDetails = order.order.map(item => {

            return `<b>Товар:</b> ${item.title} <br/>
            <b>Клькість:</b> ${item.count} <br/>
            <b>Ціна:</b> ${item.price} <br/>
            <img src='${item.image}' alt="photo product" style="width: 100px; height: 100px;"> <br/>
            `;
        });

        // Потім додайте ці рядки до повідомлення
        const message = `
            <b>Ім'я:</b> ${order.name} <br/>
            <b>Телефон:</b> ${order.phone} <br/>
            <b>Замовлення:</b> <br/> ${orderDetails.join('<br/>')}
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

    async sendMessageFromUser(order: any) {
        console.log('order', order)


        // Потім додайте ці рядки до повідомлення
        const message = `
            <b>Ім'я:</b> ${order.name} <br/>
            <b>Телефон:</b> ${order.phone} <br/>
            <b>Опис:</b> <br/> ${order.describe}
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
                subject: "Відгуки та пропозиції",
                html: message,
            });
        } catch (error) {
            console.log(error);
            return error.save()
        }
    }




    async getOrders(idShop: string): Promise<Order[]> {
        const order = await this.orderModel.find({ idShop });
        return order;
    }

    async updateOrder(orderID: string, createOrderDTO: CreateOrderDTO): Promise<Order> {
        const updatedOrder = await this.orderModel.findByIdAndUpdate(orderID,
            createOrderDTO,
            { new: true });
        return updatedOrder;
    }
}
