import { Document } from 'mongoose';

export interface Filter extends Document {
    idShop: string;
    type: string;

}