import { Document } from 'mongoose';

export interface Product extends Document {
    id: string;
    idShop: string;
    title: string;
    size: string;
    oldPrice: number;
    price: number;
    color: string;
    type: string;
    describe: string
    newProduct: boolean
    hitProduct: boolean
    sale: boolean
    imageSrc: []
}