import { Controller, Delete, Get, Post, Put, Res, HttpStatus, Body, Param, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateOrderDTO } from './dto/create-order.dto';
import { ProductService } from './order.service';
import { AuthGuard } from '@nestjs/passport';


@Controller('order')
export class ProductController {

    constructor(private productService: ProductService) { }

    @Post('/create')
    async createProduct(@Res() res, @Body() createProductDTO: CreateOrderDTO): Promise<JSON> {

        const createdProduct = await this.productService.createProduct(createProductDTO);

        return res.status(HttpStatus.OK).json({
            data: createdProduct,
            message: 'Order was successfully created.',
            status: HttpStatus.OK
        });
    }


    @Get('/getall/:id')
    async getAllProducts(@Res() res, @Param('id') id): Promise<JSON> {
        const products = await this.productService.getProducts(id);

        return res.status(HttpStatus.OK).json({
            data: products,
            message: 'Returning all products.',
            status: HttpStatus.OK
        });
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async updateProduct(@Res() res, @Body() createProductDTO: CreateOrderDTO, @Param('id') id): Promise<JSON> {
        let jsonResponse;

        try {
            const product = await this.productService.updateProduct(id, createProductDTO);
            jsonResponse = {
                data: product,
                message: `Returning updated product ${id}.`,
                status: HttpStatus.OK
            }
        } catch (error) {
            jsonResponse = jsonResponse = {
                data: null,
                message: `Product with id ${id} was not found.`,
                status: HttpStatus.NOT_FOUND
            }
        }

        return res.status(jsonResponse.status).json(jsonResponse);
    }
}
