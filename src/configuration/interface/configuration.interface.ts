import { Document } from 'mongoose';

export interface Configuration extends Document {
    id: string;
    idShop: string;
    collapse: [];
    condition: [];
    quality: []
}