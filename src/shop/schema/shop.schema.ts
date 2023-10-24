import { Schema } from 'mongoose';

export const ShopSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
});