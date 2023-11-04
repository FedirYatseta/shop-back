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

    async deleteProduct(productID: string): Promise<Product> {
        const deletedProduct = await this.productModel.findByIdAndDelete(productID);
        return deletedProduct;
    }

    async getProduct(productID: string): Promise<Product> {
        const product = await this.productModel.findById(productID);
        return product;
    }

    async getProducts(idShop: string, type?: string): Promise<Product[]> {

        const filter: any = { idShop }


        if (type) {
            filter.type = type;
        }

        const product = await this.productModel.find(filter);
        return product;
    }

    async updateProduct(productID: string, createProductDTO: CreateProdDTO): Promise<Product> {
        const updatedProduct = await this.productModel.findByIdAndUpdate(productID,
            createProductDTO,
            { new: true });
        return updatedProduct;
    }
}
