import { Controller, Delete, Get, Post, Put, Res, HttpStatus, Body, Param } from '@nestjs/common';
import { CreateShopDTO } from './dto/create-shop.dto';
import { ShopService } from './shop.service';


@Controller('shop')
export class UserController {

    constructor(private shopService: ShopService) { }

    @Post('/create')
    async createShop(@Res() res, @Body() createShopDTO: CreateShopDTO): Promise<JSON> {

        const createdUser = await this.shopService.createShop(createShopDTO);

        return res.status(HttpStatus.OK).json({
            data: createdUser,
            message: 'Product was successfully created.',
            status: HttpStatus.OK
        });
    }

    @Delete('/:id')
    async deleteUser(@Res() res, @Param('id') id): Promise<JSON> {
        let jsonResponse;

        try {
            const deletedUser = this.shopService.deleteShop(id);
            jsonResponse = {
                data: deletedUser,
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
    async getAllUsers(@Res() res): Promise<JSON> {
        const users = await this.shopService.getShops();

        return res.status(HttpStatus.OK).json({
            data: users,
            message: 'Returning all products.',
            status: HttpStatus.OK
        });
    }

    @Get('/:id')
    async getUserById(@Res() res, @Param('id') id): Promise<JSON> {
        let jsonResponse;

        try {
            const user = await this.shopService.getShop(id);
            jsonResponse = {
                data: user,
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
    async updateUser(@Res() res, @Body() createUserDTO: CreateShopDTO, @Param('id') id): Promise<JSON> {
        let jsonResponse;

        try {
            const user = await this.shopService.updateShop(id, createUserDTO);
            jsonResponse = {
                data: user,
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
