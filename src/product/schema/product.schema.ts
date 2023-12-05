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
        required: false
    },
    oldPrice: {
        type: Number,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    color: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: true
    },

    describe: {
        type: String,
        required: false
    },

    imageSrc: {
        type: [],
        required: false
    },
    newProduct: {
        type: Boolean,
        required: false
    },
    hitProduct: {
        type: Boolean,
        required: false
    },
    sale: {
        type: Boolean,
        required: false
    },
    videoUrl: {
        type: String,
        required: false
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});