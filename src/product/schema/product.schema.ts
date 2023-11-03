import { Schema } from 'mongoose';

export const ProductSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    idShop: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    oldPrice: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    specification: {
        type: [],
        required: false
    },
    describe: {
        type: String,
        required: true
    },
    structure: {
        type: [],
        required: false
    },
    imageSrc: {
        type: [],
        required: true
    },
    newProduct: {
        type: Boolean,
        required: false
    },
    hitProduct: {
        type: Boolean,
        required: false
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});