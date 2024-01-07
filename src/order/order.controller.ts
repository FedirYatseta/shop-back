import { Controller, Get, Post, Put, Res, HttpStatus, Body, Param, UseGuards } from '@nestjs/common';
import { CreateOrderDTO } from './dto/create-order.dto';
import { OrderService } from './order.service';
import { AuthGuard } from '@nestjs/passport';
import { SendMessageToEmailDTO } from './dto/messageofuser.dto';


@Controller('order')
export class OrderController {

    constructor(private orderService: OrderService) { }

    @Post('/create')
    async createOrder(@Res() res, @Body() createOrderDTO: CreateOrderDTO): Promise<JSON> {

        const createdOrder = await this.orderService.createOrder(createOrderDTO);

        return res.status(HttpStatus.OK).json({
            data: createdOrder,
            message: 'Order was successfully created.',
            status: HttpStatus.OK
        });
    }

    @Post('/send')
    async sendMessage(@Res() res, @Body() createMessageDTO: SendMessageToEmailDTO,): Promise<JSON> {

        const createdMessage = await this.orderService.sendMessage(createMessageDTO);

        return res.status(HttpStatus.OK).json({
            data: createdMessage,
            message: 'Message was successfully ',
            status: HttpStatus.OK
        });
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/getall/:id')
    async getAllOrders(@Res() res, @Param('id') id): Promise<JSON> {
        const orders = await this.orderService.getOrders(id);

        return res.status(HttpStatus.OK).json({
            data: orders,
            message: 'Returning all orders.',
            status: HttpStatus.OK
        });
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('update/:id')
    async updateOrder(@Res() res, @Body() createOrderDTO: CreateOrderDTO, @Param('id') id): Promise<JSON> {
        let jsonResponse;

        try {
            const order = await this.orderService.updateOrder(id, createOrderDTO);
            jsonResponse = {
                data: order,
                message: `Returning updated order ${id}.`,
                status: HttpStatus.OK
            }
        } catch (error) {
            jsonResponse = jsonResponse = {
                data: null,
                message: `Order with id ${id} was not found.`,
                status: HttpStatus.NOT_FOUND
            }
        }

        return res.status(jsonResponse.status).json(jsonResponse);
    }
}
