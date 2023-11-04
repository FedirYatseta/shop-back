import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Configuration } from './interface/configuration.interface';
import { CreateConfigurationDTO } from './dto/create-configuration.dto';

@Injectable()
export class ConfigurationService {
    constructor(@InjectModel('Configuration') private configurationModel: Model<Configuration>) { }
    async createConfiguration(createConfigurationDTO: CreateConfigurationDTO): Promise<Configuration> {
        const configuration = new this.configurationModel(createConfigurationDTO);
        return await configuration.save();
    }

    async deleteConfiguration(configurationID: string): Promise<Configuration> {
        const deletedConfiguration = await this.configurationModel.findByIdAndDelete(configurationID);
        return deletedConfiguration;
    }

    async getConfiguration(idShop: string): Promise<Configuration[]> {
        const configuration = await this.configurationModel.find({ idShop });
        return configuration;
    }

    async updateConfiguration(configurationID: string, createConfigurationDTO: CreateConfigurationDTO): Promise<Configuration> {
        const updatedConfiguration = await this.configurationModel.findByIdAndUpdate(configurationID,
            createConfigurationDTO,
            { new: true });
        return updatedConfiguration;
    }
}
