import { Schema } from 'mongoose';

export const ConfigurationSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    idShop: {
        type: String,
        required: true
    },
    saleTime: {
        type: String,
        required: false
    },
    collapse: {
        type: [],
        required: false
    },
    condition: {
        type: [],
        required: false
    },
    quality: {
        type: [],
        required: false
    },

});