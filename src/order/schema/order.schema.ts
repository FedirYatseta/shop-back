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
    idShop: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'New'
    },
    order: {
        type: [],
        required: true
    },

});