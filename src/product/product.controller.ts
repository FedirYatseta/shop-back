import { Controller, Delete, Get, Post, Put, Res, HttpStatus, Body, Param, Query, UseGuards } from '@nestjs/common';
import { CreateProdDTO } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { AuthGuard } from '@nestjs/passport';


@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) { }
    @UseGuards(AuthGuard('jwt'))
    @Post('/create')
    async createProduct(@Res() res, @Body() createProductDTO: CreateProdDTO): Promise<JSON> {

        const createdProduct = await this.productService.createProduct(createProductDTO);

        return res.status(HttpStatus.OK).json({
            data: createdProduct,
            message: 'Product was successfully created.',
            status: HttpStatus.OK
        });
    }
    @UseGuards(AuthGuard('jwt'))
    @Delete('/:id')
    async deleteProduct(@Res() res, @Param('id') id): Promise<JSON> {
        let jsonResponse;

        try {
            const deletedProduct = this.productService.deleteProduct(id);
            jsonResponse = {
                data: deletedProduct,
                message: `Product with id ${id} was deleted.`,
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

    @Get('/getall/:id')
    async getAllProducts(@Res() res, @Param('id') id, @Query('type') type): Promise<JSON> {
        const products = await this.productService.getProducts(id, type);

        return res.status(HttpStatus.OK).json({
            data: products,
            message: 'Returning all products.',
            status: HttpStatus.OK
        });
    }

    @Get('/:id')
    async getProductById(@Res() res, @Param('id') id): Promise<JSON> {
        let jsonResponse;

        try {
            const product = await this.productService.getProduct(id);
            jsonResponse = {
                data: product,
                message: `Returning product ${id}.`,
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
    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async updateProduct(@Res() res, @Body() createProductDTO: CreateProdDTO, @Param('id') id): Promise<JSON> {
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
