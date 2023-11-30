import { Document } from 'mongoose';

export interface Configuration extends Document {
    id: string;
    idShop: string;
    saleTime: string;
    collapse: [];
    condition: [];
    quality: []
}