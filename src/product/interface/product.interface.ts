import { Document } from 'mongoose';

export interface Product extends Document {
    id: string;
    idShop: string;
    title: string;
    size: number;
    oldPrice: number;
    price: number;
    color: string;
    type: string;
    specification: []
    describe: string
    structure: []
    newProduct: boolean
    hitProduct: boolean
    imageSrc: []
}