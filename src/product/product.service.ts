import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './interface/product.interface';
import { CreateProdDTO } from './dto/create-product.dto';

@Injectable()
export class ProductService {

    constructor(@InjectModel('Product') private productModel: Model<Product>) { }

    async createProduct(createProductDTO: CreateProdDTO): Promise<Product> {
        const product = new this.productModel(createProductDTO);
        return await product.save();
    }

    async deleteProduct(userID: string): Promise<Product> {
        const deletedProduct = await this.productModel.findByIdAndDelete(userID);
        return deletedProduct;
    }

    async getProduct(userID: string): Promise<Product> {
        const product = await this.productModel.findById(userID);
        return product;
    }

    async getProducts(): Promise<Product[]> {
        const product = await this.productModel.find();
        return product;
    }

    async updateProduct(userID: string, createProductDTO: CreateProdDTO): Promise<Product> {
        const updatedProduct = await this.productModel.findByIdAndUpdate(userID,
            createProductDTO,
            { new: true });
        return updatedProduct;
    }
}
