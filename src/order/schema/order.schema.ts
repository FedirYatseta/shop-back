import { Schema } from 'mongoose';

export const OrderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    order: {
        type: [],
        required: true
    },

});