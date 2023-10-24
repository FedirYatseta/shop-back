import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { PhotoController } from './cloudinary.controller';

@Module({
  controllers: [PhotoController],
  providers: [CloudinaryService],

})
export class CloudinaryModule { }