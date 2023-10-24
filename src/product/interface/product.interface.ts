import { Document } from 'mongoose';

export interface Product extends Document {
    id: string;
    title: string;
    size: number;
    oldPrice: number;
    price: number;
    color: string;
    type: string;
    imageSrc: []
}