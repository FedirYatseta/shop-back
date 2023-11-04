import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigurationController } from './configuration.controller';
import { ConfigurationService } from './configuration.service';
import { ConfigurationSchema } from './schema/configuration.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Configuration', schema: ConfigurationSchema }
    ])
  ],
  controllers: [ConfigurationController],
  providers: [ConfigurationService]
})
export class ConfigurationModule { }
