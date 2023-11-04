import { Controller, Delete, Get, Post, Put, Res, HttpStatus, Body, Param, Query, UseGuards } from '@nestjs/common';
import { CreateConfigurationDTO } from './dto/create-configuration.dto';
import { ConfigurationService } from './configuration.service';
import { AuthGuard } from '@nestjs/passport';


@Controller('configuration')
export class ConfigurationController {

    constructor(private configurationService: ConfigurationService) { }
    @UseGuards(AuthGuard('jwt'))
    @Post('/create')
    async createConfiguration(@Res() res, @Body() createConfigurationDTO: CreateConfigurationDTO): Promise<JSON> {

        const createdConfiguration = await this.configurationService.createConfiguration(createConfigurationDTO);

        return res.status(HttpStatus.OK).json({
            data: createdConfiguration,
            message: 'Configuration was successfully created.',
            status: HttpStatus.OK
        });
    }
    @UseGuards(AuthGuard('jwt'))
    @Delete('/:id')
    async deleteConfiguration(@Res() res, @Param('id') id): Promise<JSON> {
        let jsonResponse;

        try {
            const deletedConfiguration = this.configurationService.deleteConfiguration(id);
            jsonResponse = {
                data: deletedConfiguration,
                message: `Configuration with id ${id} was deleted.`,
                status: HttpStatus.OK
            }
        } catch (error) {
            jsonResponse = jsonResponse = {
                data: null,
                message: `Configuration with id ${id} was not found.`,
                status: HttpStatus.NOT_FOUND
            }
        }

        return res.status(jsonResponse.status).json(jsonResponse);
    }


    @Get('/:id')
    async getConfigurationById(@Res() res, @Param('id') id): Promise<JSON> {
        let jsonResponse;

        try {
            const configuration = await this.configurationService.getConfiguration(id);
            jsonResponse = {
                data: configuration,
                message: `Returning configuration ${id}.`,
                status: HttpStatus.OK
            }
        } catch (error) {
            jsonResponse = jsonResponse = {
                data: null,
                message: `Configuration with id ${id} was not found.`,
                status: HttpStatus.NOT_FOUND
            }
        }

        return res.status(jsonResponse.status).json(jsonResponse);
    }
    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async updateConfiguration(@Res() res, @Body() createConfigurationDTO: CreateConfigurationDTO, @Param('id') id): Promise<JSON> {
        let jsonResponse;

        try {
            const configuration = await this.configurationService.updateConfiguration(id, createConfigurationDTO);
            jsonResponse = {
                data: configuration,
                message: `Returning updated configuration ${id}.`,
                status: HttpStatus.OK
            }
        } catch (error) {
            jsonResponse = jsonResponse = {
                data: null,
                message: `Configuration with id ${id} was not found.`,
                status: HttpStatus.NOT_FOUND
            }
        }

        return res.status(jsonResponse.status).json(jsonResponse);
    }
}
