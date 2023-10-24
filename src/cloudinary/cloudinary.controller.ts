import { BadRequestException, Controller, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('photo')
export class PhotoController {
    constructor(private cloudinary: CloudinaryService) { }
    @Patch('/create')
    @UseInterceptors(FileInterceptor('file'))
    async uploadImageToCloudinary(@UploadedFile() file: Express.Multer.File | any) {
        return await this.cloudinary.uploadImage(file).catch((e) => {
            throw new BadRequestException('Invalid file type.');
        });
    }
}