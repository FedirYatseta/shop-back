import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Shop } from './interface/shop.interface';
import { CreateShopDTO } from './dto/create-shop.dto';

@Injectable()
export class ShopService {

    constructor(@InjectModel('Shop') private shopModel: Model<Shop>) { }

    async createShop(createShopDTO: CreateShopDTO): Promise<Shop> {
        const shop = new this.shopModel(createShopDTO);
        return await shop.save();
    }

    async deleteShop(userID: string): Promise<Shop> {
        const deletedUser = await this.shopModel.findByIdAndDelete(userID);
        return deletedUser;
    }

    async getShop(userID: string): Promise<Shop> {
        const shop = await this.shopModel.findById(userID);
        return shop;
    }

    async getShops(): Promise<Shop[]> {
        const shops = await this.shopModel.find();
        return shops;
    }

    async updateShop(userID: string, createShopDTO: CreateShopDTO): Promise<Shop> {
        const updatedShop = await this.shopModel.findByIdAndUpdate(userID,
            createShopDTO,
            { new: true });
        return updatedShop;
    }
}
