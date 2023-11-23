import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './interface/product.interface';
import { CreateProdDTO } from './dto/create-product.dto';
import { GetProductDto } from './dto/get-product.dto';
import { ProductFilters } from './interface/filter.interface';

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

    async getProducts(idShop: string, query: GetProductDto): Promise<Product[]> {
        const filters = this.parseFilters(query, idShop);

        const product = await this.productModel.find(filters).sort({ _id: -1 }).limit(query.limit || 5).exec();
        return product;
    }

    parseFilters(query: GetProductDto, idShop: string) {
        const filters: ProductFilters = {};

        filters.idShop = idShop;

        if (query.cursor) filters._id = { $lt: query.cursor };

        if (query.type) filters.type = query.type;

        return filters;
    }

    async updateProduct(productID: string, createProductDTO: CreateProdDTO): Promise<Product> {
        const updatedProduct = await this.productModel.findByIdAndUpdate(productID,
            createProductDTO,
            { new: true });
        return updatedProduct;
    }
}
