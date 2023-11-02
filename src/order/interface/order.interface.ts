import { Document } from 'mongoose';

export interface Order extends Document {
    name: string;
    phone: string;
    orders: [];
}