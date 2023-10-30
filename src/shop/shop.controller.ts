import { Controller, Delete, Get, Post, Put, Res, HttpStatus, Body, Param } from '@nestjs/common';
import { CreateShopDTO } from './dto/create-shop.dto';
import { ShopService } from './shop.service';


@Controller('shop')
export class ShopController {

    constructor(private shopService: ShopService) { }

    @Post('/create')
    async createShop(@Res() res, @Body() createShopDTO: CreateShopDTO): Promise<JSON> {

        const createdShop = await this.shopService.createShop(createShopDTO);

        return res.status(HttpStatus.OK).json({
            data: createdShop,
            message: 'Product was successfully created.',
            status: HttpStatus.OK
        });
    }

    @Delete('/:id')
    async deleteShop(@Res() res, @Param('id') id): Promise<JSON> {
        let jsonResponse;

        try {
            const deletedShop = this.shopService.deleteShop(id);
            jsonResponse = {
                data: deletedShop,
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

    @Get('/getall')
    async getAllShops(@Res() res): Promise<JSON> {
        const shops = await this.shopService.getShops();

        return res.status(HttpStatus.OK).json({
            data: shops,
            message: 'Returning all products.',
            status: HttpStatus.OK
        });
    }

    @Get('/:id')
    async getShopById(@Res() res, @Param('id') id): Promise<JSON> {
        let jsonResponse;

        try {
            const shop = await this.shopService.getShop(id);
            jsonResponse = {
                data: shop,
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

    @Put(':id')
    async updateShop(@Res() res, @Body() createShopDTO: CreateShopDTO, @Param('id') id): Promise<JSON> {
        let jsonResponse;

        try {
            const shop = await this.shopService.updateShop(id, createShopDTO);
            jsonResponse = {
                data: shop,
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
