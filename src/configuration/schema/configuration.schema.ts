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
    collapse: {
        type: [],
        required: true
    },
    condition: {
        type: [],
        required: true
    },
    quality: {
        type: [],
        required: true
    },

});