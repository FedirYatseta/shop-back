import { Schema } from 'mongoose';

export const ProductSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    size: {
        type: Number,
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
    imageSrc: {
        type: [],
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});