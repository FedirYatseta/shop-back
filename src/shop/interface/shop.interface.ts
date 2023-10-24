import { Document } from 'mongoose';

export interface Shop extends Document {
    id: string;
    name: string;

}