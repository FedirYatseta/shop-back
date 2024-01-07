import { Document } from 'mongoose';

export interface MessageToEmail extends Document {
    name: string;
    phone: string;
    idShop: string;
    description: string;
}